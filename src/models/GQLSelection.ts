import Record from 'dataclass';

export class GQLSelection extends Record<GQLSelection> {
    public name: string;
}
