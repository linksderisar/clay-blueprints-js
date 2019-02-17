import AbstractBlueprint from "./Abstracts/AbstractBlueprint";
import TextBlueprint from "./TextBlueprint";
import BlueprintException from "../Exceptions/BlueprintException";
import AbstractConditionBlueprint from "./Abstracts/AbstractConditionBlueprint";

export const SLOT_PROPS = '$_slot_props';

export const SELF = '$_self';

export const LOOP = 'loop';

export const LOOP_VALUE = '$_loop_value';

const mapWithColon = (obj: {}) => {
    const newObj = {};
    Object.keys(obj).forEach(k => newObj[":" + k] = obj[k]);
    return newObj;
};

export default class ComponentBlueprint extends AbstractBlueprint {
    protected ref = '';
    protected key = '';
    protected refInFor = false;
    protected scopedSlots: AbstractBlueprint[] = [];
    protected attributes = {};
    protected props = {};
    protected on = {};
    protected children: ComponentBlueprint[] = [];
    protected classes = {};
    protected style = {};
    protected affect = '';
    protected bound: string[] = [];
    protected loop: AbstractBlueprint | undefined;
    protected conditions: AbstractConditionBlueprint[] = [];
    protected text: TextBlueprint | undefined;

    // fixme add text, loop, and conditions

    public getBound(): string[] {
        return this.bound;
    }

    public setBound(bound: string[]): this {
        this.bound = bound;
        return this;
    }

    protected addBound(bound: string): this {
        this.bound = [...this.bound, bound];
        return this;
    }

    public getRef(): string {
        return this.ref;
    }

    public setRef(ref: string): this {
        this.ref = ref;
        return this;
    }

    public setBindRef(ref: string): this {
        this.ref = ref;
        this.addBound('ref');
        return this;
    }

    public getKey(): string {
        return this.key;
    }

    public setKey(key: string): this {
        this.key = key;
        return this;
    }

    public setBindKey(key: string): this {
        this.key = key;
        this.addBound('key');
        return this;
    }

    public getRefInFor(): boolean {
        return this.refInFor;
    }

    public setRefInFor(refInFor: boolean): this {
        this.refInFor = refInFor;
        return this;
    }

    public getScopedSlots(): AbstractBlueprint[] {
        return this.scopedSlots;
    }

    public setScopedSlots(scopedSlots: (string) => AbstractBlueprint | AbstractBlueprint[]): this {
        const bp: AbstractBlueprint | AbstractBlueprint[] = scopedSlots((ref) => this.slotProp(ref));

        if (bp instanceof AbstractBlueprint) {
            this.scopedSlots = [bp];
        } else {
            this.scopedSlots = bp;
        }

        return this;
    }

    public slotProp(ref: string): string {
        return `${SLOT_PROPS}.${this.getId()}.${ref}`;
    }

    public getAttributes(): {} {
        return this.attributes;
    }

    public setAttributes(attributes: {}): this {
        this.attributes = attributes;
        return this;
    }

    public setBindAttributes(attributes: {}): this {
        this.attributes = mapWithColon(attributes);
        return this;
    }

    public addBindAttribute(key: string, value: string) {
        return this.addBindAttributes({[key]: value});
    }

    public addBindAttributes(attributes: {}): this {
        this.attributes = {
            ...this.attributes,
            ...mapWithColon(attributes)
        };

        return this;
    }

    public addAttributes(attributes: {}): this {
        this.attributes = {
            ...this.attributes,
            ...attributes
        };

        return this;
    }

    public getProps(): {} {
        return this.props;
    }

    public setProps(props: {}): this {
        this.props = props;
        return this;
    }

    public setBindProps(props: {}): this {
        this.props = mapWithColon(props);
        return this;
    }

    public addProps(props: {}): this {
        // in Clay PHP props are replaced recursively, but this doesn't seem to make sense
        this.props = {
            ...this.props,
            ...props
        };
        return this;
    }

    public addBindProps(props: {}): this {
        this.props = {
            ...this.props,
            ...mapWithColon(props)
        };
        return this;
    }

    public addBindProp(key: string, value: any): this {
        return this.addBindProps({[key]: value});
    }

    public getOn(): {} {
        return this.on;
    }

    public setOn(on: {}): this {
        this.on = on;
        return this;
    }

    public addOn(on: {}): this {
        this.on = {
            ...this.on,
            ...on
        };
        return this;
    }

    public getChildren(): ComponentBlueprint[] {
        return this.children;
    }

    public setChildren(children: ComponentBlueprint[]): this {
        this.children = children;
        return this;
    }

    public getClasses(): {} {
        return this.classes;
    }

    public setClasses(classes: {}): this {
        this.classes = {'class': classes};
        return this;
    }

    public setBindClasses(ref: string): this {
        this.classes = {':class': ref};
        return this;
    }

    public getStyle() {
        return this.style;
    }

    public setStyle(style: {}[]): this {
        this.style = style;
        return this;
    }

    public getLoop(): AbstractBlueprint | undefined {
        return this.loop;
    }

    public setLoop(loop: AbstractBlueprint): this {
        this.loop = loop;
        return this;
    }

    public getConditions(): AbstractConditionBlueprint[] {
        return this.conditions;
    }

    public setConditions(conditions: AbstractConditionBlueprint[]): this {
        this.conditions = conditions;
        return this;
    }

    public addCondition(condition: AbstractConditionBlueprint): this {
        this.conditions = [
            ...this.conditions,
            condition
        ];
        return this;
    }

    public getAffect(): string {
        return this.affect;
    }

    public setAffect(affect: string): this {
        this.affect = affect;
        return this;
    }

    public getText(): string|null {
        if (this.text instanceof TextBlueprint) {
            return this.text.getContent();
        }

        return null;
    }

    public setText(text: string): this {
        this.text = new TextBlueprint(text);
        return this;
    }

    public setBindText(text: string): this {
        this.text = new TextBlueprint(text);
        this.text.bind();
        return this;
    }

    public isBound(key) {
        return this.bound.find((k) => k === key);
    }

    constructor(type: string) {
        super();
        this.type = type;
    }

    static create(...attributes) {
        if (attributes.length === 0 || typeof attributes[0] !== 'string') {
            throw new BlueprintException('First parameter for create must be the type');
        }

        return new this(attributes[0]);
    }


    toObject(): any {
        let obj = super.toObject();

        if (!obj.hasOwnProperty('attributes')) {
            obj['attributes'] = {};
        }

        if (this.key !== '') {
            obj['attributes'][this.isBound('key') ? ':key' : 'key'] = this.key;
        }

        if (this.ref !== '') {
            obj['attributes'][this.isBound('ref') ? ':ref' : 'ref'] = this.ref;
        }

        if (this.refInFor) {
            obj['attributes']['refInFor'] = this.refInFor;
        }

        if (Object.keys(this.style).length > 0) {
            obj['attributes']['style'] = this.style;
        }

        if (Object.keys(this.props).length > 0) {
            obj['attributes']['props'] = this.props;
        }

        if (Object.keys(this.on).length > 0) {
            obj['attributes']['on'] = this.on;
        }

        if (Object.keys(this.classes).length > 0) {
            obj['attributes'] = {
                ...obj['attributes'],
                ...this.classes
            };

        }

        if (Object.keys(this.attributes).length > 0) {
            obj['attributes']['attrs'] = {
                ...obj['attributes'],
                ...this.attributes
            };
        }

        if (typeof this.loop !== "undefined") {
            obj = {
                ...obj,
                ...this.loop.toObject()
            };
        }

        if (this.conditions.length > 0) {
            obj = {
                ...obj,
                ...this.conditions.map((condition) => condition.toObject())
            };
        }

        if (typeof this.text !== 'undefined') {
            obj['children'] = this.text.toObject();
            return obj;
        }

        if (this.affect !== '') {
            obj['affect'] = this.affect;
        }

        if (this.scopedSlots.length > 0) {
            obj['scopedSlots'] = this.scopedSlots.map(s => s.toObject());
        }

        if (this.children.length > 0) {
            obj['children'] = this.children.map(c => c.toObject());
        }

        if (Object.keys(obj['attributes']).length === 0) {
            delete obj['attributes'];
        }

        return obj;
    }
}
