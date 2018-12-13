import { enqueueSetState } from './set-state-queue.js';
export default class Component {
    // 基础类不给出render方法，考虑到pure component情况（class会自己携带）
    constructor(props = {}) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }

    setState(stateChange) {
        enqueueSetState(stateChange, this);
    }
}
