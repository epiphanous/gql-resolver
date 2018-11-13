import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import BuilderBase from './BuilderBase';
import BuildErrorListener from './BuilderErrorListener';

// tslint:disable-next-line
namespace Builder {
  export function parse<T>(builder: BuilderBase<T>, source: string) {
    const parser = builder.parser(
      new CommonTokenStream(builder.lexer(new ANTLRInputStream(source))),
    );
    parser.removeErrorListeners();
    parser.addErrorListener(new BuildErrorListener(builder));
    parser.addParseListener(builder);
    return builder.build(parser);
  }
}

export default Builder;
