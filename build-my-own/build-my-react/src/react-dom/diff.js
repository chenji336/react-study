import { Component } from '../react'
import { setAttribute } from './dom'

/**
 * 
 * @param {HTMLElement} dom 真实dom
 * @param {vnode} vnode 虚拟dom
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的dom
 */
export function diff(dom, vnode, container) {
    const ret = diffNode(dom, vnode);
    if (container && ret.parentNode !== container) {
        container.appendChild(ret);
    }
    return ret;
}

function diffNode(dom, vnode) {
    let out = dom;
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
        vnode = '';
    }
    if (typeof vnode === 'number') {
        vnode = String(vnode);
    }

    // diff text node
    if (typeof vnode === 'string') {
        if (dom && dom.nodeType === 3) { // nodeType=3代表文本
            if (dom.textContent !== vnode) {
                dom.textContent = vnode;
            }
        } else {
            out = document.createTextNode(vnode);
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom);
            }
        }
        return out; // 非文本需要返回，否则回去对比属性从而产生错误
    }

    // 对比组件
    if ( typeof vnode.tag === 'function' ) {
        return diffComponent( dom, vnode );
    }

    // 对比非文本dom节点
    if (!dom || !isSameNodeType( dom, vnode )) { 
        out = document.createElement(vnode.tag);
        if (dom) {
            [...dom.childNodes].map(out.appendChild); // 把dom的子节点全部赋值给新的父节点（out）
            if (dom.parentNode) {
                dom.parentNode.replaceChild(out, dom);
            }
        }
    }

    // 对比子节点
    if (vnode.children && vnode.children.length > 0 || (out.childNodes && out.childNodes.length) > 0) {
        diffChildren(out, vnode.children);
    }

    // 对比属性
    diffAttributes(out, vnode);

    return out;
}

// 比较子节点需要客户标记一下key为什么（如果没有也没有关系，只是效率会慢一些）
function diffChildren(dom, vchildren) {
    const domChildren = dom.childNodes;
    const keyed = {}; // 保存有key的节点
    const children = []; // 保存没有key的节点

    // 将有key的节点和没有key的节点分开
    if (domChildren.length > 0) {
        for (let i = 0; i < domChildren.length; i++) { // 伪数组不能使用forEach,故用for循环来搞定（也可以[...domChildren]
            const child = domChildren[i];
            const key = child.key;
            if (key) {
                keyed[key] = child;
            } else {
                children.push(child);
            }
        }
    }

    // 循环虚拟dom来进行比较
    if (vchildren && vchildren.length > 0) {
        let min = 0;
        let childrenLen = children.length;

        for (let i = 0; i < vchildren.length; i++) {
            const vchild = vchildren[i];
            const key = vchild.key;
            let child;

            if (key) {
                if (keyed[key]) {
                    child = keyed[key];
                    keyed[key] = undefined; // 后续有相同key的不处理
                }
            } else if (min < childrenLen) {
                // 如果没有key，则优先找类型相同的节点
                for (let j = min; j < childrenLen; j++) {
                    let c = children[j];
                    if (c && isSameNodeType(c, vchild)) {
                        child = c;
                        children[j] = undefined; // 后续则不需要判断该条
                        if (j === min) {
                            min++;
                        }
                        if (j === children - 1) {
                            children--;
                        }
                        break;
                    }
                }
            }

            // 对比并且返回修改后的dom
            child = diff(child, vchild);

            // 更新DOM
            const f = domChildren[ i ];
            // 下面对每个条件做一个测试用例
            // debugger; // ***切记
            if ( child && child !== dom && child !== f ) {
                // 如果更新前的对应位置为空，说明此节点是新增的
                if ( !f ) {
                    dom.appendChild(child); // 初始化的时候被添加
                // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
                } else if ( child === f.nextSibling ) {
                    removeNode( f ); // 原先的空text被移除
               // 将更新后的节点移动到正确的位置
                } else {
                    // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
                    dom.insertBefore( child, f ); // if的数据被插入
                }
            }

        }
    }
}

function diffComponent(dom, vnode) {
    let c = dom && dom._component;
    const oldDom = dom;

    // 如果类型相同
    if (c && c.constructor === vnode.tag) {
        setComponentProps(c, vnode.attrs);
        dom = c.base;
    } else {
    // 类型不同
        if (c) {
            unmountComponent(c);
            oldDom = null;
        }
        c = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(c, vnode.attrs);
        dom = c.base;
        if (oldDom && dom !== oldDom) {
            oldDom._component = null;
            removeNode(oldDom);
        }
    }
    return dom;
}

function diffAttributes(dom, vnode) {
    let old = {};
    const attrs = vnode.attrs;
    for (let i = 0; i < dom.attributes.length; i++) {
        const attr = dom.attributes[i];
        old[attr.name] = attr.value;
    }

    // 删除已经不存在的attribute
    for (let name in old) {
        if (!(name in attrs)) {
            setAttribute(dom, name, undefined);
        }
    }

    // 更新和增加attribute
    for (let name in attrs) {
        if (old[name] !== attrs[name]) { // old[name] === undefined代表没有，这个时候就是增加了
            setAttribute(dom, name, attrs[name]);
        }
    }
}

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

    base = diffNode(component.base, renderer ); // 挂载

    if (component.base) {
        if (component.componentDidUpdate) {
            component.componentDidUpdate();
        }
    } else if (component.componentDidMount) {
        component.componentDidMount();
    }
    component.base = base;
    base._component = component;
}

function unmountComponent(component) {
    if (component.componentWillUnmount) {
        component.componentWillUnmount();
    }
    removeNode(component.base);
}

function isSameNodeType(dom, vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return dom.nodeType === 3;
    }
    if (typeof vnode.tag === 'string') {
        return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase();
    }
    // 组件判断
    return dom && dom._component && dom._component.constructor === vnode.tag;
}

function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom)
    }
}