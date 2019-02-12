export default interface BlueprintInterface {
    getId(): string;
    getType(): string;
    clone(): BlueprintInterface;
    toObject(): object;
    toJson(): string;
}
