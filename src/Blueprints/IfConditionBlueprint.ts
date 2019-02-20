import AbstractConditionBlueprint from './Abstracts/AbstractConditionBlueprint';

export default class IfConditionBlueprint extends AbstractConditionBlueprint {

    static create(...attributes): IfConditionBlueprint {
        const condition = new this();
        condition.setCondition(attributes[0]);
        return condition;
    }

    type = 'if';
}
