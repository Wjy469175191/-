var $oDiv = $('.carousel'),
    $oUl = $oDiv.children('.img_box'),
    $oLis = $oUl.children('li'),
    $btnL = $oDiv.find('.btn_l'),
    $btnR = $oDiv.find('.btn_r'),
    $btnUl=$oDiv.find('.tips_box'),
    $tips=$btnUl.find('.tip');

var n = null,
    index = 0,
    flag = 0,
    timer = null;


$.ajax({
    type: 'post',
    url: 'json/data.json',
    data: {},
    success: function (data) {
        giveHtml(data);
        init();
    },
    error: function () {

    }
});

function giveHtml(data) {
    var str = '';
    var btnStr='';
    $.each($(data), function (index, item) {
        str += `<li>
                <img src="${item.pic}" alt="">
                <p>${item.title}</p>
            </li>`;
        btnStr+=`<li class="tip">${index+1}</li>`;
    });
    $oUl.html(str);
    n = data.length;
    $oLis = $oUl.children('li');
    $oLis.eq(0).css({zIndex:10}).siblings().css({zIndex: 10,opacity: 0});
    $btnUl.html(btnStr);
    $tips=$btnUl.find('.tip');
    $tips.eq(0).addClass('current');
}

function init() {
    autoPlay();
    eventFn();
    setBtn();
}

function play() {
    if (flag) return;
    flag = 1;
    index++;
    if(index<=-1){
        index = n-1;
    }
    if (index >= n) {
        index = 0;
    }
    $($oLis[index]).css('zIndex', 10).siblings().css('zIndex', 1);
    $($tips[index]).addClass('current').siblings().removeClass('current');
    myAnimate($oLis[index], 1000, {opacity: 1}, 'linear', function () {
        $($oLis[index]).siblings().css('opacity', 0);
        flag = 0;
    })
}

function autoPlay() {
    timer = window.setInterval(function () {
        play();
    }, 3000)
}

function eventFn() {
    $oDiv.on('mouseenter',function () {
        clearInterval(timer);
        $btnL.css('display','block');
        $btnR.css('display','block');
    });
    $oDiv.on('mouseleave',function () {
        $btnL.css('display','none');
        $btnR.css('display','none');
        autoPlay();
    });
    $btnR.on('click',function () {
        play();
    });
    $btnL.on('click',function () {
        if(flag)return;
        index-=2;
        play();
    })
}
function setBtn() {
    $tips.on('click',function () {
        index=$(this).index()-1;
        play();
    })
}