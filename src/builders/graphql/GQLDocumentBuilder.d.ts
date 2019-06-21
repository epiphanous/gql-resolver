import { ANTLRInputStream, TokenStream } from 'antlr4ts';
import { Option } from 'funfix';
import { GraphQLLexer } from '../../antlr4/generated/GraphQLLexer';
import { GraphQLListener } from '../../antlr4/generated/GraphQLListener';
import { DefaultValueContext, DescriptionContext, DocumentContext, GraphQLParser, TypeContext, ValueContext } from '../../antlr4/generated/GraphQLParser';
import { GQLType } from '../../models/GQLType';
import { GQLValue } from '../../models/GQLValue';
import { BuilderBase } from '../BuilderBase';
export declare class GQLDocumentBuilder<T> extends BuilderBase<T> implements GraphQLListener {
    lexer(inputStream: ANTLRInputStream): GraphQLLexer;
    parser(tokenStream: TokenStream): GraphQLParser;
    getType(ctx: TypeContext): GQLType;
    enterDocument(ctx: DocumentContext): void;
    parseWith(parser: GraphQLParser): DocumentContext;
    getDescription(ctxOpt: Option<DescriptionContext>): Option<string>;
    processValue(ctx: ValueContext): GQLValue;
    processDefaultValue(ctxOpt: Option<DefaultValueContext>): Option<GQLValue>;
}
