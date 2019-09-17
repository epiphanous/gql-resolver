import { OrderedMap } from 'immutable';
import { GQLError, QueryResult, QueryValue } from '../../models';

export interface IBinding {
  datatype?: string;
  lang?: string;
  type: string;
  value: string;
}

export interface ISparqlJson {
  head: { vars: string[] };
  results: { bindings: Array<{ [key: string]: IBinding }> };
}

const xsd = (t: string) => `http://www.w3.org/2001/XMLSchema#${t}`;

export class SparqlResponse {
  public columns: string[] = [];
  public rows: Array<OrderedMap<string, QueryValue>> = [];
  public errors: Error[] = [];

  constructor(obj: ISparqlJson | Error) {
    if (obj instanceof Error) {
      this.errors = [obj];
    } else {
      this.columns = obj.head.vars;
      this.rows = obj.results.bindings.map(b => this.processRow(b));
    }
  }

  public errorCount(): number {
    return this.errors.length;
  }

  public ok(): boolean {
    return this.errorCount() === 0;
  }

  public size(): number {
    return this.rows.length;
  }

  public asQueryResult() {
    const result = new QueryResult();
    if (this.ok()) {
      result.addItems(this.rows);
    } else {
      result.addErrors(this.errors.map(e => new GQLError(e.message)));
    }
    result.finish();
    return result;
  }

  protected processRow(data: {
    [key: string]: IBinding;
  }): OrderedMap<string, QueryValue> {
    return OrderedMap<string, QueryValue>(
      this.columns.map(col => [col, this.processColumn(data[col])])
    );
  }

  protected processColumn(binding: IBinding | undefined): QueryValue {
    let value: QueryValue;
    if (typeof binding === 'undefined') {
      value = null;
    } else {
      switch (binding.datatype) {
        case xsd('double'):
        case xsd('float'):
        case xsd('decimal'):
          value = parseFloat(binding.value);
          break;
        case xsd('integer'):
          value = parseInt(binding.value, 10);
          break;
        case xsd('boolean'):
          value = binding.value === 'true';
          break;
        default:
          value = binding.value;
          break;
      }
    }
    return value;
  }
}
