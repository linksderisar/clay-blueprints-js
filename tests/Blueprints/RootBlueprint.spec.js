import RootBlueprint from '../../src/Blueprints/RootBlueprint';
import Component from '../../src/Components/Component';

let blueprint = null;

beforeEach(() => blueprint = new RootBlueprint());

it('initializes an empty root blueprint', () => {
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets the store', () => {
    blueprint.store = {'data': 'value'};
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets meta', () => {
    blueprint.meta = {'meta': 'meta-value'};
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets head', () => {
    blueprint.head = {'title': 'here is a title'};
    expect(blueprint.toJson()).toMatchSnapshot();
});

it('sets the component tree', () => {
    blueprint.componentTree = new Component('div');
    expect(blueprint.toObject()).toMatchSnapshot({
        componentTree: {
            id: expect.any(String)
        }
    });
});

it('sets the component tree during construct', () => {
    blueprint = new RootBlueprint(new Component('div'));
    expect(blueprint.toObject()).toMatchSnapshot({
        componentTree: {
            id: expect.any(String)
        }
    });
});
