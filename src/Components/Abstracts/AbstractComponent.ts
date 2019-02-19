import ComponentBlueprint from '../../Blueprints/ComponentBlueprint';
import ComponentInterface from '../Contracts/ComponentInterface';

export default class AbstractComponent implements ComponentInterface {
    protected id = '';

    protected type = '';

    protected _blueprint!: ComponentBlueprint;

    protected _children: AbstractComponent[] = [];

    protected _scopedSlots: AbstractComponent[] = [];

    protected bindable = {
        prop: 'addBindProp',
        props: 'addBindProps',
        attribute: 'addBindAttribute',
        attributes: 'addBindAttributes',
    };

    protected constructor() {
        this.setBlueprint(ComponentBlueprint.create(this.type));
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type) {
        this.type = type;
        return this;
    }

    public getBlueprint(): ComponentBlueprint {
        return this._blueprint;
    }

    public setBlueprint(blueprint: ComponentBlueprint): AbstractComponent {
        this._blueprint = blueprint;
        return this;
    }

    public getChildren(): AbstractComponent[] {
        return this._children;
    }

    public setChildren(children: AbstractComponent[]): AbstractComponent {
        this._children = children;
        return this;
    }

    public getScopedSlots(): AbstractComponent[] {
        return this._scopedSlots;
    }

    public setScopedSlots(scopedSlots: AbstractComponent[]): AbstractComponent {
        this._scopedSlots = scopedSlots;
        return this;
    }

    public getBindable(): { prop: string; attributes: string; attribute: string; props: string } {
        return this.bindable;
    }

    public setBindable(bindable: {
        prop: string;
        attributes: string;
        attribute: string;
        props: string
    }): AbstractComponent {
        this.bindable = bindable;
        return this;
    }

    public prop(key: string, value: string): AbstractComponent {
        this._blueprint.addProps({[key]: value});
        return this;
    }

    public props(props: {key: string, value: string}): AbstractComponent {
        this._blueprint.addProps(props);
        return this;
    }

    public attribute(key: string, value: string): AbstractComponent {
        this._blueprint.addAttributes({[key]: value});
        return this;
    }

    public attributes(attributes: {key: string, value: string}): AbstractComponent {
        this._blueprint.addAttributes(attributes);
        return this;
    }

    public children(children: AbstractComponent[]): AbstractComponent {
        this.setChildren(children);
        this._blueprint.setChildren(children.map((c) => c._blueprint));
        return this;
    }

    public scopedSlots(scopes: (any) => any): AbstractComponent {
        this.setScopedSlots(scopes([this._blueprint, 'slotProp']));
        this._blueprint.setScopedSlots((scope) => scopes(scope).map((s) => s._blueprint));
        return this;
    }

    public classes(classes: string|string[]): AbstractComponent {
        if (typeof classes === 'string') {
            this._blueprint.setClasses([classes]);
        } else {
            this._blueprint.setClasses(classes);
        }

        return this;
    }

    public style(cssAttribute: string, value: string): AbstractComponent {
        this._blueprint.setStyle([{[cssAttribute]: value}]);
        return this;
    }

    public styles(styles: Array<{cssAttribute: string, value: string}>): AbstractComponent {
        this._blueprint.setStyle(styles);
        return this;
    }

    public key(key: string) {
        this._blueprint.setKey(key);
        return this;
    }

    clone(): ComponentInterface {
        // FIXME implement clone
        return this;
    }

    toJson(): string {
        return this._blueprint.toJson();
    }

    toObject(): object {
        return this._blueprint.toObject();
    }
}
