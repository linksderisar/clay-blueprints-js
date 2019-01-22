import _ from 'lodash';
import Blueprint from './Blueprint';
import TextBlueprint from './TextBlueprint';

export const SLOT_PROPS = '$_slot_props';

export const SELF = '$_self';

export const LOOP = 'loop';

export const LOOP_VALUE = '$_loop_value';

const mapWithColon = (obj) => _.map(obj, (v, k) => ({[`:${k}`]: v}));

export default class ComponentBlueprint extends Blueprint {
    constructor(type) {
        super(type);

        this._ref = '';
        this._key = '';
        this._refInFor = false;
        this._scopedSlots = {};
        this._attributes = {};
        this._props = {};
        this._on = {};
        this._children = {};
        this._classes = [];
        this._style = {};
        this._text = null;
        this._loop = null;
        this._affect = '';
        this._bound = {};
        this._conditions = [];
    }

    addBound(bound) {
        this.bound = {
            ...this.bound,
            ...bound
        };

        return this;
    }

    set bindKey(key) {
        this.key = key;
        return this.addBound('key');
    }

    set bindRef(ref) {
        this.ref = ref;
        return this.addBound('ref');
    }

    get ref() {
        return this._ref;
    }

    set ref(value) {
        this._ref = value;
        return this;
    }

    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
        return this;
    }

    get refInFor() {
        return this._refInFor;
    }

    set refInFor(value) {
        this._refInFor = value;
        return this;
    }

    get scopedSlots() {
        return this._scopedSlots;
    }

    set scopedSlots(cb) {
        const ret = cb((ref) => this.slotProp(ref));
        this._scopedSlots = Array.isArray(ret) ? ret : [ret];
        return this;
    }

    slotProp(ref) {
        return `${SLOT_PROPS}.${this.id}.${ref}`;
    }

    get attributes() {
        return this._attributes;
    }

    set attributes(value) {
        this._attributes = value;
        return this;
    }

    set bindAttributes(attributes) {
        this.attributes = mapWithColon(attributes);
        return this;
    }

    addBindAttribute(key, value) {
        return this.addBindAttributes({[key]: value});
    }

    addBindAttributes(attributes) {
        this.attributes = {
            ...this.attributes,
            ...mapWithColon(attributes)
        };

        return this;
    }

    addAttributes(attributes) {
        this.attributes = {
            ...this.attributes,
            ...attributes
        };

        return this;
    }

    get props() {
        return this._props;
    }

    set props(value) {
        this._props = value;
        return this;
    }

    set bindProps(props) {
        this.props = mapWithColon(props);
        return this;
    }

    addProps(props) {
        this.props = _.merge(this.props, props);
        return this;
    }

    addBindProps(props) {
        this.props = _.merge(this.props, mapWithColon(props));

        return this;
    }

    get on() {
        return this._on;
    }

    set on(value) {
        this._on = value;
        return this;
    }

    get children() {
        return this._children;
    }

    set children(value) {
        this._children = value;
        return this;
    }

    get classes() {
        return this._classes;
    }

    set classes(classes) {
        this._classes = {'class': classes};
        return this;
    }

    set bindClasses(ref) {
        this._classes = {':class': ref};
        return this;
    }

    get style() {
        return this._style;
    }

    set style(value) {
        this._style = value;
        return this;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = new TextBlueprint(value);
        return this;
    }

    get loop() {
        return this._loop;
    }

    set loop(value) {
        this._loop = value;
        return this;
    }

    get affect() {
        return this._affect;
    }

    set affect(value) {
        this._affect = value;
        return this;
    }

    get bound() {
        return this._bound;
    }

    set bound(value) {
        this._bound = value;
        return this;
    }

    isBound(key) {
        return _.find(this.bound, (k) => k === key);
    }

    get conditions() {
        return this._conditions;
    }

    set conditions(value) {
        this._conditions = value;
        return this;
    }

    addCondition(condition) {
        this.conditions = [
            ...this.conditions,
            condition
        ];
    }

    toObject() {
        let obj = super.toObject();

        if (!obj.hasOwnProperty('attributes')) {
            obj['attributes'] = {};
        }

        if (this.key) {
            obj.attributes[this.isBound('key') ? ':key' : 'key'] = this.key;
        }

        if (this.ref) {
            obj.attributes[this.isBound('ref') ? ':ref' : 'ref'] = this.ref;
        }

        if (this.refInFor) {
            obj.attributes['refInFor'] = this.refInFor;
        }

        if (!_.isEmpty(this.style)) {
            obj.attributes['style'] = this.style;
        }

        if (!_.isEmpty(this.props)) {
            obj.attributes['props'] = this.props;
        }

        if (!_.isEmpty(this.on)) {
            obj.attributes['on'] = this.on;
        }

        if (!_.isEmpty(this.classes)) {
            obj.attributes = {
                ...obj.attributes,
                ...this.classes
            };

        }

        if (!_.isEmpty(this.attributes)) {
            obj.attributes['attrs'] = {
                ...obj.attributes,
                ...this.attributes
            };
        }

        if (this.loop) {
            obj = {
                ...obj,
                ...this.loop.toObject()
            };
        }

        if (!_.isEmpty(this.conditions)) {
            obj = {
                ...obj,
                ..._.map(this.conditions, (condition) => condition.toObject())
            };
        }

        if (this.text) {
            obj.children = this.text.toObject();
            return obj;
        }

        if (this.affect) {
            obj.affect = this.affect;
        }

        if (!_.isEmpty(this.scopedSlots)) {
            obj.scopedSlots = _.map(this.scopedSlots, s => s.toObject());
        }

        if (!_.isEmpty(this.children)) {
            obj.children = _.map(this.children, c => c.toObject());
        }

        if (_.isEmpty(obj.attributes)) {
            delete obj.attributes;
        }

        return obj;
    }
}
