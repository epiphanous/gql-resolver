# GQL Resolver

GQL resolver is a general GraphQL resolver with plugin query strategies,
designed to support large schemas.

## Installation

```bash
yarn add gql-resolver
```

or

```bash
npm install gql-resolver
```

## Usage

Read in your schema, define your query strategies, set a default strategy and create
a `Resolver` object:
```js
import Resolver, { ResolverContext, SparqlQueryStrategyFactory } from 'gql-resolver';
import fs = require('fs');

const schema = fs.readFileSync('swapi.graphql', 'utf8');
const sparql = new SparqlQueryStrategyFactory();
const sql = new SqlQueryStrategyFactory();
const context = new ResolverContext({
  schema,
  strategies: { sparql, sql },
  defaultStrategy: 'sparql'
});
const resolver = new Resolver(context);
```

Then, later, use `resolver` to resolve a query:

```js
const query = ```query {
  allFilms(first: 1) {
    films {
      title
      episodeID
      characterConnection(first: 3, after:"YXJyYXljb25uZWN0aW9uOjg=") {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        characters {
          name
        }
      }
    }
  }
}```;
const result = await resolver.resolve(query);
```

Resulting in:

```json
{
  "data": {
    "allFilms": {
      "films": [
        {
          "title": "A New Hope",
          "episodeID": 4,
          "characterConnection": {
            "totalCount": 18,
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "YXJyYXljb25uZWN0aW9uOjEx"
            },
            "characters": [
              {
                "name": "Obi-Wan Kenobi"
              },
              {
                "name": "Wilhuff Tarkin"
              },
              {
                "name": "Chewbacca"
              }
            ]
          }
        }
      ]
    }
  }
}
```

## Overview

Each field of a GraphQL query can be resolved individually, from a different
data source. The existing general methodology to resolve GraphQL queries is
thus usually done per field, often leading to performing many separate database
queries. For simple queries and small databases, this is a simple and flexible
approach that doesn't incur bad performance. As queries get more complicated
and the data volume grows, this query resolution process gets increasingly
expensive and requires optimizations.

Those optimizations usually take the form of either reworking the graphql
queries or making specialized changes in the resolution code to adapt to the
growing complexity. But, originally, the promise of GraphQL was declaring a
complete data model in a well defined schema that is decoupled from the
resolution process for fulfilling queries.

The `graphql-resolver` project is designed to maintain the decoupling between
the schema and the resolution process and provide a general resolution
methodology that is still highly flexible in terms of data sources, but
performs well as data volume and schema complexity grows.

# The Resolution Process

```graphql
{
  hero {
    name
    friends {
      name
    }
  }
}
```

Consider the simple query above. This is an example from the well-known Star
Wars schema where `hero` returns a `Character` object from which we're
extracting two fields. The first, `name` is a simple, primitive `String` type
with a scalar value (like `Luke` or `R2-D2`). The second, `friends`, is a list
of `Character` objects representing other characters who are friends with this
character. In our query, we're only extracting the name of each friend.

We can say this GraphQL query has two levels. The first level gets the heroes.
The second level gets the friends of each hero. We can imagine breaking the
resolution process down into three steps.

1. Get all the simple, scalar values at the first level. In our example above
   this means loading the names of a bunch of heroes. For an SQL data source,
   this might mean running a query like `select c.id, c.name from characters c
   join episodes e where e.hero_id = c.id`. This assumes we have an `episodes`
   table that stores the hero of each episode using the hero's `characters.id`.
   Also note that we've returned the character `id` field, even though it won't
   be returned to the caller. We need that `id` for step 2.
2. Get all the object values in the top level query that are associated with
   the scalars we loaded in the first step. For an SQL data source this might
   mean running a query like `select c.name from characters c join friends f on
   c.id = f.friend1_id where f.friend2_id in ($IDS_FROM_STEP_1)`. This assumes
   we've stored two entries in the `friends` table for each pair of friends
   (from `R2D2` to `C3PO` and from `C3PO` to `R2D2`).
3. Merge the results from the previous steps into a unified JSON response and
   return to the caller.

Now, we _could_ have written a query that requests an object value from each
friend. This would add another level to the query. More generally, we may have
`N` levels where each level contains zero or more scalars and zero or more
object fields. At any given level, we first pull the scalar values. Then we
pull the object values. Then we weave them together.

Let's call this three step process an _execution plan_. Note that step 2 is
recursive. From the point of view of level `1`, resolving its objects requires
resolving level `2`, which itself involves a three step execution plan. And
resolving objects, if any, at level `2` requires an execution plan for level
`3` and so on. Ultimately a level will contain no objects and thus no execution
sub-plans and we can unwind the process back up to level `1`, where we can
finally weave everything together and return a result to the caller.

So each execution plan has a list of scalar fields to resolve and a list of
sub-plans, one for each of its object fields. In addition, resolution of the
sub-plans requires we first completely resolve all of the scalars, so the
sub-plans will know how to constrain their queries to only those objects
associated with their parent plan. And we have to make sure those scalars that
are resolved include the unique identifiers of the objects to which they
belong.

# Supporting Multiple Data Sources

Now let's add another degree of complexity.  How can we support the ability to
resolve fields from different data sources? The solution we chose is to create
the notion of a `QueryStrategy`. Some of our data may be in a relational
database, for which we want to use an `SQLQueryStrategy`. Other data may be in
a third party API for which we use an `APIQueryStrategy`. Other data still
might be stored in an RDF triple store, requiring a `SparqlQueryStrategy`. A
single level of any graphql query should be able to weave data from any and all
of these sources together. Let's redefine step 1 of our execution plan to take
this into account:

1. Partition scalars by query strategy. Have each strategy asynchronously
   resolve its fields and return a `QueryResult`, which is then merged into the
   central plan result. We'll delve into the details of this structure later,
   but its effectively a data table structure, where the rows are ordered
   according to the requested sort order if any and the columns are ordered
   according to the order of the fields in the graphql query. Further, each row
   contains a unique identifier that allows us to merge in other data tables
   where needed.

The other two steps are the same as before, but we'll add some technical
detail:

2. Execute all sub-plans asynchronously, making the plan's `QueryResult` result
   from step one available to each sub-plan. As sub-plan results become
   available, merge them into the central parent plan's `QueryResult`.
3. Finalize the plan's `QueryResult` to meet ordering guarantees and return to
   the caller.

So the first two steps result in multiple queries, some simultaneously, others
in a particular sequence.

It may be helpful to consider that the only queries performed are for scalar
properties. This doesn't mean we query only a single value a time. It just
means resolving objects is about executing plans and the only queries performed
in a given plan are to resolve scalars. Further, we gain efficiencies by using
the parent objects of any given query level to constrain that level's queries
and we write our strategies to query all the objects for a given level in a
single data source request. For simple queries with limited levels and few
objects, this approach is of limited value, but it significantly reduces the
total number of queries performed as query size, complexity and scale grows.
The default resolution scheme of many popular GraphQL engines involves running
one query per parent object (select friends for a particular parent hero and
repeat, not select all the friends for all the parent heroes once).

# Merging Results Together

Let's turn our attention to some details around capturing and organizing the
results as they become available. In our initial formulation we said step 3 was
about _weaving_ together the results from our first two steps. In our
reformulation we said results were contained in a `QueryResult` object that was
similar to a database result set. We also used the term _merge_ instead of
_weave_ and we indicated those _merges_ were happening at every step of the
plan, not just the final one. And we hinted that ordering was important. It's
worth thinking about how this merging works. To do this, we need to look more
closely at what kind of data structure we're using to store results.

At a basic level a `QueryResult` holds an ordered map of rows of data, keyed on
primary id, with each row itself being an ordered map of the fields requested
in the graphql query. While we could represent this structure using an array of
objects, that would not allow us to guarantee the order of the fields returned
(as javascript objects don't guarantee a user-defined traversal ordering). We
could represent the results as an array of arrays, with would guarantee
traversal order. However, ImmutableJS has more sophisticated collection classes
that will make it easier to merge `QueryResult` objects, which we must do
frequently in our resolution process.

A `QueryResult` holds a list of `GQLField` definition objects as well its data
matrix and has a method to merge another `QueryResult` into itself.

```ts
interface IQueryResult {
  data: OrderedMap<string, OrderedMap<string, any>>;
  // ...perhaps other metadata fields...
  merge(that: QueryResult): QueryResult;
}
```

At a given query level, for a given query strategy, if we're asking for user
data, say three fields: `firstName`, `lastName` and `age`, our strategy
resolver would return something like:

```ts
// in a QueryStrategy::resolve() method...
// get results from data source, assume as an array of objects
const fromDataSource: {
  id: string, firstName:string, lastName:string, age:number
}[] = [...];

// produce our result
return new QueryResult({
  data: OrderedMap<string, OrderedMap<string, any>>(
    fromDataSource.map(row =>
      [row.id, OrderedMap<string, any>(this.fields.map(f => {
        const key = f.alias.getOrElse(f.name);
        return [key, row[key]];
      }))]
    )
  )
});
```

Without loss of generality, we let the `id` field represent the unique
identifier of the row data as a _string_. In cases where there are multiple
primary key fields in a data store or they are called something other than
`id`, we can simply concatenate their data in a canonical order and relabel the
value as `id`. This field is collected and managed automatically by the library
and is not part of returned query results.

Here's what the `QueryResult::merge()` method looks like:

```ts
merge(that: QueryResult):QueryResult {
  this.data = this.data.mergeDeep(that.data);
  //...perhaps update other metadata fields...
}
```

We let ImmutableJS do the hard work for us here with its `mergeDeep` method.
Recall the `QueryResult::data` member is a map from primary id's to row data.
The `mergeDeep` method will deeply merge the row data from this and that for
the same primary key. Because by definition the row data from different
strategies at the same level of a graphql query doesn't overlap, this method
will successfully merge in each strategy's result, linked data associated with
the same primary id. If we had used ImmutableJS's `merge` method instead, each
successive strategy would completely replace previously merged strategies'
data,

To see this, consider another second query strategy at the same level as the
previous strategy that is responsible for pulling in the user's email address
and avatar.

```ts
// in strategy resolve() method...
// get results from data source, assume as an array of objects
const fromDataSource: {
  id: string, email:string, avatar:string
}[] = [...];

// produce our result
return new QueryResult({
  data: OrderedMap<string, OrderedMap<string, any>>(
    fromDataSource.map(row =>
      [row.id, OrderedMap<string, any>(this.fields.map(f => {
        const key = f.alias.getOrElse(f.name);
        return [key, row[key]];
      }))]
    )
  )
});
```

Note that this strategy, while having a different `fromDataSource` structure,
is identical otherwise. The unique part of each query strategy resolution is
munging things from the data source into the `fromDataSource` object. But
converting the `fromDataSource` into a `QueryResult` is the same for each
strategy.

Again, from inside the execution plan, when this strategy's `QueryResult` is
ready, we merge it into the plan's `result`. Again the fields are
non-overlapping, ImmutableJS' `mergeDeep` binds this data automatically with
corresponding data from the previous strategy.

Now two different query strategies have asynchronously resolved their queries
and returned maps that have been merged into the execution plan's main result.
Sub-plans can now reliably use `this.parent.result` to refer to the complete
scalar results from their parents during their own execution processes.

Once the strategies have finished, we can execute the sub-plans. Each plan has
an `execute()` method that returns a result `QueryResult`. This works the same
way as the `QueryStrategy.resolve()` methods. Step 2 of our execution plan
simply resolves each sub-plan asynchronously and when available merges the
resulting `QueryResult` into the parent execution plan's `QueryResult` at the
key named after the plan (`plan.alias.getOrElse(plan.name)`).

# Finalizing Execution Plan Results

So far so good. But after steps 1 and 2 of the plan (resolve query strategies
and execute sub-plans) we still need to do two things before we return our plan
result. First, we need to ensure proper ordering, both the sort order of the
rows as well as the field ordering of the columns. The joint, asynchronous
resolution of multiple query strategies will lead both to fields being stored
in an order inconsistent with the field request order and result rows being
sorted in an order inconsistent with specified sorting requirements. Field
order is easy to fix by recreating each internal OrderedMap row inserting keys
in the field order dictated by the execution plan's field list. The sort order
of all the rows is more complicated to solve and I don't have a preferred
solution at the moment.

Second, we need to _hoist_ the existing results up into the parent execution
plan. Each execution plan is responsible for producing a nested substructure in
the results of its parent object. That nested substructure hangs off a single
key in the parent result. Even the root execution plan at the top of the query
hierarchy inserts itself into a single key in the final result named after the
operation requested by the user.

```ts
finalizeResults(): OrderedMap<string,any> {
  const newResult = new OrderedMap().withMutations(m => {
    this.fields.forEach(f =>
      const key = f.alias.getOrElse(f.name);
      m.set(key, this.result.get(key))
    );
  });
  this.result = new OrderedMap({
    [this.alias.getOrElse(this.name)]: newResult
  });
}
```
