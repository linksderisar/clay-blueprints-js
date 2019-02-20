import {Component, Page} from '../../src';

it('creates a default component', () => {
    const component = Component.create('div');
    expect(component.toObject()).toMatchSnapshot({
        id: expect.any(String),
    });
});

it('creates a page', () => {
    const component = Component.create('div');
    const page = Page.create(component);
    expect(page.toObject()).toMatchSnapshot();
});

it('can create a complex page', () => {
    const page = Page.create(
        Component.create('div')
            .key('someKey')
            .ref('ref')
            .refInFor(true)
            .classes('some-class')
            .prop('staticProp', 'value')
            .if('a === b')
            .show('c == d')
            .style('background-color', 'black')
            .children([
                Component.create('span').text('bla bla bla'),
                Component.create('some-component')
                    .scopedSlots(scope => {
                        return [
                            Component.create('div')
                                .on('someEvent', scope('scoped.method()')),
                        ];
                    }),
            ]),
    )
        .store({variable: 'value'})
        .header('title', 'Titel');

    expect(page.toObject()).toMatchSnapshot();
});
