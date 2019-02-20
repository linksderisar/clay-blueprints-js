import {RootBlueprint} from '../../index';
import AbstractComponent from './AbstractComponent';

export default class AbstractRoot {

    static create(clayComponent: AbstractComponent) {
        return new this(clayComponent);
    }

    protected _blueprint!: RootBlueprint;

    protected version = '1.0.0';

    constructor(clayComponent: AbstractComponent) {
        this._blueprint = RootBlueprint.create(clayComponent);
    }

    public getBlueprint(): RootBlueprint {
        return this._blueprint;
    }

    public setBlueprint(blueprint: RootBlueprint): AbstractRoot {
        this._blueprint = blueprint;
        return this;
    }

    public store(data: {}) {
        this._blueprint.setStore(data);
        return this;
    }

    public meta(key: string, value: string) {
        this._blueprint.addMetas({key, value});
        return this;
    }

    public head(key: string, value: string) {
        this._blueprint.addHeader(key, value);
        return this;
    }

    public metas(metas) {
        this._blueprint.addMetas(metas);
        return this;
    }

    public header(key: string, value: string) {
        this._blueprint.addHeader(key, value);
        return this;
    }

    public getVersion(): string  {
        return this.version;
    }

    public toObject(): {} {
        return this._blueprint.toObject();
    }

    public toJson(): string {
        return this._blueprint.toJson();
    }
}
