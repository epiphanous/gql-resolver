import { Option } from 'funfix';
import { List, Map, OrderedMap, Set } from 'immutable';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import {
  GQLExecutionPlan,
  GQLField,
  GQLFieldDefinition,
  GQLType,
  QMContext,
  QMFieldRef,
  QMOrderBy,
  QueryResult,
  SimpleNamespace,
} from '../../models';
import { QueryStrategy } from '../abstract';
import { ISparqlJson, SparqlResponse } from './SparqlResponse';
import { decodeCursor, literalify, prefixify, variablify } from './SparqlUtils';

export class SparqlQueryStrategy extends QueryStrategy {
  public static readonly SUBJECT_BINDING: string = 'subject';
  public static readonly SUBJECT_VARIABLE: string = variablify(
    SparqlQueryStrategy.SUBJECT_BINDING
  );
  public static readonly PARENT_BINDING: string = 'parent';
  public static readonly PARENT_VARIABLE: string = variablify(
    SparqlQueryStrategy.PARENT_BINDING
  );
  public static readonly DEFAULT_PAGE_SIZE: number = 10;

  protected fields: List<GQLField>;
  protected plan: GQLExecutionPlan;
  protected endpoint: string;
  protected prefixes: Map<string, SimpleNamespace>;
  protected parents: Set<string>;
  protected sortKeys: List<QMOrderBy>;
  protected wantsParentBinding: boolean;
  protected wantsSubjectBinding: boolean;
  protected fieldAliases: OrderedMap<string, string>;
  protected fieldProjections: OrderedMap<string, string>;
  protected parentSubjectProjections: OrderedMap<string, string>;
  protected planType: string;
  protected planName: string;
  protected query: string;

  public constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    endpoint: string,
    prefixes: Map<string, SimpleNamespace>,
    wantsParentBinding: boolean = false,
    wantsSubjectBinding: boolean = true
  ) {
    super(fields, plan);
    this.endpoint = endpoint;
    this.prefixes = prefixes;
    this.wantsParentBinding = wantsParentBinding;
    this.wantsSubjectBinding = wantsSubjectBinding;
    this.init();
  }

  public resolve(): Promise<QueryResult> {
    return this.select();
  }

  protected init() {
    this.planType = prefixify(this.plan.resultType.name);
    this.planName = prefixify(this.plan.name);
    this.parents = this.getParents();
    this.fieldAliases = this.getFieldAliases();
    this.fieldProjections = this.getFieldProjections();
    this.parentSubjectProjections = this.getParentSubjectProjections();
    this.sortKeys = this.getSortKeys();
    this.query = this.getQuery();
  }

  protected getPrefixDecl() {
    return this.prefixes
      .map(ns => `PREFIX ${ns.getPrefix()}: <${ns.getName()}>`)
      .join('\n');
  }

  protected getFieldAliases(): OrderedMap<string, string> {
    return OrderedMap(
      this.fields
        .map<[string, string]>(f => [f.name, f.getAliasOrName()])
        .toArray()
    );
  }

  protected getFieldProjections(): OrderedMap<string, string> {
    return this.fieldAliases.map(a => variablify(a));
  }

  protected getParentSubjectProjections(): OrderedMap<string, string> {
    const projections: Array<[string, string]> = [];
    if (this.wantsParentBinding) {
      projections.push([
        SparqlQueryStrategy.PARENT_BINDING,
        SparqlQueryStrategy.PARENT_VARIABLE,
      ]);
    }
    if (this.wantsSubjectBinding) {
      projections.push([
        SparqlQueryStrategy.SUBJECT_BINDING,
        SparqlQueryStrategy.SUBJECT_VARIABLE,
      ]);
    }
    return OrderedMap(projections);
  }

  protected getOrderByProjections(): OrderedMap<string, string> {
    const sortByFields = OrderedMap(
      this.sortKeys.map<[string, string]>(s => [
        s.field.name,
        `${s.desc ? 'DESC(' : ''}${variablify(
          Option.of(this.fieldProjections.get(s.field.name)).getOrElse(
            s.field.name
          )
        )}${s.desc ? ')' : ''}`,
      ])
    );
    return this.parentSubjectProjections.concat(sortByFields);
  }

  protected getProjections(): OrderedMap<string, string> {
    return this.parentSubjectProjections.concat(this.fieldProjections);
  }

  protected getSubjectTypePattern() {
    // always do this, even if we don't want the subject binding
    return [
      SparqlQueryStrategy.SUBJECT_VARIABLE,
      'rdf:type',
      this.planType,
    ].join(' ');
  }

  protected getParents(): Set<string> {
    if (this.plan.parent) {
      return this.plan
        .parent!.getSubjectIds()
        .map(pid => prefixify(pid))
        .toSet();
    } else {
      return Set();
    }
  }

  protected getParentPattern(indent: string = '  ') {
    if (this.plan.parent) {
      return (
        indent +
        [
          SparqlQueryStrategy.PARENT_VARIABLE,
          this.planName,
          SparqlQueryStrategy.SUBJECT_VARIABLE,
          '.',
        ].join(' ')
      );
    } else {
      return '';
    }
  }

  protected getParentsValuesClause(indent: string = '  ') {
    return this.parents.size > 0
      ? [
          `${indent}VALUES ${SparqlQueryStrategy.PARENT_VARIABLE} {`,
          ...this.parents.toArray(),
          `${indent}}`,
        ].join('\n${indent}${indent}')
      : '';
  }

  protected getFilterFields(): Set<string> {
    return this.plan.processedArgs.filter.map(f => f.fields).getOrElse(Set());
  }

  protected getSortKeys(): List<QMOrderBy> {
    const qmc = new QMContext();
    return this.plan.processedArgs.orderBys
      .map(obs => obs.qmOrderBys)
      .getOrElse(List<QMOrderBy>())
      .push(
        new QMOrderBy(
          qmc,
          new QMFieldRef(
            qmc,
            new GQLFieldDefinition(
              SparqlQueryStrategy.SUBJECT_BINDING,
              GQLType.String
            )
          )
        )
      );
  }

  protected getSubjectPatterns(indent: string = '  ') {
    const fieldAliases = this.fieldAliases.filterNot((a, _) => /^\(/.test(a));
    const fieldAliasesSet = fieldAliases.toSet();
    const filterFields = this.getFilterFields().filterNot(ff =>
      fieldAliasesSet.contains(ff)
    );
    const orderByFields = this.sortKeys
      .map(sb => sb.field)
      .toSet()
      .filterNot(
        sf =>
          fieldAliases.has(sf.name) ||
          sf.name === this.plan.subjectIdFieldDefinition.name
      )
      .map(sf => sf.name);
    const projMap = fieldAliases
      .concat(filterFields.toOrderedMap())
      .concat(orderByFields.toOrderedMap())
      .mapKeys(k => prefixify(k))
      .map(a => variablify(a));
    const subjPattern = this.getSubjectTypePattern();
    if (projMap.size > 0) {
      return `${indent}${subjPattern} ;\n${projMap
        .map((a, n) => `${n} ${a}`)
        .join(` ;\n${indent}${indent}`)} .`;
    } else {
      return `${indent}${subjPattern} .`;
    }
  }

  protected getFilterClause(indent: string = '  ') {
    const filters = List([
      this.getCursorClause(),
      this.plan.processedArgs.filter
        .map(f => f.expression.expression)
        .getOrElse(''),
    ]).filterNot(c => c.length === 0);
    return filters.size > 0
      ? `${indent}FILTER ((${filters.join(' ) && ( ')}))`
      : '';
  }

  protected getGroupByProjections(): OrderedMap<string, string> {
    return OrderedMap<string, string>();
  }

  protected joinClauses(clauses: List<string>) {
    return clauses.filterNot(c => c.length > 0).join('\n');
  }

  protected getWhereClause() {
    const whereParts = this.joinClauses(
      List([
        this.getSubjectPatterns(),
        this.getParentPattern(),
        this.getFilterClause(),
        this.getParentsValuesClause(),
      ])
    );
    return whereParts.length > 0 ? `WHERE {\n${whereParts}\n}` : '';
  }

  protected getCursorClause() {
    const [before, after] = [
      this.plan.processedArgs.before,
      this.plan.processedArgs.after,
    ];
    if (before.isEmpty() && after.isEmpty()) {
      return '';
    }
    const forward = before.isEmpty();
    const cursor = decodeCursor(forward ? after.get()! : before.get()!);
    const ops = forward ? { asc: '>', desc: '<' } : { asc: '<', desc: '>' };
    const conditions = this.sortKeys.map((s, i) => {
      const ikey = s.field.name;
      const iop: string = s.desc ? ops.desc : ops.asc;
      const ivalue: string | number = literalify(cursor[ikey]);
      return this.sortKeys
        .take(i)
        .map((t, _) => {
          const jkey = t.field.name;
          const jvalue: string | number = literalify(cursor[jkey]);
          return `${variablify(jkey)} = ${jvalue}`;
        })
        .push(`${variablify(ikey)} ${iop} ${ivalue}`)
        .join(' && ');
    });
    return conditions.size > 0 ? `( ${conditions.join(' ) || ( ')} )` : '';
  }

  protected getSelectClause() {
    const clause = this.getOptionalProjectionClause(
      this.getProjections(),
      'SELECT'
    );
    if (clause.length === 0) {
      throw new Error(`Plan ${this.planName} has no projections to query`);
    }
    return clause;
  }

  protected getOptionalProjectionClause(
    proj: OrderedMap<string, string>,
    prefix: string
  ) {
    return proj.size > 0 ? `${prefix} ${proj.join(' ')}` : '';
  }

  protected getGroupClause() {
    return this.getOptionalProjectionClause(
      this.getGroupByProjections(),
      'GROUP BY'
    );
  }

  protected getOrderClause() {
    return this.getOptionalProjectionClause(
      this.getOrderByProjections(),
      'ORDER BY'
    );
  }

  protected getLimitClause(): string {
    const [before, after, first, last] = [
      this.plan.processedArgs.before,
      this.plan.processedArgs.after,
      this.plan.processedArgs.first,
      this.plan.processedArgs.last,
    ];
    const hasBeforeOrAfter = before.nonEmpty() || after.nonEmpty();
    const hasFirstOrLast = first.nonEmpty() || last.nonEmpty();
    let limit = first.getOrElse(
      last.getOrElse(
        hasBeforeOrAfter ? SparqlQueryStrategy.DEFAULT_PAGE_SIZE : 0
      )
    );
    if (hasFirstOrLast && limit <= 0) {
      limit = SparqlQueryStrategy.DEFAULT_PAGE_SIZE;
    }
    return limit > 0 ? `LIMIT ${limit}` : '';
  }

  protected getSolutionModifier() {
    return this.joinClauses(
      List([
        this.getGroupClause(),
        this.getOrderClause(),
        this.getLimitClause(),
      ])
    );
  }

  protected getQuery() {
    return this.joinClauses(
      List([
        this.getPrefixDecl(),
        this.getSelectClause(),
        this.getWhereClause(),
        this.getSolutionModifier(),
      ])
    );
  }

  /**
   * Executes a select sparql query.
   * @param {(SparqlResponse) => QueryResult} transform the returned sparql response to a query result
   * @returns {Promise<QueryResult>}
   */
  protected select(
    transform: (resp: SparqlResponse) => QueryResult = resp =>
      resp.asQueryResult()
  ): Promise<QueryResult> {
    return fetch(this.endpoint, {
      method: 'POST',
      body: new URLSearchParams({ query: this.query }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((json: ISparqlJson) => transform(new SparqlResponse(json)))
      .catch((err: Error) => transform(new SparqlResponse(err)));
  }
}
