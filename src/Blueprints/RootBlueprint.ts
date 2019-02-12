import _ from 'lodash';
import BlueprintInterface from "./Contracts/BlueprintInterface";

export default class RootBlueprint implements BlueprintInterface {
    private _store: object;
    private _meta: object[];
    private _head: object;
    private _componentTree: Blueprint;

    constructor(componentTree) {
        super();
        this._store = {};
        this._meta = [];
        this._head = {};
        this._componentTree = componentTree;

    }

    addMetas(metas) {
        this._meta = [ ...this._meta, ...metas ];
    }

    get store() {
        return this._store;
    }

    set store(value) {
        this._store = value;
    }

    get meta() {
        return this._meta;
    }

    set meta(value) {
        this._meta = value;
    }

    get head() {
        return this._head;
    }

    set head(value) {
        this._head = value;
    }

    get componentTree() {
        return this._componentTree;
    }

    set componentTree(value) {
        this._componentTree = value;
    }

    toObject() {
        return {
            'store': this._store,
            'componentTree': _.isEmpty(this._componentTree) ? {} : this._componentTree.toObject(),
            'meta': this._meta,
            'head': this._head,
        }
    }
}