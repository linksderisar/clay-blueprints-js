import AbstractConditionBlueprint from './Abstracts/AbstractConditionBlueprint';

export default class IfConditionBlueprint extends AbstractConditionBlueprint {

    static create(...attributes): IfConditionBlueprint {
        return new this();
    }

    type = 'if';
}
