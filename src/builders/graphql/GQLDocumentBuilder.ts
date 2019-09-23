import { CodePointCharStream, TokenStream } from 'antlr4ts';
import { Option } from 'funfix';
import { List, Map } from 'immutable';
import {
  BooleanValueContext,
  DefaultValueContext,
  DescriptionContext,
  DocumentContext,
  EmptyListValueContext,
  EmptyObjectValueContext,
  EnumValueContext,
  FloatValueContext,
  GraphQLLexer,
  GraphQLListener,
  GraphQLParser,
  IntValueContext,
  NonEmptyListValueContext,
  NonEmptyObjectValueContext,
  NullValueContext,
  StringValueContext,
  TypeContext,
  ValueContext,
  VariableValueContext,
} from '../../antlr4';
import { GQLType, GQLValueType } from '../../models';
import { BuilderBase } from '../BuilderBase';

export class GQLDocumentBuilder<T> extends BuilderBase<T>
  implements GraphQLListener {
  public lexer(inputStream: CodePointCharStream) {
    return new GraphQLLexer(inputStream);
  }

  public parser(tokenStream: TokenStream) {
    return new GraphQLParser(tokenStream);
  }

  public getType(ctx: TypeContext) {
    const lt = Option.of(ctx.listType());
    const isList = lt.nonEmpty();
    const typ = lt.map(t => t.type()).getOrElse(ctx);
    return new GQLType(
      this.textOf(typ.namedType()!.NAME()),
      isList,
      Option.of(ctx.nonNullType()).nonEmpty()
    );
  }

  public parseWith(parser: GraphQLParser): DocumentContext {
    return parser.document();
  }

  public getDescription(ctxOpt: Option<DescriptionContext>) {
    return ctxOpt.map(dc => this.textOf(dc.STRING_VALUE()));
  }

  public processValue(ctx: ValueContext): GQLValueType {
    if (ctx instanceof VariableValueContext) {
      return (ctx as VariableValueContext).variable().text;
    }
    if (ctx instanceof IntValueContext) {
      return parseInt(this.textOf((ctx as IntValueContext).INT_VALUE()), 10);
    }
    if (ctx instanceof FloatValueContext) {
      return parseFloat(this.textOf((ctx as FloatValueContext).FLOAT_VALUE()));
    }
    if (ctx instanceof StringValueContext) {
      return this.textOf((ctx as StringValueContext).STRING_VALUE());
    }
    if (ctx instanceof BooleanValueContext) {
      return (
        this.textOf(
          (ctx as BooleanValueContext).BOOLEAN_VALUE()
        ).toLowerCase() === 'true'
      );
    }

    if (ctx instanceof NullValueContext) {
      return null;
    }

    if (ctx instanceof EnumValueContext) {
      return this.textOf((ctx as EnumValueContext).NAME());
    }

    if (ctx instanceof EmptyListValueContext) {
      return List<GQLValueType>();
    }

    if (ctx instanceof NonEmptyListValueContext) {
      return List(
        (ctx as NonEmptyListValueContext)
          .value()
          .map(vc => this.processValue(vc))
      );
    }

    if (ctx instanceof EmptyObjectValueContext) {
      return Map<string, GQLValueType>();
    }

    if (ctx instanceof NonEmptyObjectValueContext) {
      return Map(
        (ctx as NonEmptyObjectValueContext)
          .objectField()
          .map<[string, GQLValueType]>(of => {
            return [this.textOf(of.NAME()), this.processValue(of.value())];
          })
      );
    }
    throw new Error('Unsupported ValueContext ' + ctx);
  }

  public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
    return ctxOpt.map<GQLValueType>(dv => this.processValue(dv.value()));
  }
}
