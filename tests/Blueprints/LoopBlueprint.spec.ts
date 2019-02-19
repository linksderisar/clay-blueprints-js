import LoopBlueprint from '../../src/Blueprints/LoopBlueprint';

it('can be converted', () => {
    const blueprint = LoopBlueprint.create('loop.ref');

    expect(blueprint.toObject()).toMatchSnapshot();
});
