import AbstractBlueprint from "./Abstracts/AbstractBlueprint";

export default class TextBlueprint extends AbstractBlueprint {
        type = '$text';
        content: string = '';
        bound = false;

    constructor(content = '') {
        super();
        this.content = content;
        this.bound = false;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): this {
        this.content = content;
        return this;
    }

    bind(bound = true): this {
        this.bound = bound;
        return this;
    }

    isBound() {
        return this.bound;
    }

    setBound(value) {
        this.bound = value;
    }

    toObject() {
        const obj = super.toObject();

        if (this.bound) {
            obj[':value'] = this.content;
        } else {
            obj['value'] = this.content;
        }

        return obj;
    }
}
