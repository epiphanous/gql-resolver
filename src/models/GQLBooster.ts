export interface IGQLBooster {
  boost: number;
}

export class GQLBooster implements IGQLBooster {
  public boost: number;

  constructor(boost: number) {
    this.boost = boost;
  }
}

export class GQLFieldBooster extends GQLBooster {
  public field: string;

  constructor(boost: number, field: string) {
    super(boost);
    this.field = field;
  }
}

export class GQLUserFollowsBooster extends GQLBooster {
  public user: string;

  constructor(boost: number, user: string) {
    super(boost);
    this.user = user;
  }
}

export class GQLUserIsFollowedBooster extends GQLBooster {
  public user: string;

  constructor(boost: number, user: string) {
    super(boost);
    this.user = user;
  }
}
