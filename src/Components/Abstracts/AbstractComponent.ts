import ComponentInterface from "../Contracts/ComponentInterface";
import ComponentBlueprint from "../../Blueprints/ComponentBlueprint";

export default abstract class AbstractComponent implements ComponentInterface {
    private type = '';

    private blueprint: ComponentBlueprint;

    private children: AbstractComponent[];

    private scopedSlots: AbstractComponent[];

    private bindable = {
        prop: 'addBindProp',
        props: 'addBindProps',
        attribute: 'addBindAttribute',
        attributes: 'addBindAttributes'
    };

    protected constructor(type) {
        this.type = type;
        this.blueprint = ComponentBlueprint::create(this.type);
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public getBlueprint(): ComponentBlueprint {
        return this.blueprint;
    }

    public setBlueprint(blueprint: ComponentBlueprint): AbstractComponent {
        this.blueprint = blueprint;
        return this;
    }

    public getChildren(): AbstractComponent[] {
        return this.children;
    }

    public setChildren(children: AbstractComponent[]): AbstractComponent {
        this.children = children;
        return this;
    }

    public getScopedSlots(): AbstractComponent[] {
        return this.scopedSlots;
    }

    public setScopedSlots(scopedSlots: AbstractComponent[]): AbstractComponent {
        this.scopedSlots = scopedSlots;
        return this;
    }

    public getBindable(): { prop: string; attributes: string; attribute: string; props: string } {
        return this.bindable;
    }

    public setBindable(bindable: { prop: string; attributes: string; attribute: string; props: string }): AbstractComponent {
        this.bindable = bindable;
        return this;
    }

    public prop(key: string, value: string): AbstractComponent {
        this.blueprint.addProps({[key]: value});
        return this;
    }

    public props(props: {key: string, value: string}): AbstractComponent {
        this.blueprint.addProps(props);
        return this;
    }

    public attribute(key: string, value: string) : AbstractComponent {
        this.blueprint.addAttributes({[key]: value});
        return this;
    }

    public attributes(attributes: {key: string, value: string}): AbstractComponent {
        this.blueprint.addAttributes(attributes);
        return this;
    }

    public children(children: AbstractComponent[]): AbstractComponent {
        this.setChildren(children);
        this.blueprint.setChildren(children.map(c => c.blueprint));
        return this;
    }

    public scopedSlots(scopes: Function): AbstractComponent {
        this.setScopedSlots(scopes([this.blueprint, 'slotProp']));
        this.blueprint.setScopedSlots((scope) => scopes(scope).map(s => s.blueprint));
        return this;
    }

    public classes(classes: string|string[]): AbstractComponent {
        if (typeof classes === 'string') {
            this.blueprint.setClasses([classes]);
        } else {
            this.blueprint.setClasses(classes);
        }

        return this;
    }

    public style(cssAttribute: string, value: string): AbstractComponent {
        this.blueprint.setStyle({[cssAttribute]: value});
        return this;
    }

    public styles(styles: {cssAttribute: string, value: string}[]): AbstractComponent {
        this.blueprint.setStyle(styles);
        return this;
    }

    public key(): string {

    }
}
