import Blueprint from './Blueprint';

export default class LoopBlueprint extends Blueprint {
    constructor (iterable) {
        super();
        this._iterable = iterable;
    }

    get iterable() {
        return this._iterable;
    }

    set iterable(value) {
        this._iterable = value;
    }

    toObject() {
        return {
            'loop': this.iterable
        };
    }
}
