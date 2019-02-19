import {Component} from '../../src/';
import RootBlueprint from '../../src/Blueprints/RootBlueprint';

let blueprint: RootBlueprint;

beforeEach(() => blueprint = RootBlueprint.create());

it('initializes an empty root blueprint', () => {
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets the store', () => {
    blueprint.setStore({data: 'value'});
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets meta', () => {
    blueprint.setMeta({meta: 'meta-value'});
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets head', () => {
    blueprint.setHead({title: 'here is a title'});
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets the component tree', () => {
    blueprint.setComponentTree(Component.create('div'));
    expect(blueprint.toObject()).toMatchSnapshot({
        componentTree: {
            id: expect.any(String),
        },
    });
});

it('sets the component tree during construct', () => {
    blueprint = new RootBlueprint(Component.create('div'));
    expect(blueprint.toObject()).toMatchSnapshot({
        componentTree: {
            id: expect.any(String),
        },
    });
});
