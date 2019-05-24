import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { BuilderBase } from './BuilderBase';
import { BuilderErrorListener } from './BuilderErrorListener';

// tslint:disable-next-line
export namespace Builder {
  export function parse<T>(builder: BuilderBase<T>, source: string) {
    const parser = builder.parser(
      new CommonTokenStream(builder.lexer(new ANTLRInputStream(source)))
    );
    parser.removeErrorListeners();
    parser.addErrorListener(new BuilderErrorListener(builder));
    parser.addParseListener(builder);
    return builder.build(parser);
  }
}
