import AbstractConditionBlueprint from "./Abstracts/AbstractConditionBlueprint";

export default class IfConditionBlueprint extends AbstractConditionBlueprint {
    type = 'if';

    static create(...attributes): IfConditionBlueprint {
        return new this();
    }
}
