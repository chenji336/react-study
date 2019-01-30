import PubSub from '../lib/pubsub.js';

export default class Store {
    constructor(params) {
        this.actions = {}; // 对应dispatch
        this.mutations = {}; //对应commit 类似reducer
        this.state = {};
        this.status = 'resting';

        this.events = new PubSub(); // 那么是不是this.events有属性events(this.events.events?)

        if (params.hasOwnProperty('actions')) {
            this.actions = params.actions;
        }
        if (params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations;
        }

        this.state = new Proxy(params.state || {}, {
            set: (state, key, value) => {
                state[key] = value;
                console.log(`stateChange:${key}:${value}`); // 找寻轨迹，用户可以看到
                this.events.publish('stateChange', this.state);

                if (this.status !== 'mutation') { // 如果状态不是mutation（外部直接修改），则提示一下这样不安全
                    console.warn(`you should  use a mutation to set ${key}`);
                }
                this.status = 'resting';
                return true;
            }
        })
    }

    // dispatch内部执行actions
    dispatch(actionKey, payload) {
        if (typeof this.actions[actionKey] !== 'function') {
            console.error(`Action ${actionKey} doesn't exist.`);
            return false;
        }
        console.groupCollapsed(`Action: ${actionKey}`); // 日志进行折叠（actions[actionKey]的日志包含进去)
        this.status = 'action';
        this.actions[actionKey](this, payload);
        console.groupEnd();
        return true;
    }

    // redux的reducer
    commit(mutationKey, payload) {
        if (typeof this.mutations[mutationKey] !== 'function') {
            console.error(`Action ${mutationKey} doesn't exist.`)
        }
        this.status = 'mutation';
        const newState = this.mutations[mutationKey](this.state, payload);
        this.state = Object.assign(this.state, newState);
        return true;
    }
}