import AbstractBlueprint from './Abstracts/AbstractBlueprint';

export default class LoopBlueprint extends AbstractBlueprint {

    public static create(iterable: string): LoopBlueprint {
        const loop = new this();
        loop.setIterable(iterable);
        return loop;
    }

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
