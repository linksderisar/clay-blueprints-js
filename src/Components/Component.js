import _ from 'lodash';
import ComponentBlueprint from '../Blueprints/ComponentBlueprint';

export default class Component {
    constructor(type) {
        this._children = {};
        this._scopedSlots = {};

        this._bindable = {
            'prop': 'addBindProp',
            'props': 'addBindProps',
            'attribute': 'addBindAttribute',
            'attributes': 'addBindAttributes'
        };

        this._blueprint = new ComponentBlueprint(this._type);
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
        return this;
    }

    get children() {
        return this._children;
    }

    set children(value) {
        this._children = value;
        return this;
    }

    get scopedSlots() {
        return this._scopedSlots;
    }

    set scopedSlots(value) {
        this._scopedSlots = value;
        return this;
    }

    get bindable() {
        return this._bindable;
    }

    set bindable(value) {
        this._bindable = value;
        return this;
    }

    get blueprint() {
        return this._blueprint;
    }

    set blueprint(value) {
        this._blueprint = value;
        return this;
    }

    prop(key, value) {
        this.blueprint.addProps({[key]: value});
        return this;
    }

    props(newProps) {
        this.blueprint.addProps(newProps);
        return this;
    }

    attribute(key, value) {
        this.blueprint.addAttributes({[key]: value});
        return this;
    }

    attributes(props) {
        this.blueprint.addAttributes(props);
        return this;
    }

    // name clash with getter
    extendChildren(newChildren) {
        this.children = newChildren;

        this.blueprint.children = _.map(this.children, (value) => value.blueprint);
        return this;
    }

    classes(classes) {
        this.blueprint.classes = classes;
        return this;
    }

    style(cssAttribute, value) {
        this.blueprint.style = {[cssAttribute]: value};
        return this;
    }

    styles(styles) {
        this.blueprint.styles = styles;
        return this;
    }

    ref(r) {
        this.blueprint.ref = r;
        return this;
    }

    key(k) {
        this.blueprint.key = k;
        return this;
    }

    refInfor(r = true) {
        this.blueprint.refInfor = r;
        return this;
    }

    affect(a) {
        this.blueprint.affect = a;
        return this;
    }

    text(t) {
        this.blueprint.text = t;
        return this;
    }

    toObject() {
        return this.blueprint.toObject();
    }

    toJson() {
        return this.blueprint.toJson();
    }
}
