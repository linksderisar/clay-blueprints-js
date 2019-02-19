import {IfConditionBlueprint, ShowConditionBlueprint} from '../../src';

it('if condition works',  () => {
    const condition = IfConditionBlueprint.create().setCondition('a === b');
    expect(condition.toObject()).toMatchSnapshot();
});

it('show condition works', () => {
    const condition = ShowConditionBlueprint.create().setCondition('a === b');
    expect(condition.toObject()).toMatchSnapshot();
});
