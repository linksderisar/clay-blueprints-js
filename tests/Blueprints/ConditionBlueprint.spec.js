import ConditionBlueprint from '../../src/Blueprints/ConditionBlueprint';

it('basic condition works',  () => {
    const condition = new ConditionBlueprint('if');
    condition.condition = 'a === b';
    expect(condition).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('allows empty conditions', () => {
    const condition = new ConditionBlueprint('if');
    expect(condition).toMatchSnapshot({
        id: expect.any(String)
    });
});
