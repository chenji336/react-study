import Component from "../react/component";
import { setAttribute } from './dom.js';

function createComponent(component, props) {
    let inst; // 理解单词意思：机构
    if (component.prototype && component.prototype.render) { // class
        inst = new component(props);
    } else { // function
        inst = new Component(props);
        // debugger; // 测试下construtor的赋值
        inst.constructor = component;
        inst.render = function () { // 添加render方法
            return this.constructor(props); // 执行component这个function（测试看看Component里面的属性还在不在）
        };
    }
    return inst;
}

function setComponentProps(component, props) {
    if (!component.base) {
        if (component.componentWillMount) { // 初始化的时候只会执行一次
            component.componentWillMount();
        }
    } else if (component.componentWillReceiveProps) { // 传入props都会触发
        component.componentWillReceiveProps();
    }

    component.props = props; // 如果没有调用super（props），这里就起作用了
    renderComponent(component);
}

export function renderComponent(component) { // setState的时候也会触发
    let base;
    const renderer = component.render();

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = _render(renderer); // 挂载

    if (component.base) {
        if (component.componentDidUpdate) {
            component.componentDidUpdate();
        }
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }
    component.base = base;
    base._component = component;
}

function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
        vnode = '';
    }
    if (typeof vnode === 'number') {
        vnode = String(vnode);
    }
    if (typeof vnode === 'string') {
        // container.innerHTML = vnode; // 下面使用也可以
        const textNode = document.createTextNode(vnode);
        return textNode;
    }

    if (typeof vnode.tag === 'function') { // class也是function
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }

    const dom = document.createElement(vnode.tag);
    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        });
    }
    vnode.children.forEach(child => render(child, dom));
    return dom;
}

export function render(vnode, container) {
    // container.innerHTML = ''; // 手动清空不能放在这里，因为多个children的时候会清空前面的
    container.appendChild(_render(vnode));
}