import {
    ComponentBlueprint,
    LoopBlueprint,
    IfConditionBlueprint,
    ShowConditionBlueprint
} from '../../src/index';

let blueprint!: ComponentBlueprint;

beforeEach(() => blueprint = ComponentBlueprint.create('test'));

function matchesSnapshot() {
    expect(blueprint.toObject()).toMatchSnapshot({
        id: expect.any(String)
    });
}

it('creates a default blueprint', () => {
    matchesSnapshot();
});

it('sets a ref', () => {
    blueprint.setRef('$ref');
    matchesSnapshot();
});

it('sets a key', () => {
    blueprint.setKey('$key');
    matchesSnapshot();
});

it('sets refInFor', () => {
    blueprint.setRefInFor(true);
    matchesSnapshot();
});

it('sets classes', () => {
    blueprint.setClasses(['css-class']);
    matchesSnapshot();
});

it('sets bound classes', () => {
    blueprint.setBindClasses('class.bind');
    matchesSnapshot();
});

it('sets styles', () => {
    blueprint.setStyle([{color: 'black'}]);
    matchesSnapshot();
});

it('sets affect', () => {
    blueprint.setAffect('affect.ref');
    matchesSnapshot();
});

it('sets text', () => {
    blueprint.setText('Dummy Text');
    expect(blueprint.getText()).toMatch('Dummy Text');
});

it('sets props', () => {
    blueprint.setProps({'prop': 'propValue'});
    matchesSnapshot();

    blueprint.addProps({'addProp': 'propValue'});
    matchesSnapshot();
});

it('sets bound props', () => {
    blueprint.setBindProps({'prop': 'prop.ref'});
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

// it('sets scoped slots', () => {
//     const slot = new ComponentBlueprint('slot');
//     blueprint.setScopedSlots(() => [slot]);
//
//     expect(blueprint.toObject().scopedSlots[0]).toMatchSnapshot({
//         id: expect.any(String)
//     });
//
//     const slot2 = new ComponentBlueprint('slot2');
//     blueprint.scopedSlots = () => [slot, slot2];
//
//     expect(blueprint.toObject().scopedSlots[1]).toMatchSnapshot({
//         id: expect.any(String)
//     });
//
// });

// it('slotProp helper works', () => {
//     const slot = new ComponentBlueprint('slot');
//     blueprint.scopedSlots = (slotProps) => [
//         slot.addProps({'prop': slotProps('ref.prop')})
//     ];
//
//     expect(blueprint.toObject().scopedSlots[0]).toMatchObject({
//         id: slot.id,
//         type: "slot",
//         attributes: {
//             props: {
//                 prop: `$_slot_props.${blueprint.id}.ref.prop`
//             }
//         }
//     });
// });

it('sets children', () => {
    blueprint.setChildren([
        new ComponentBlueprint('child'),
        new ComponentBlueprint('child2')
    ]);
    expect(blueprint.toObject().children[0]).toMatchSnapshot({
        id: expect.any(String)
    });

    expect(blueprint.toObject().children[1]).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('sets loop', () => {
    blueprint.setLoop(LoopBlueprint.create('loop.ref'));
    matchesSnapshot();
});

it('sets if', () => {
    const ifCondition = IfConditionBlueprint.create();
    ifCondition.setCondition('a === b');
    blueprint.addCondition(ifCondition);
    matchesSnapshot();
});

it('sets show', () => {
    const showCondition = new ShowConditionBlueprint();
    showCondition.condition = 'a === b';
    blueprint.addCondition(showCondition);
    matchesSnapshot();
});

// it('sets events', () => {
//     blueprint.on = {'event': 'method()'};
//     blueprint.addOn({'event2': 'method2()'});
//     matchesSnapshot();
// });
