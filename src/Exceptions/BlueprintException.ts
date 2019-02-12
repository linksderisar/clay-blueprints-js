export default class BlueprintException extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BlueprintException.prototype);
    }
}
