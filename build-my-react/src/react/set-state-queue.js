import { renderComponent } from '../react-dom/diff.js';
const queue = [];
const renderQueue = [];

export function enqueueSetState(stateChange, component) {
    // 清空之后执行下一次
    if (queue.length === 0) {
        defer(flush);
    }
    queue.push({
        stateChange,
        component
    })
     // 如果renderQueue里没有当前组件，则添加到队列中
    if (!renderQueue.some(item => item === component)) {
        renderQueue.push(component);
    }
}

// 清空数据
function flush() {
    let item, component;
    while (item = queue.shift()) { // 第一个数据
        const { stateChange, component } = item;

        // 如果没有prevState，则将当前的state作为初始的prevState
        if (!component.prevState) {
            component.prevState = component.state;
        }

        if (typeof stateChange === 'function') {
            Object.assign(component.state, stateChange(component.prevState, component.props));
        } else {
            Object.assign(component.state, stateChange);
        }

        component.prevState = component.state;
    }

    while(component = renderQueue.shift()) {
        renderComponent(component);
    }
}

function defer(fn) {
    // 不用setTimeout是因为在Promise在没有渲染前执行
    return Promise.resolve().then(fn);
}