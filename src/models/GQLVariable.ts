import Record from 'dataclass';

export class GQLVariable extends Record<GQLVariable> {
    public name: string;
}
