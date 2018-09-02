/*
* 第一块 loading 块
*
* */
var bell = $('#bell')[0],
    say = $('#say')[0],
    bgm = $('#bg_music')[0];

let loading = function () {
    //进度条加载完成后 要让 loading 的这个块消失
    let $progressBar = $('.progress .progressBar'),
        $loadingBox = $('.loadingBox');
    // 进度条的进度 是由  项目中 所有图片加载完成 来决定的；
    let ary = ['phone-bg.jpg', 'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0; //记录 加载完成的图片个数；
    ary.forEach((item) => {
        let img = new Image();
        // 让临时的 img 去请求图片
        img.src = `./images/` + item;
        img.onload = load;
    });

    function load() {
        n++;
        if (n === ary.length) {
            $progressBar.css({width: '100%'});
            $loadingBox.css({opacity: 0});
            var timer = setTimeout(function () {
                $loadingBox.hide();
                clearTimeout(timer);
                phoneFn();
            }, 1800)
        } else {
            // 没加载完；
            $progressBar.css({width: n / ary.length * 100 + '%'})
        }
    }
};
loading();

/*
* 第二个块
* */
let phoneFn = function () {
    let $phoneBox = $('.phoneBox'),
        $listenBox = $('.listen_box'),
        $listenBtn = $('.listenBtn'),
        $noListenBox = $('.no_listen_box'),
        $noListenBtn = $('.no_listen_btn'),
        $timeBox = $('.phoneBox header h4');
    // $listenBox.on('touchend')
    bell.play();
    $listenBtn.tap(function () {
        //点击 接听按钮
        $listenBox.hide();
        $timeBox.show();
        $noListenBox.css({
            transform: 'translateY(0)'
        });
        bell.pause();
        say.play();
        //语言播放  怎么让上边的时间跟着变化
        let sayTimer = setInterval(function () {
            let t = say.currentTime;
            let str = '00:' + (Math.ceil( t ) < 10 ? '0' + Math.ceil( t ) : Math.ceil( t ));
            $timeBox.html(str);
            //需要把 say.currentTime 转成 00:34 这种格式的字符串

            //需要我们判断音频是否播放完毕； 若播放完毕，则直接执行 挂机键执行的操作；
            if(say.ended){
                clearInterval(sayTimer);
                phoneEnd();
            }
        },1000);
        //
        //给挂机 按钮 添加函数
        $noListenBtn.on('touchend', function () {
            say.pause();
            phoneEnd();
        });

        function phoneEnd() {
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            // 获取到 的是个以 px为单位的 数字
            $phoneBox.css({
                transform: `translateY(${h}px)`
            });
            setTimeout(function () {
                msgFn();
            }, 800)
        }
    })
};

/*
* 第三个块 msgFn
*
* */


let msgFn = function () {
    // 让每一个 li 先都透明 并且下移
    // 循环这些 li 让这些li 轮着升上去 并且 显示出来；

    let $msgBox = $('.msgBox'),
        $ul = $msgBox.children('ul'),
        $lis = $ul.children('li'),
        $keyboard = $msgBox.find('.keyboard'),
        $textBox = $keyboard.find('.textBox'),
        $btn = $keyboard.find('.btn');
    bgm.play();
    let h = 0,
        n = 0; // 存储当前要显示的那个元素li的索引
    $lis.eq(n).css({
        transform: 'translateY(0)',
        opacity: 1
    });
    n = 1;
    let moveTimer = null;

    function move() {
        moveTimer = setInterval(function () {
            if (n === $lis.length) {
                clearInterval(moveTimer);
                return;
            }

            $lis.eq(n).css({
                transform: 'translateY(0)',
                opacity: 1
            });
            if (n >= 3) {
                h += $lis[n].clientHeight;
                $ul.css({
                    transform: `translateY(-${h}px)`
                })
            }
            if (n === 2) {
                $keyboard.css({
                    transform: 'translateY(0)'
                });
                clearInterval(moveTimer);
                setTimeout(function () {
                    inputWord();
                }, 1600);
                //让字 一个个蹦出来
            }
            n++;
        }, 2000);
    }

    move();


    function inputWord() {
        //让字体一个个蹦出来
        let str = $lis[n].innerText; //要显示的全部内容；
        let str2 = '';// 当前要显示的 字体内容；
        let timer2 = null;
        let index = 0; //控制当前 要出来的那个字
        // 让字体出现完成后 才出现按钮；
        timer2 = setInterval(function () {
            if (index === str.length) {
                clearInterval(timer2);
                $btn.show();// 让 按钮显示
                $btn.tap(function () {
                    $textBox.html('');
                    $btn.hide();
                    $lis.eq(n).css({
                        opacity: 1,
                        transform: 'translateY(0)',
                    });
                    h += $lis[n].clientHeight;
                    $ul.css({
                        transform: `translateY(-${h}px)`
                    });
                    n++;
                    $keyboard.css({
                        transform: 'translateY(7rem)',
                    });
                    move();
                }); //点击按钮要 做的 1清空 textbox  2让键盘下去  3 对话框接着弹；
                return;
            }
            str2 += str[index];
            $textBox.html(str2);
            index++;
        }, 200)
    }

    /* $lis.each(function (index,item) {
         setTimeout(function () {
             $(item).css({
                 opacity:1,
                 transform:'translateY(0)'
             });
             if(index >= 3){
                 h += item.clientHeight;
                 $ul.css({
                     transform:`translateY(-${h}px)`
                 })
             }
             if(index === 2){

             }
         },index*2000)
     })*/
};
