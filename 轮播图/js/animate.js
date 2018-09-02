(function () {
    var moveType = {
        linear: function linear(time, changeL, duration, beginL) {
            return changeL / duration * time + beginL;
        },
        easeIn: function (t,c,d,b) {
            return c - moveType.easeOut(d - t, c, d, 0) + b;
        },
        easeOut: function (t,c,d,b) {
            console.log(t);
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function (t,c,d,b) {
            if (t < d / 2) {
                return moveType.easeIn(t * 2, c, d, 0) * .5 + b;
            }
            return moveType.easeOut(t * 2 - d, c, d, 0) * .5 + c * .5 + b;
        }
    };

    function move(ele, duration, obj, moveT,callback) {
        clearInterval(ele.timer);
        moveT = moveT || 'linear';
        var beginL = {};
        var changeL = {};
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                beginL[k] = utils.css(ele, k);
                changeL[k] = obj[k] - beginL[k];
            }
        }
        var times = 0;
        ele.timer = setInterval(function () {
            times += 20;
            if (times >= duration) {
                times = duration;
                clearInterval(ele.timer);
                callback&&callback();
            }
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    var curPos = moveType[moveT](times, changeL[k], duration, beginL[k]);
                    utils.setCss(ele, k, curPos);
                }
            }
        }, 20)
    }

    window.myAnimate = move;
})();
