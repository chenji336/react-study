export function setAttribute(dom, name, value) {
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