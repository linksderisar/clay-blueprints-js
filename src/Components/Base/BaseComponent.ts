import AbstractComponent from '../Abstracts/AbstractComponent';

export default class BaseComponent extends AbstractComponent {
    constructor(...options) {
        super();
        this.setType(options[0]);
    }
}
