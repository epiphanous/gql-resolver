import {List} from 'immutable';
import {GQLValue} from './GQLValue';

export class GQLBooleanValue extends GQLValue<GQLBooleanValue> {
    public value: boolean;
    constructor(boolValue: boolean) {
        super();
        this.value = boolValue;
    }
}

export class GQLArrayValue extends GQLValue<GQLArrayValue> {
    public value: List<any>;
    constructor(arrValue: []) {
        super();
        this.value = List(arrValue);
    }
}

export class GQLNumberValue extends GQLValue<GQLNumberValue> {
    public value: number;
}

export class GQLDoubleValue extends GQLNumberValue {} // TODO runtime assertion or sth?
export class GQLIntValue extends GQLNumberValue {}
export class GQLLongValue extends GQLNumberValue {}

export class GQLEnumValue extends GQLValue<GQLEnumValue> {
    public values: string;
    constructor(strValue: string) {
        super();
        this.values = strValue;
    }
}

export class GQLStringValue extends GQLValue<GQLStringValue> {
    public value: string;
    constructor(strValue: string) {
        super();
        this.value = strValue;
    }
}

