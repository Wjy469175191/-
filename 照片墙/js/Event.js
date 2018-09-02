function on(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        if (ele[type].indexOf(f) === -1) {
            ele[type].push(f)
        }
    } else {
        type = type.replace(/^on/, '');
        ele.addEventListener(type, f, false);
    }
}

function fire(ele, type) {
    ele[type] = ele[type] || [];
    ele[type].forEach((item) => {
        item && item.call(ele);
    })
}

function off(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        var n = ele[type].indexOf(f);
        if (n !== -1) {
            ele[type].splice(n, 1);
        }
    } else {
        type = type.replace(/^on/, '');
        ele.removeEventListener(type, f, false);
    }
}