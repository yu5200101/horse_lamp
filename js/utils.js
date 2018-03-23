//=>utils 属于一个项目公共方法库，在这里存放了常用的一些方法
var utils = (function () {

    //=>把类数组转化为数组，兼容所有浏览器
    var toArray = function toArray(classAry) {
        var ary = [];
        try{
            ary = Array.prototype.slice.call(classAry);
        }catch(e){
            for (var i = 0; i < classAry.length; i++) {
                ary[ary.length] = classAry[i];
            }
        }
        return ary;

    };
//获取当前元素的样式
    var getCss = function (curEle,attr) {
        var value = null,
            reg = null;
        if(window.getComputedStyle){
            value = window.getComputedStyle(curEle,null)[attr];
        }else{
            if(attr = 'opacity'){
                value = curEle.currentStyle['filter'];
                reg = /^alpha\(opacity=(.+)\)$/i;
                value = reg.test(value) ? reg.exec(value)[1]/100 : 1;
            }else{
                value = curEle.currentStyle[attr];
            }
        }
        var regNum = /^-?(\d|([1-9]\d+))(\.\d+)?(px|pt|rem|em)?$/i;
        regNum.test(value)? value = parseFloat(value) : null;
        return value;
    };
   //设置当前元素的样式
    var setCss = function (curEle,attr,value) {
        !isNaN(value) && !/^(zIndex|zoom|lineHeight|fontWeight)$/i.test(value) ? value += 'px': null;
        if(attr == 'opacity') {
            curEle['style']['opacity'] = value;
            curEle['style']['filter'] = 'alpha(opacity'+ value*100+ ')';
            return;
        }
        curEle['style'][attr] = value;
        return value;
    };
    //组合设置样式
    var setGroupCss = function (curEle,options) {
        if(Object.prototype.toString.call(options) !== '[object Object]')return;
            for (var attr in options) {
                if(options.hasOwnProperty(attr)){
                    setCss(curEle,attr,options[attr]);
                }
            }
    };
    //设置样式、获取样式
    var css = function () {
        var len = arguments.length,
            fn = getCss,
            type = Object.prototype.toString.call(arguments[1]);
        len >= 3 ? fn = setCss : (len === 2 && type === '[object Object]'? fn = setGroupCss : null);
        return fn.apply(this,arguments);
    };
    //=>offset：获取当前元素距离body的偏移量，包括左偏移和上偏移
    var offset = function (curEle) {
        var l = curEle.offsetLeft,
            t = curEle.offsetTop,
            p = curEle.offsetParent;
        while( p.tagName !== 'BODY'){
            if(!/MSIE 8/i.test(navigator.userAgent)){
                //加上边框值 获取浏览器的类型
                l += p.clientLeft;
                t += p.clientTop;
            }
            //加上偏移值
            l += p.offsetLeft;
            t += p.offsetTop;

            p = p.offsetParent;
        }
        return {top:t,left:l};
    };
    //处理浏览器兼容性
    var win = function (attr,value) {
        if(typeof  value !== 'undefined'){
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr]||document.body[attr]
    };
    //=>把JSON格式的字符串转换为JSON格式的对象
   var toJSON =  function toJSON(str) {
        return "JSON" in window ? JSON.parse(str):eval('(' + str + ')');
    };
    return{
        toArray:toArray,
        toJSON:toJSON,
        css:css,
        offset:offset,
        win:win
    };
})();
