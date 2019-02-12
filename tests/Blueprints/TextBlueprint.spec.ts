import TextBlueprint from '../../src/Blueprints/TextBlueprint';

it('converts text to JSON', () => {
    const textBlueprint = new TextBlueprint('some text');
    expect(textBlueprint.toObject()).toMatchSnapshot({
        id: expect.any(String)
    });
});

it('converts bound text to JSON', () => {
    const textBlueprint = new TextBlueprint('some text');
    textBlueprint.bind();
    expect(textBlueprint.toObject()).toMatchSnapshot({
        id: expect.any(String)
    });
});
