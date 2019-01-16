import { Option } from 'funfix';
import { List, Map, OrderedMap, Set } from 'immutable';
import {GQLDirective} from './GQLDirective';
import {GQLField} from './GQLSelection';
import QueryResult from './QueryResult';
import QueryStrategy from './QueryStrategy';
import ResolverContext from './ResolverContext';

export interface IGQLExecutionPlan {
  parentTypes: Set<string>;
  name: string;
  key: string;
  subPlans: List<GQLExecutionPlan>;
  errors: List<Error>;
  result: QueryResult;
}

export class GQLExecutionPlan implements IGQLExecutionPlan {
  public parentTypes: Set<string>;
  public name: string;
  public key: string;
  public subPlans: List<GQLExecutionPlan> = List();
  public errors: List<Error> = List();
  public parent: GQLExecutionPlan;
  public context: ResolverContext;
  public alias: Option<string>;
  public args: Map<string, any>;
  public directives: List<GQLDirective>;
  public fields: List<GQLField>;
  public scalars: List<QueryResult>;
  public objects: List<QueryResult>;
  public result: QueryResult;

  constructor(
    parentTypes: Set<string>,
    name: string,
    key: string,
    subPlans: List<GQLExecutionPlan> = List(),
    errors: List<Error> = List()
  ) {
    this.parentTypes = parentTypes;
    this.name = name;
    this.key = key;
    this.subPlans = subPlans;
    this.errors = errors;
  }

  public async execute() {
    this.result.startTime = new Date().getTime();
    this.scalars = await this.resolveFields(s => !s.isPlan, this.parent);
    this.objects = await this.resolveFields(s => s.isPlan, this);
    return this.makePlanResult();
  }

  public async resolveFields(f: (QueryStrategy) => boolean, parent: GQLExecutionPlan) {
    return this.fieldsByStrategy()
      .filter(f)
      .map((fields, strategy) =>
        strategy.resolve(fields, parent)
      ).toList();
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
    }), { bytes: 0, count: 0, ok: true, errors: List<string>() });

    pr.bytes = reduced.bytes;
    pr.count = reduced.count;
    pr.ok = reduced.ok;
    pr.errors = reduced.errors;
    pr.duration = new Date().getTime() - this.result.startTime;
    pr.done = true;

    /**
     * TODO Add missing methods, remove redundant execPlans, replace with this one
     */
  }
}
