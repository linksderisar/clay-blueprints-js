import AbstractComponent from '../Abstracts/AbstractComponent';

export default class BaseComponent extends AbstractComponent {

    static create(...options): BaseComponent {
        return new this(options);
    }

    constructor(...options) {
        super();
        this.setType(options[0]);
    }
}
