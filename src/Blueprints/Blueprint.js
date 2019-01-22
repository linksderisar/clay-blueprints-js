import _ from 'lodash';

export default class Blueprint {
    constructor(type = '') {
        this.id = this.generateId();
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    generateId() {
        return _.times(40, () => _.random(35).toString(36)).join('');
    }

    toObject() {
        if (this.id === -1) {
            console.log('id must be set');
        }

        if (this._type === '') {
            console.log('type must be set')
        }

        return {
            'id': this.id,
            'type': this._type,
        };
    }

    toJson() {
        return JSON.stringify(this.toObject());
    }

    clone() {
        const clone = _.cloneDeep(this);
        clone.id = clone.generateId();

        return clone;
    }
}

