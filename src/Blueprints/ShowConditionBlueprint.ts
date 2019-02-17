import AbstractConditionBlueprint from "./Abstracts/AbstractConditionBlueprint";

export default class ShowConditionBlueprint extends AbstractConditionBlueprint {
    type = 'show';

    static create(...attributes): ShowConditionBlueprint {
        return new this();
    }
}
