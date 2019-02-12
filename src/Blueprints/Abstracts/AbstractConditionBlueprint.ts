import AbstractBlueprint from "./AbstractBlueprint";

export default abstract class AbstractConditionBlueprint extends AbstractBlueprint {
    private condition = '';

    public getCondition(): string {
        return this.condition;
    }

    public setCondition(condition: string): AbstractConditionBlueprint {
        this.condition = condition;
        return this;
    }

    toObject(): object {
        return {
            [this.getType()]: this.condition
        };
    }
}
