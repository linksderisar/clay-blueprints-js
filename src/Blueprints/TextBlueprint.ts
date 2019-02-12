import Blueprint from './Blueprint';

export default class TextBlueprint extends Blueprint {
    constructor(content = '') {
        super('$text');
        this._content = content;
        this._bound = false;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    bind(bound = true) {
        this._bound = bound;
        return this;
    }

    get bound() {
        return this._bound;
    }

    set bound(value) {
        this._bound = value;
    }

    toObject() {
        const obj = super.toObject();

        if (this.bound) {
            obj[':value'] = this._content;
        } else {
            obj['value'] = this._content;
        }

        return obj;
    }
}
