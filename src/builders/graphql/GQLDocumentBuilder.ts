import { ANTLRInputStream, TokenStream } from 'antlr4ts';
import { Option } from 'funfix';
import { List, Map } from 'immutable';
import { GraphQLLexer } from '../../antlr4/generated/GraphQLLexer';
import { GraphQLListener } from '../../antlr4/generated/GraphQLListener';
import {
  BooleanValueContext,
  DefaultValueContext,
  DescriptionContext,
  DocumentContext,
  EmptyListValueContext,
  EmptyObjectValueContext,
  EnumValueContext,
  FloatValueContext,
  GraphQLParser,
  IntValueContext,
  NonEmptyListValueContext,
  NonEmptyObjectValueContext,
  NullValueContext,
  StringValueContext,
  TypeContext,
  ValueContext,
  VariableValueContext,
} from '../../antlr4/generated/GraphQLParser';
import { GQLType } from '../../models/GQLType';
import {
  GQLBooleanValue,
  GQLEnumValue,
  GQLFloatValue,
  GQLIntValue,
  GQLKeyedValueList,
  GQLNullValue,
  GQLStringValue,
  GQLValue,
  GQLValueList,
  GQLVariableValue,
} from '../../models/GQLValue';
import { GQLVariable } from '../../models/GQLVariable';
import BuilderBase from '../BuilderBase';

export default class GQLDocumentBuilder<T> extends BuilderBase<T>
  implements GraphQLListener {
  public lexer(inputStream: ANTLRInputStream) {
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
      this.textOf(typ.namedType().NAME()),
      isList,
      Option.of(ctx.nonNullType()).nonEmpty()
    );
  }

  public enterDocument(ctx: DocumentContext) {
    console.log('start parse');
  }

  public parseWith(parser: GraphQLParser): DocumentContext {
    return parser.document();
  }

  public getDescription(ctxOpt: Option<DescriptionContext>) {
    return ctxOpt.map(dc => this.textOf(dc.STRING_VALUE()));
  }

  public processValue(ctx: ValueContext): GQLValue {
    if (ctx instanceof VariableValueContext) {
      const varName = this.textOf(
        (ctx as VariableValueContext).variable().NAME()
      );
      return new GQLVariableValue(new GQLVariable(varName));
    }
    if (ctx instanceof IntValueContext) {
      return new GQLIntValue(
        parseInt(this.textOf((ctx as IntValueContext).INT_VALUE()), 10)
      );
    }
    if (ctx instanceof FloatValueContext) {
      return new GQLFloatValue(
        parseFloat(this.textOf((ctx as FloatValueContext).FLOAT_VALUE()))
      );
    }
    if (ctx instanceof StringValueContext) {
      return new GQLStringValue(
        this.textOf((ctx as StringValueContext).STRING_VALUE())
      );
    }
    if (ctx instanceof BooleanValueContext) {
      return new GQLBooleanValue(
        this.textOf((ctx as BooleanValueContext).BOOLEAN_VALUE()) === 'true'
      );
    }

    if (ctx instanceof NullValueContext) {
      return new GQLNullValue();
    }

    if (ctx instanceof EnumValueContext) {
      return new GQLEnumValue(this.textOf((ctx as EnumValueContext).NAME()));
    }

    if (ctx instanceof EmptyListValueContext) {
      return new GQLValueList(List<GQLValue>());
    }

    if (ctx instanceof NonEmptyListValueContext) {
      return new GQLValueList(
        List(
          (ctx as NonEmptyListValueContext)
            .value()
            .map(vc => this.processValue(vc))
        )
      );
    }

    if (ctx instanceof EmptyObjectValueContext) {
      return new GQLKeyedValueList(Map<string, GQLValue>());
    }

    if (ctx instanceof NonEmptyObjectValueContext) {
      return new GQLKeyedValueList(
        Map(
          (ctx as NonEmptyObjectValueContext)
            .objectField()
            .map<[string, GQLValue]>(of => {
              return [this.textOf(of.NAME()), this.processValue(of.value())];
            })
        )
      );
    }
  }

  public processDefaultValue(ctxOpt: Option<DefaultValueContext>) {
    return ctxOpt.map(dv => this.processValue(dv.value()));
  }
}
