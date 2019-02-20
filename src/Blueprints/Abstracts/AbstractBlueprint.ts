import _ from 'lodash';
import RequiredBlueprintAttributeMissingException from '../../Exceptions/RequiredBlueprintAttributeMissingException';
import BlueprintInterface from '../Contracts/BlueprintInterface';

export default class AbstractBlueprint implements BlueprintInterface {

    static create(...attributes) {
        return new this();
    }

    protected type!: string;

    private readonly id: string;

    protected constructor() {
        this.id = this.generateId();
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    clone(): BlueprintInterface {
        throw new Error('Method not implemented.');
    }

    toObject(): any {
        return {
            id: this.id,
            type: this.type,
        };
    }

    toJson(): string {
        return JSON.stringify(this.toObject());
    }

    protected generateId(): string {
        return _.times(40, () => _.random(35).toString(36)).join('');
    }
}
