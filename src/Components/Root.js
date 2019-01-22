import RootBlueprint from '../Blueprints/RootBlueprint';

export default class Root {
    constructor(clayComponent) {
        this._blueprint = new RootBlueprint(clayComponent);
    }


    get blueprint() {
        return this._blueprint;
    }

    set blueprint(value) {
        this._blueprint = value;
    }

    store(data) {
        this.blueprint.store = data;
        return this;
    }

    meta(key, value) {
        this.blueprint.addMetas({[key]: value});
        return this;
    }

    head(key, value) {
        this.blueprint.addHeader({[key]: value});
        return this;
    }

    metas(m) {
        this.blueprint.addMetas(m);
        return this;
    }

    header(h) {
        this.blueprint.addHeader(h);
        return this;
    }

    toObject() {
        return this.blueprint.toObject();
    }

    toJson() {
        return JSON.stringify(this.toObject());
    }
}
