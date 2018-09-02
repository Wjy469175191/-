var utils = (function () {
    var flag=window.getComputedStyle ? false : true;
    function getCss(ele,attr) {
        var str = navigator.userAgent;
        var res = null;
        if(flag){
            res = ele.currentStyle[attr]
        }else {
            res = getComputedStyle(ele)[attr];
        }

        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/;
        res = reg.test(res) ? parseFloat(res) : res;
        return res;
    }
    function setCss(ele,attr,value) {
        var reg = /width|height|padding|margin|left|top|bottom|right|fontsize/i;
        if(reg.test(attr)){
            value = parseFloat(value) + 'px';
        }
        ele.style[attr]=value;
    }
    function setGroup(ele,obj){
        if(Object.prototype.toString.call(obj) == '[object Object]'){
            for(var k in obj){
                if(obj.hasOwnProperty(k)){
                    setCss(ele,k,obj[k])
                }
            }
        }
    }
    function css() {
        var arg = arguments;
        if(arg.length == 2){
            if(typeof arg[1] == 'string'){
                return getCss(arg[0],arg[1])
            }
            setGroup(arg[0],arg[1])
        }else {
            setCss(arg[0],arg[1],arg[2]);
        }
    }
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var temp = ele.offsetParent;
        while (temp && temp.nodeName.toLowerCase() != 'body'){
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l,t
        }

    }
    function toArray (a) {
        var ary = [];
        if (flag) {
            for(let i = 0; i < a.length; i++){
                ary.push(a[i])
            }
        }else{
            ary = [].slice.call(a)
        }
        return ary
    }
    function toJson (str) {
        var obj = {};
        if(flag) {
            obj = eval(`(${str})`);
        }else{
            obj = JSON.parse(str);
        }
        return obj;
    }
    function scrollT() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function clientH() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
    function clientW() {
        return document.documentElement.clientWidth || document.body.clientWidth;
    }
    function win(i) {
        return document.documentElement[i] || document.body[i];
    }
    function children(ele) {
        var childs=ele.children;
        var ary = [];
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType === 1) {
                ary.push(childs[i]);
            }
        }
        return ary;
    }
    function getByClass(str,context) {
        str=str.replace(/^ +| +$/g,'');
        var arr=str.split(/ +/);
        context = context || document;
        var eles = context.getElementsByTagName('*');
        for(let k=0;k<arr.length;k++) {
            var ary = [];
            var reg = new RegExp('(^| +)' +arr[k]+ "( +|$)");
            for (var i = 0; i < eles.length; i++) {
                if (reg.test(eles[i].className)) {
                    ary.push(eles[i])
                }
            }
            eles=ary;
        }
        return eles;
    }
    function hasClass(ele,str) {
        str=str.replace(/^ +| +$/g,'');
        var ary=str.split(/ +/g);
        for(var i=0;i<ary.length;i++){
            var reg=new RegExp("(^| +)"+ary[i]+"( +|$)");
            if(!reg.test(ele.className)){
                return false
            }
        }
        return true;
    }
    function addClass(ele,str) {
        str = str.replace(/^ +| +$/g,'');
        if(hasClass(ele,str))return;
        var ary=str.split(/ +/);
        for(var i=0;i<ary.length;i++){
            if(!hasClass(ele,ary[i]))ele.className+=(' '+ ary[i]);
        }
    }
    function removeClass(ele, str) {
        str = str.replace(/^ +| +$/g, '');
        var ary = str.split(/ +/);
        for (var i = 0; i < ary.length; i++) {
            var reg=new RegExp('(^| +)'+ary[i]+"( +|$)",'g');
            ele.className = ele.className.replace(reg,' ');
        }
    }

    return{
        getCss,
        setCss,
        setGroup,
        css,
        toArray,
        toJson,
        offset,
        scrollT,
        clientH,
        clientW,
        win,
        children,
        getByClass,
        hasClass,
        addClass,
        removeClass
    }
})();