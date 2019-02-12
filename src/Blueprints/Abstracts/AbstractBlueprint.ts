import BlueprintInterface from "../Contracts/BlueprintInterface";
import _ from "lodash";
import RequiredBlueprintAttributeMissingException from "../../Exceptions/RequiredBlueprintAttributeMissingException";

export default abstract class AbstractBlueprint implements BlueprintInterface {
    private readonly id: string;
    protected type!: string;

    protected constructor() {
        this.id = this.generateId();
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    protected generateId(): string {
        return _.times(40, () => _.random(35).toString(36)).join('');
    }

    static create<T = AbstractBlueprint>(this: { new(): T }, ...attributes) {
        return new this();
    }

    clone(): BlueprintInterface {
        throw new Error("Method not implemented.");
    }

    toObject(): object {
        return {
            id: this.id,
            type: this.type
        };
    }
    toJson(): string {
        return JSON.stringify(this.toObject());
    }
}
