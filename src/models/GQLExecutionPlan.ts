import { Option } from 'funfix';
import { List, Map, OrderedMap, Set } from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLField} from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from './QueryStrategy';
import ResolverContext from './ResolverContext';

export interface IGQLExecutionPlan {
  // parentTypes: Set<string>;
  name: string;
  // key: string;
  // subPlans: List<GQLExecutionPlan>;
  errors: List<Error>;
  result: QueryResult;
}

export class GQLExecutionPlan implements IGQLExecutionPlan {

  public parent: GQLExecutionPlan;
  // public parentTypes: Set<string>;
  public name: string;
  // public key: string;
  // public subPlans: List<GQLExecutionPlan> = List();
  public context: ResolverContext;
  public alias: Option<string>;
  public args: Map<string, any>;
  public directives: List<GQLDirective>;
  public fields: List<GQLField>;
  public scalars: List<QueryResult>;
  public objects: List<QueryResult>;
  public result: QueryResult;
  public errors: List<Error> = List();

  constructor(
    // parentTypes: Set<string>,
    name: string,
    // key: string,
    // subPlans: List<GQLExecutionPlan> = List(),
    errors: List<Error> = List(),
    context: ResolverContext,
    alias: Option<string>,
    args: Map<string, any>,
    directives: List<GQLDirective>,
    fields: List<GQLField>
  ) {
    // this.parentTypes = parentTypes;
    this.name = name;
    // this.key = key;
    // this.subPlans = subPlans;
    this.errors = errors;
    this.result = new QueryResult();
    this.context = context;
    this.alias = alias;
    this.args = args;
    this.directives = directives;
    this.fields = fields;
  }

  public async execute() {
    this.result.startTime = new Date().getTime();
    this.scalars = List(await Promise.all(await this.resolveFields((s: QueryStrategy) => !s.isPlan, this.parent)));
    this.objects = List(await Promise.all(await this.resolveFields((s: QueryStrategy) => s.isPlan, this)));
    return this.makePlanResult();
  }

  public async resolveFields(f: (QueryStrategy) => boolean, parent: GQLExecutionPlan) {
    return this.fieldsByStrategy()
      .filter(f)
      .map((fields, strategy) =>
        strategy.resolve(fields, parent)
      )
      .toList();
  }

  public makePlanResult() {
    const pr = this.result;
    const qrs = this.scalars.concat(this.objects);
    const values = qrs.flatMap(qr => qr.values);
    pr.values = this.fields.map(f => {
      const alias = f.alias || f.name;
      return values.find(v => v[0] === alias);
    });
    const reduced = qrs.reduce((r, qr) => ({
      bytes: r.bytes + qr.bytes,
      count: r.count + qr.count,
      ok: r.ok && qr.ok,
      errors: r.errors.concat(qr.errors)
    }), {bytes: 0, count: 0, ok: true, errors: List<string>()});

    pr.bytes = reduced.bytes;
    pr.count = reduced.count;
    pr.ok = reduced.ok;
    pr.errors = reduced.errors;
    pr.duration = new Date().getTime() - this.result.startTime;
    pr.done = true;
  }

  public getSubjectIds(): List<Map<string, string>> {
      return List();
  }

  public getSubjectIdFields(): List<string> {
    return List();
  }

  public fieldsByStrategy(): Map<QueryStrategy, List<GQLField>> {
    return Map();
  }
}
