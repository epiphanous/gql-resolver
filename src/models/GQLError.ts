export interface IGQLErrorLocation {
  line: number;
  column: number;
}

export interface IGQLError {
  message: string;
  locations?: IGQLErrorLocation[];
  path?: string[];
}

export class GQLError implements IGQLError {
  public message: string;
  public locations?: IGQLErrorLocation[];
  public path?: string[];

  constructor(
    message: string,
    locations: IGQLErrorLocation[] = [],
    path: string[] = []
  ) {
    this.message = message;
    this.locations = locations;
    this.path = path;
  }
}
