import {Option} from 'funfix';
import {GraphQLLexer} from '../../antlr4/generated/GraphQLLexer';
import {GraphQLListener} from '../../antlr4/generated/GraphQLListener';
import {DocumentContext, GraphQLParser, TypeContext} from '../../antlr4/generated/GraphQLParser';
import {GQLType} from '../../models/GQLType';
import BuilderBase from '../BuilderBase';

export default class GQLDocumentBuilder<T> extends BuilderBase<T>
  implements GraphQLListener {
  public lexer(inputStream) {
    return new GraphQLLexer(inputStream);
  }

  public parser(tokenStream) {
    return new GraphQLParser(tokenStream);
  }

  public getType(ctx: TypeContext) {
    const lt = Option.of(ctx.listType());
    const isList = lt.nonEmpty();
    const typ = lt.map((t) => t.type()).getOrElse(ctx);
    return new GQLType({
      isList,
      isRequired: Option.of(ctx.nonNullType()).nonEmpty(),
      name: this.textOf(typ.typeName().NAME()),
    });
  }

  public parseWith(parser: GraphQLParser) {
    parser.document();
  }

  public enterDocument(ctx: DocumentContext) {
    console.log('start parse'); // tslint:disable-line
  }
}
