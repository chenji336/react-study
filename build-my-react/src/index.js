function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    };
}

const React = {
    createElement
};

// transform-react-jsx 会执行
// var element = React.createElement("div", null, "hello", React.createElement("span", null, "world!"));
// createElement需要自己定义，从定义中找的
const element = (
    <div>
        hello<span>world!</span>
    </div>
);


// console.log(element)  // 可以查看element

// 就算没有用到React也需要引入，是因为transform-react-jsx使用了React.createElement进行jsx的转化
const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = ''; // 多次访问的话需要手动清空
        render(vnode, container);
    }
};

// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('root')
// );

function tick() {
    const element = (
        <div>
            <h1 style={{background: 'yellow'}}>Hello, world!</h1>
            {/* transfrom-react-jsx自带模板功能 */}
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
    ReactDOM.render(
        element,
        document.getElementById( 'root' )
    );
}

setInterval( tick, 1000 );

function render(vnode, container) {
    if (typeof vnode === 'string') {
        // container.innerHTML = vnode; // 下面使用也可以
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode);
    }

    const dom = document.createElement(vnode.tag);
    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        });
    }
    vnode.children.forEach(child => render(child, dom));
    return container.appendChild(dom);
}

function setAttribute(dom, name, value) {
    name = name === 'className' ? 'class' : name; // 否则setAttribute会多出一个className的attribute

    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || ''; // dom.id=undefined=><div id='undefined'></div>;dom.id='' => <div id></div>
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            Object.keys(value).forEach(key => {
                dom.style[key] = typeof key === 'number' ? `${value[key]}px` : value[key]
            })
        }
    } else {
        if (name in dom) { // 重新赋值
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.remove(name);
        }
    }
}