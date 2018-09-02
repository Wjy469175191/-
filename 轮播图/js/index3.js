var Banner = function () {
    this.oDiv = document.getElementsByClassName('carousel')[0];
    this.oUl = this.oDiv.getElementsByClassName('img_box')[0];
    this.btnL = this.oDiv.getElementsByClassName('btn_l')[0];
    this.btnR = this.oDiv.getElementsByClassName('btn_r')[0];
    this.btnUl = this.oDiv.getElementsByClassName('tips_box')[0];
    this.btnLis = this.btnUl.getElementsByTagName('li');
    this.data = null;
    this.index = 0;
    this.n = null;
    this.oDivW = utils.css(this.oDiv, 'width');
    this.timer = null;
    this.init();
};
Banner.prototype = {
    constructor: Banner,
    getData: function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', './json/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && /^[23]\d{2}$/.test(xhr.status)) {
                this.data = utils.toJson(xhr.responseText);
            }
        };
        xhr.send();
    },
    giveHtml: function giveHtml() {
        var str = '';
        var lastStr = '';
        var btnStr = '';
        this.data.forEach((item, index) => {
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
        this.n = this.data.length + 1;
        this.oUl.innerHTML = str;
        this.btnUl.innerHTML = btnStr;
        utils.addClass(this.btnLis[0], 'current');
        utils.css(this.oUl, 'width', this.oDivW * this.n);
        utils.css(this.oUl, 'position', 'absolute')
    },
    play: function play() {
        if (utils.css(this.oUl, 'left') % this.oDivW) return;
        this.index++;
        if (this.index <= -1) {
            utils.css(this.oUl, 'left', -this.oDivW * (this.n - 1));
            this.index = this.n - 2;
        }
        if (this.index >= this.n) {
            utils.css(this.oUl, 'left', 0);
            this.index = 1;
        }
        [...this.btnLis].forEach((item) => {
            utils.removeClass(item, 'current')
        });
        if (this.index === this.n - 1) {
            utils.addClass(this.btnLis[0], 'current')
        } else {
            utils.addClass(this.btnLis[this.index], 'current');
        }
        myAnimate(this.oUl, 1000, {left: -this.index * this.oDivW})
    },

    autoPlay: function autoPlay() {
        this.timer = setInterval(() => {
            this.play();
        }, 3000)
    },

    eventFn: function eventFn() {
        this.oDiv.onmouseenter = () => {
            clearInterval(this.timer);
            utils.css(this.btnL, 'display', 'block');
            utils.css(this.btnR, 'display', 'block');
        };
        this.oDiv.onmouseleave = () => {
            utils.css(this.btnL, 'display', 'none');
            utils.css(this.btnR, 'display', 'none');
            this.autoPlay()
        };
        this.btnR.onclick = () => {
            this.play();
        };
        this.btnL.onclick = () => {
            if (utils.css(this.oUl, 'left') % this.oDivW) return;
            this.index -= 2;
            this.play();
        }

    },

    setbtn: function setbtn() {
        for (let i = 0; i < this.btnLis.length; i++) {
            this.btnLis[i].onclick =  () =>{
                if (this.index === this.n - 1) utils.css(this.oUl, 'left', 0);
                this.index = i - 1;
                this.play();
            }
        }
    },
    init:function () {
        this.getData();
        this.giveHtml();
        this.autoPlay();
        this.eventFn();
        this.setbtn();
    }
};
var b=new Banner();