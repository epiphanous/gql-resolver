import faker from 'faker';
import { List, Range } from 'immutable';
import { GQLField } from '../../models';
import { GQLExecutionPlan } from '../../models/GQLExecutionPlan';
import { GQLType } from '../../models/GQLType';
import { QueryResult, QueryValue, Scalar } from '../../models/QueryResult';
import { QueryStrategy } from '../base/QueryStrategy';
import { IMockQueryStrategyConfig } from './MockQueryStrategyFactory';

export class MockQueryStrategy extends QueryStrategy {
  private config: IMockQueryStrategyConfig;

  constructor(
    fields: List<GQLField>,
    plan: GQLExecutionPlan,
    config: IMockQueryStrategyConfig
  ) {
    super(fields, plan);
    this.config = config;
  }

  public resolve(): Promise<QueryResult> {
    const result = new QueryResult(false);
    return new Promise(() => result);
    // return new Promise((this.fields.map(f => this.mockValue(f));
  }

  private mockValue(field: GQLField): QueryValue {
    return this.plan.context.schema
      .getFieldDefinition(field.name)
      .map(fd => this.valueOfType(fd.gqlType))
      .getOrElse(null);
  }

  private valueOfType(type: GQLType): QueryValue {
    if (!type.isRequired) {
      if (Math.random() <= this.config.probNull) {
        return null;
      }
    }
    const n = type.isList ? Math.max(2, Math.ceil(Math.random() * 10)) : 1;
    const gen = (f: () => Scalar) =>
      n === 1
        ? f()
        : Range(1, n)
            .map(i => f())
            .toList();
    switch (type.name) {
      case 'ID':
        return gen(faker.random.uuid);
        break;
      case 'Boolean':
        return gen(faker.random.boolean);
        break;
      case 'Float':
        return gen(() => faker.finance.amount(50, 5000, 2));
        break;
      case 'Int':
        return gen(() => faker.random.number(100));
        break;
      case 'String':
        return gen(faker.lorem.words);
        break;
      case 'URL':
      case 'URI':
        return gen(faker.internet.url);
        break;
      case 'Date':
        return gen(() => faker.date.recent(30).toLocaleDateString());
        break;
      case 'Time':
        return gen(() => faker.date.recent().toLocaleTimeString());
        break;
      case 'DateTime':
        return gen(() => faker.date.recent().toISOString());
        break;
      case 'Duration':
        return gen(() => {
          const minutes = faker.random.number({ min: 720, max: 30000 });
          const days = Math.floor(minutes / 1440);
          let rem = minutes % 1440;
          const hours = Math.floor(rem / 60);
          rem = rem % 60;
          return `P${days}D${hours}H${rem}M`;
        });
        break;
      default:
        return null;
        break;
    }
  }
}
