export default interface ComponentInterface {
    getId(): string;
    getType(): string;
    clone(): ComponentInterface;
    toObject(): object;
    toJson(): string;
}
