import { Either } from 'funfix';
import { GQLArgument } from './GQLArgument';
import { GQLValue } from './GQLValue';
import { GQLVariable } from './GQLVariable';

interface IGQLDirective {
  name: string;
}

export class GQLDirective implements IGQLDirective {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

interface IGQLValueDirective extends IGQLDirective {
  value: Either<GQLValue, GQLVariable>;
}

export class GQLValueDirective extends GQLDirective
  implements IGQLValueDirective {
  public value: Either<GQLValue, GQLVariable>;

  constructor(name: string, value: Either<GQLValue, GQLVariable>) {
    super(name);
    this.value = value;
  }
}

export class GQLNameDirective extends GQLDirective {}

interface IGQLArgumentDirective extends IGQLDirective {
  argument: GQLArgument;
}

export class GQLArgumentDirective extends GQLDirective
  implements IGQLArgumentDirective {
  public argument: GQLArgument;

  constructor(name: string, argument: GQLArgument) {
    super(name);
    this.argument = argument;
  }
}
