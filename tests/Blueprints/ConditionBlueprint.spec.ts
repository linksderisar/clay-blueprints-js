import {IfConditionBlueprint, ShowConditionBlueprint} from "../../src";

it('if condition works',  () => {
    const condition = IfConditionBlueprint.create().setCondition('a === b');
    expect(condition).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('show condition works', () => {
    const condition = ShowConditionBlueprint.create().setCondition('a === b');
    expect(condition).toMatchSnapshot({
        id: expect.any(String)
    });
})

