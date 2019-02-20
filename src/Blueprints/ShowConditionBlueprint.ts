import AbstractConditionBlueprint from './Abstracts/AbstractConditionBlueprint';

export default class ShowConditionBlueprint extends AbstractConditionBlueprint {

    static create(...attributes): ShowConditionBlueprint {
            const condition = new this();
            condition.setCondition(attributes[0]);
            return condition;
    }

    type = 'show';
}
