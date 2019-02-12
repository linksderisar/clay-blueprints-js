import LoopBlueprint from '../../src/Blueprints/LoopBlueprint';

it('can be converted', () => {
    const blueprint = new LoopBlueprint('loop.ref');

    expect(blueprint).toMatchSnapshot({
        id: expect.any(String)
    })
});
