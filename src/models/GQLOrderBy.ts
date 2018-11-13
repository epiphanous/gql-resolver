import Record from 'dataclass';

export class GQLOrderBy extends Record<GQLOrderBy> {
    public field: string;
    public desc: boolean = false;

    public toString() {
        return `${this.desc ? 'DESC(' : ''}${this.field}${this.desc ? ')' : ''}`;
    }
}
