var oDiv = document.getElementsByClassName('carousel')[0],
    oUl = oDiv.getElementsByClassName('img_box')[0],
    btnL = oDiv.getElementsByClassName('btn_l')[0],
    btnR = oDiv.getElementsByClassName('btn_r')[0],
    btnUl = oDiv.getElementsByClassName('tips_box')[0],
    btnLis = btnUl.getElementsByTagName('li');

var data = null,
    index = 0,
    n = null,
    oDivW = utils.css(oDiv, 'width'),
    timer = null;


function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', './json/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^[23]\d{2}$/.test(xhr.status)) {
            data = utils.toJson(xhr.responseText);
        }
    };
    xhr.send();
}

getData();

function giveHtml() {
    var str = '';
    var lastStr = '';
    var btnStr = '';
    data.forEach(function (item, index) {
        str += `<li>
                <img src="${item.pic}" alt="">
                <p>${item.title}</p>
            </li>`;
        if (index === 0) {
            lastStr = `<li>
                <img src="${item.pic}" alt="">
                <p>${item.title}</p>
            </li>`
        }
        btnStr += `<li class="tip">${index + 1}</li>`
    });
    str += lastStr;
    n = data.length + 1;
    oUl.innerHTML = str;
    btnUl.innerHTML = btnStr;
    utils.addClass(btnLis[0], 'current');
    utils.css(oUl, 'width', oDivW * n);
    utils.css(oUl, 'position', 'absolute')
}

giveHtml();

function play() {
    if (utils.css(oUl, 'left') % oDivW) return;
    index++;
    if (index <= -1) {
        utils.css(oUl, 'left', -oDivW * (n - 1));
        index = n - 2;
    }
    if (index >= n) {
        utils.css(oUl, 'left', 0);
        index = 1;
    }
    [...btnLis].forEach(function (item) {
        utils.removeClass(item, 'current')
    });
    if (index == n - 1) {
        utils.addClass(btnLis[0], 'current')
    } else {
        utils.addClass(btnLis[index], 'current');
    }
    myAnimate(oUl, 1000, {left: -index * oDivW})
}

function autoPlay() {
    timer = setInterval(function () {
        play();
    }, 3000)
}

autoPlay();

function eventFn() {
    oDiv.onmouseenter = function () {
        clearInterval(timer);
        utils.css(btnL, 'display', 'block');
        utils.css(btnR, 'display', 'block');
    };
    oDiv.onmouseleave = function () {
        utils.css(btnL, 'display', 'none');
        utils.css(btnR, 'display', 'none');
        autoPlay()
    };
    btnR.onclick = function () {
        play();
    };
    btnL.onclick = function () {
        if (utils.css(oUl, 'left') % oDivW) return;
        index -= 2;
        play();
    }

}

eventFn();

function setbtn() {
    for (let i = 0; i < btnLis.length; i++) {
        btnLis[i].onclick = function () {
            if (index === n - 1) utils.css(oUl, 'left', 0);
            index = i - 1;
            play();
        }
    }
}

setbtn();