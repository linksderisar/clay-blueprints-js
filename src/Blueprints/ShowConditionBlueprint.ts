import AbstractConditionBlueprint from './Abstracts/AbstractConditionBlueprint';

export default class ShowConditionBlueprint extends AbstractConditionBlueprint {

    static create(...attributes): ShowConditionBlueprint {
        return new this();
    }

    type = 'show';
}
