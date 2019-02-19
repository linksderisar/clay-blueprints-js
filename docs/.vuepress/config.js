module.exports = {
    title: 'clay-blueprint-js',
    description: 'Documentation for the clay-blueprint-js library',
    themeConfig: {
        nav: [
            { text: 'Getting started', link: '/getting-started/' },
            { text: 'Blueprints', link: '/blueprints/' },
            { text: 'Components', link: '/components/' },
        ],
        sidebar: [
            '/',
            {
                title: 'Getting started',
                collapsable: false,
                children: [
                    ['/getting-started/', 'Getting started'],
                ]
            },
            {
                title: 'Blueprints',
                collapsable: false,
                children: [
                    ['/blueprints/', 'Overview'],
                    ['/blueprints/component-blueprint/', 'ComponentBlueprint'],
                    ['/blueprints/root-blueprint/', 'RootBlueprint'],
                    ['/blueprints/if-condition-blueprint/', 'IfConditionBlueprint'],
                    ['/blueprints/show-condition-blueprint/', 'ShowConditionBlueprint'],
                    ['/blueprints/loop-blueprint/', 'LoopBlueprint'],
                    ['/blueprints/text-blueprint/', 'TextBlueprint'],
                ]
            },
            {
                title: 'Components',
                collapsable: false,
                children: [
                    ['/components/', 'Overview'],
                    ['/components/component', 'Component'],
                    ['/components/page', 'Page'],
                    ['/components/root', 'Root']
                ]
            },

        ]
    }
};
