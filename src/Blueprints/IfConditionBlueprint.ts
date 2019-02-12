import AbstractConditionBlueprint from "./Abstracts/AbstractConditionBlueprint";

export default class IfConditionBlueprint extends AbstractConditionBlueprint {
    constructor() {
        super();
        this.type = 'if';
    }
}
