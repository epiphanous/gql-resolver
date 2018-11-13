import Record from 'dataclass';

export class GQLPattern extends Record<GQLPattern> {
    public field: string;
}
