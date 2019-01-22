import ComponentBlueprint from '../../src/Blueprints/ComponentBlueprint';
import LoopBlueprint from '../../src/Blueprints/LoopBlueprint';
import IfConditionBlueprint from '../../src/Blueprints/IfConditionBlueprint';
import ShowConditionBlueprint from '../../src/Blueprints/ShowConditionBlueprint';

let blueprint = null;

beforeEach(() => blueprint = new ComponentBlueprint('test'));

function matchesSnapshot() {
    expect(blueprint.toObject()).toMatchSnapshot({
        id: expect.any(String)
    });
}

it('creates a default blueprint', () => {
    matchesSnapshot();
});

it('sets a ref', () => {
    blueprint.ref = '$ref';
    matchesSnapshot();
});

it('sets a key', () => {
    blueprint.key = '$key';
    matchesSnapshot();
});

it('sets refInFor', () => {
    blueprint.refInFor = true;
    matchesSnapshot();
});

it('sets classes', () => {
    blueprint.classes = ['css-class'];
    matchesSnapshot();
});

it('sets bound classes', () => {
    blueprint.bindClasses = 'class.bind';
    matchesSnapshot();
});

it('sets styles', () => {
    blueprint.style = {'color': 'black'};
    matchesSnapshot();
});

it('sets affect', () => {
    blueprint.affect = 'affect.ref';
    matchesSnapshot();
});

it('sets text', () => {
    blueprint.text = 'Dummy Text';
    expect(blueprint.text).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('sets props', () => {
    blueprint.props = {'prop': 'propValue'};
    matchesSnapshot();

    blueprint.addProps({'addProp': 'propValue'});
    matchesSnapshot();
});

it('sets bound props', () => {
    blueprint.bindProps = {'prop': 'prop.ref'};
    matchesSnapshot();

    blueprint.addBindProps({'addProp': 'prop.ref'});
    matchesSnapshot();
});

it('sets attributes', () => {
    blueprint.attributes = {'id': 'ID'};
    matchesSnapshot();

    blueprint.addAttributes({'type': 'password'});
    matchesSnapshot();
});

it('sets scoped slots', () => {
    const slot = new ComponentBlueprint('slot');
    blueprint.scopedSlots = () => [slot];

    expect(blueprint.toObject().scopedSlots[0]).toMatchSnapshot({
        id: expect.any(String)
    });

    const slot2 = new ComponentBlueprint('slot2');
    blueprint.scopedSlots = () => [slot, slot2];

    expect(blueprint.toObject().scopedSlots[1]).toMatchSnapshot({
        id: expect.any(String)
    });

});

it('slotProp helper works', () => {
    const slot = new ComponentBlueprint('slot');
    blueprint.scopedSlots = (slotProps) => [
        slot.addProps({'prop': slotProps('ref.prop')})
    ];

    expect(blueprint.toObject().scopedSlots[0]).toMatchObject({
        id: slot.id,
        type: "slot",
        attributes: {
            props: {
                prop: `$_slot_props.${blueprint.id}.ref.prop`
            }
        }
    });
});

it('sets children', () => {
    blueprint.children = [
        new ComponentBlueprint('child'),
        new ComponentBlueprint('child2')
    ];
    expect(blueprint.toObject().children[0]).toMatchSnapshot({
        id: expect.any(String)
    });

    expect(blueprint.toObject().children[1]).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('sets loop', () => {
    blueprint.loop = new LoopBlueprint('loop.ref');
    matchesSnapshot();
});

it('sets if', () => {
    const ifCondition = new IfConditionBlueprint();
    ifCondition.condition = 'a === b';
    blueprint.addCondition(ifCondition);
    matchesSnapshot();
});

it('sets show', () => {
    const showCondition = new ShowConditionBlueprint();
    showCondition.condition = 'a === b';
    blueprint.addCondition(showCondition);
    matchesSnapshot();
});

it('sets events', () => {
    blueprint.on = {'event': 'method()'};
    blueprint.addOn({'event2': 'method2()'});
    matchesSnapshot();
});
