import Store from '../store/store.js';

export default class Component {
    constructor(props = {}) {

        this.render = this.render || function() {};

        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => this.render()); // 使用箭头符号让this指向的是Component
        }

        if (props.hasOwnProperty('element')) {
            this.element = props.element;
        }
    }
}