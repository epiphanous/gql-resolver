import { ANTLRInputStream, TokenStream } from 'antlr4ts';
import { Option } from 'funfix';
import { GraphQLLexer } from '../../antlr4/generated/GraphQLLexer';
import { GraphQLListener } from '../../antlr4/generated/GraphQLListener';
import {
  DocumentContext,
  GraphQLParser,
  TypeContext,
  NamedTypeContext,
} from '../../antlr4/generated/GraphQLParser';
import { GQLType } from '../../models/GQLType';
import BuilderBase from '../BuilderBase';
import { ListTypeContext } from '../../antlr4/generated/GraphQLParser';

export default class GQLDocumentBuilder<T> extends BuilderBase<T>
  implements GraphQLListener {
  public lexer(inputStream: ANTLRInputStream) {
    return new GraphQLLexer(inputStream);
  }

  public parser(tokenStream: TokenStream) {
    return new GraphQLParser(tokenStream);
  }

  public getType(ctx: TypeContext, req: boolean = false, lst: boolean = false) {
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
}
