/*
* 轮播图
* */
var $oul = $('.ulBox'),
    $listBox = $('.listBox');

function bannerFn() {
    var mySwiper = new Swiper('.bannerBox', {
        autoplay: {
            disableOnInteraction: false,
            delay: 3000,
        },
        loop: true,   //无缝滚动
        pagination: {   //分页器
            el: '.pageBox',  //分页器的盒子
            type: 'fraction',
            currentClass: 'currentPage',  //变动数字的 盒子的类名
            totalClass: 'totalPage',     //总共数字 盒子的类名
        },
    });
}

$.ajax({
    type: 'get',
    url: './data/banner.json',
    data: {t: 123, q: 234},
    success: function (d) {
        //成功执行
        console.log(d);
        giveHtml(d);
    },
    error: function () {
        //失败执行
    }
});


function giveHtml(data) {
    data = data || [];
    var str = '';
    data.forEach((item) => {
        str += ` <div class="swiper-slide">
                        <a href="##">
                            <img src=${item.img} alt="">
                            <span>${item.title}</span>
                        </a>
                    </div>`
    });
    $oul.html(str);
    bannerFn();
}

/*
* 新闻 列表
* */

var listPro = new Promise(function (resolve, reject) {
    $.ajax({
        type: 'post',
        url: './data/list.json',
        data: {t: 1},
        success: function (data) {
            resolve(data)
        },
        error: function (res) {
            reject(res)
        }
    })
});

//把数据放到列表中
function giveListHtml(data) {
    data = data || [];
    var str = '';
    data.forEach((item) => {
        switch (item.type) {
            case 0://无图结构
                str += `<a href="##">
                    <div class="textBox">
                        <p>${item.title}</p>
                        <div class="comment_box">
                            <em class="">
                                <span class="">${item.num}</span>
                                <span class="icon_com"></span>
                            </em>
                        </div>
                    </div>
                </a>`;
                break;
            case 1://1图结构
                str += `<a href="##">
                            <div class="img_box">
                                <img src=${item.img} alt="">
                            </div>
                            <div class="textBox">
                                <p>${item.title}</p>
                                <div class="comment_box">
                                    <em class="">
                                        <span class="">${item.num}</span>
                                        <span class="icon_com"></span>
                                    </em>
                                </div>
                            </div>
                        </a>`;
                break;
            case 3:
                str += `<a href="##" class="three_box">
                            <p>${item.title}</p>
                            <div class="three_pic">
                                <div><img src=${item.img[0]} alt=""></div>
                                <div><img src=${item.img[1]} alt=""></div>
                                <div><img src=${item.img[2]} alt=""></div>
                            </div>
                            <div class="comment_box">
                                <em class="">
                                    <span class="">${item.num}</span>
                                    <span class="icon_com"></span>
                                </em>
                            </div>
                        </a>`;
                break;
        }
    });
    $listBox.html(str);
}

listPro.then(function (data) {
    giveListHtml(data);
})