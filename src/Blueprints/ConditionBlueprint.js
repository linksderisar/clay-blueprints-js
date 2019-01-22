import Blueprint from './Blueprint';

export default class ConditionBlueprint extends Blueprint {
    constructor(type) {
        super(type);
        this._condition = '';
    }

    get condition() {
        return this._condition;
    }

    set condition(value) {
        this._condition = value;
    }

    toObject() {
        return {
            [this.type]: this.condition
        };
    }
}
