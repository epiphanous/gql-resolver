import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BuilderBase } from './BuilderBase';
import { BuilderErrorListener } from './BuilderErrorListener';

// tslint:disable-next-line:no-namespace
export namespace Builder {
  export function parse<T>(builder: BuilderBase<T>, source: string) {
    const parser = builder.parser(
      new CommonTokenStream(builder.lexer(CharStreams.fromString(source)))
    );
    parser.removeErrorListeners();
    parser.addErrorListener(new BuilderErrorListener(builder));
    parser.addParseListener(builder);
    return builder.build(parser);
  }
}
