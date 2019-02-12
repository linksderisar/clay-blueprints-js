import Blueprint from './Blueprint';
import AbstractBlueprint from "./Abstracts/AbstractBlueprint";

export default class LoopBlueprint extends AbstractBlueprint {



    toObject() {
        return {
            'loop': this.iterable
        };
    }
}
