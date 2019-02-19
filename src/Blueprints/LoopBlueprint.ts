import AbstractBlueprint from './Abstracts/AbstractBlueprint';

export default class LoopBlueprint extends AbstractBlueprint {

    iterable: string = '';

    public getIterable(): string {
        return this.iterable;
    }

    public setIterable(iterable: string): this {
        this.iterable = iterable;
        return this;
    }

    toObject(): any {
        return {
            loop: this.iterable,
        };
    }
}
