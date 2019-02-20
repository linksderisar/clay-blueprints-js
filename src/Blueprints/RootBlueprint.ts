import _ from 'lodash';
import BaseComponent from '../Components/Base/BaseComponent';
import AbstractBlueprint from './Abstracts/AbstractBlueprint';

export default class RootBlueprint extends AbstractBlueprint {

    static create(...attributes): RootBlueprint {
        return new this(attributes[0]);
    }

    private _store: {};
    private _meta: {};
    private _head: {};
    private _componentTree: BaseComponent;

    constructor(componentTree) {
        super();
        this._store = {};
        this._meta = [];
        this._head = {};
        this._componentTree = componentTree;
    }

    addMeta(key: string, value: string): RootBlueprint {
        this._meta = {
            ...this._meta,
            [key]: value,
        };

        return this;
    }

    addMetas(metas): RootBlueprint {
        this._meta = {
            ...this._meta,
            ...metas,
        };

        return this;
    }

    public getStore(): {} {
        return this._store;
    }

    public setStore(store: {}): RootBlueprint {
        this._store = store;
        return this;
    }

    public getMeta(): {} {
        return this._meta;
    }

    public setMeta(meta: {}): RootBlueprint {
        this._meta = meta;
        return this;
    }

    public getHead(): {} {
        return this._head;
    }

    public setHead(head: {}): RootBlueprint {
        this._head = head;
        return this;
    }

    public addHeader(key: string, value: string): RootBlueprint {
        this._head = {
            ...this._head,
            [key]: value,
        };

        return this;
    }

    public getComponentTree(): BaseComponent {
        return this._componentTree;
    }

    public setComponentTree(componentTree: BaseComponent): RootBlueprint {
        this._componentTree = componentTree;
        return this;
    }

    toObject(): any {
        return {
            store: this._store,
            componentTree: _.isEmpty(this._componentTree) ? {} : this._componentTree.toObject(),
            meta: this._meta,
            head: this._head,
        };
    }
}
