import ComponentBlueprint from '../../Blueprints/ComponentBlueprint';
import {IfConditionBlueprint, LoopBlueprint, ShowConditionBlueprint} from '../../index';
import ComponentInterface from '../Contracts/ComponentInterface';

export default class AbstractComponent implements ComponentInterface {
    protected type = '';

    protected _blueprint!: ComponentBlueprint;

    protected _children: AbstractComponent[] = [];

    protected bindable = {
        prop: 'addBindProp',
        props: 'addBindProps',
        attribute: 'addBindAttribute',
        attributes: 'addBindAttributes',
    };

    protected constructor(type) {
        this.setType(type);
        this.setBlueprint(ComponentBlueprint.create(type));
    }

    public getId(): string {
        return this._blueprint.getId();
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
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
        this._blueprint.setChildren(children.map(c => c._blueprint));
        return this;
    }

    public scopedSlots(scopes: (scope: Function) => AbstractComponent[]) {
        this._blueprint.setScopedSlots(scope => scopes(scope).map(s => s._blueprint));
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

    public key(key: string): this {
        this._blueprint.setKey(key);
        return this;
    }

    public ref(ref: string): this {
        this._blueprint.setRef(ref);
        return this;
    }

    public refInFor(refInFor: true): this {
        this._blueprint.setRefInFor(refInFor);
        return this;
    }

    public affect(affect: string): this {
        this._blueprint.setAffect(affect);
        return this;
    }

    public on(event: string, callback: string): this {
        this._blueprint.addOn({[event]: callback});
        return this;
    }

    public text(text: string): this {
        this._blueprint.setText(text);
        return this;
    }

    public loop(iterable: string): this {
        this._blueprint.setLoop(LoopBlueprint.create(iterable));
        return this;
    }

    public if(condition: string): this {
        this._blueprint.addCondition(IfConditionBlueprint.create(condition));
        return this;
    }

    public show(condition: string): this {
        this._blueprint.addCondition(ShowConditionBlueprint.create(condition));
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
