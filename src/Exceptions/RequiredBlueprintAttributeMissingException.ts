export default class RequiredBlueprintAttributeMissingException extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RequiredBlueprintAttributeMissingException.prototype);
    }
}
