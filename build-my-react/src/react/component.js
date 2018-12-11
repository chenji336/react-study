import { renderComponent } from '../react-dom/render';
export default class Component {
    // 基础类不给出render方法，考虑到pure component情况（class会自己携带）
    constructor(props = {}) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        Object.assign(this.state, stateChange);
        renderComponent(this);
    }
}