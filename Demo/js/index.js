/**
 * Created by fierayan on 2014/11/13.
 */

// 切换方向
function checkDirect(largestPageNumber){
    if ($(window).height()<$(window).width()) {

        //横屏
        $(".orientation-wrap").css("display","block");
        $(".swipe-up").css("display","none");
        $(".swipe-up").removeClass("swipeMove");
        return false;
    }
    else if ($(window).height()>$(window).width()) {

        //竖屏
        $(".swipe-up").css("display","block");
        $(".swipe-up").addClass("swipeMove");
        if(pageNumber===largestPageNumber){
            $(".swipe-up").css("display","none");
            $(".swipe-up").removeClass("swipeMove");
        }
        $(".orientation-wrap").css("display","none");
        return false;
    }
}

// 切换屏幕
// 上一屏
function screenBack(largestPageNumber) {

    $(".swipe-up").css("opacity","0");
    $(".swipe-up").removeClass("swipeMove");

    setTimeout(function(){
        $(".swipe-up").css("opacity","1");
        $(".swipe-up").addClass("swipeMove");
    },1000);

    if(pageNumber===largestPageNumber){
        $(".swipe-up").css("display","block");
        $(".swipe-up").addClass("swipeMove");
    }

    var translateString, transitionString;

    pageNumber--;

    if (pageNumber < 0) {
        pageNumber = 0;
    }

    currentDistance = screenHeight * pageNumber;
    translateString = "translate3d(0, -" + currentDistance + "px, 0)";
    transitionString = "all 0.5s ease-in";

    contentList.css({
        "-webkit-transform": translateString,
        "transform": translateString,
        "-webkit-transition": transitionString,
        "transition": transitionString
    });
}

// 下一屏
function screenForward(largestPageNumber) {

    $(".swipe-up").css("opacity","0");
    $(".swipe-up").removeClass("swipeMove");

    setTimeout(function(){
        $(".swipe-up").css("opacity","1");
        $(".swipe-up").addClass("swipeMove");
    },1000);

    var translateString, transitionString;

    pageNumber++;

    if (pageNumber > largestPageNumber) {
        pageNumber = largestPageNumber;
    }

    if(pageNumber===largestPageNumber){
        $(".swipe-up").css("display","none");
        $(".swipe-up").removeClass("swipeMove");
    }

    currentDistance = screenHeight * pageNumber;
    translateString = "translate3d(0, -" + currentDistance + "px, 0)";
    transitionString = "all 0.5s ease-in";

    contentList.css({
        "-webkit-transform": translateString,
        "transform": translateString,
        "-webkit-transition": transitionString,
        "transition": transitionString
    });
}

// 触摸事件

function startTouch(event) {
    if (!event.touches.length) {
        return;
    }
    tmpEndY = 0;
    tmpEndX = 0;
    var touch = event.touches[0];
    tmpStartY = touch.pageY;
    tmpStartX = touch.pageX;
}

function moveTouch(event) {
    event.preventDefault();
    if (!event.touches.length) {
        return;
    }
    var touch = event.touches[0];
    tmpEndY = touch.pageY;
    tmpEndX = touch.pageX;
}

// 触摸结束时判断执行上翻或者下翻
function endTouch() {
    var endY = tmpEndY,
        startY = tmpStartY,
        endX = tmpEndX,
        startX = tmpStartX;
    if (endY && endY !== startY && endY - startY <= -25) {
        screenForward(2);
    } else if (endY && endY !== startY && endY - startY >= 25) {
        screenBack(2);
    }
}

// 预加载图片

function preImg(ele) {
    var img_src = $(ele).css("background-image");
    img_src = img_src.split("(")[1].split(")")[0];
    var preImg = new Image();
    preImg.src = img_src;
    return preImg;
}

// 正式开始

// 定义变量
var screenHeight = $(window).height();
var pageNumber = 0;
var currentDistance = 0;
var verticalList = $(".content-list_v");
var tmpEndX, tmpStartX, tmpEndY, tmpStartY;


// 判断是否安卓

var sUserAgent = navigator.userAgent.toLowerCase();
var bIsAndroid = sUserAgent.match(/android/i) == "android";

// 判断是否短屏手机
var isShort;
if ($(window).height() <= 416) {
    isShort = true;
}


// 屏幕resize
$(window).on("resize", function () {

    checkDirect(2);
    screenHeight = $(window).height();
    // 每一页高度自适应
    $(".content-li").each(function () {
        $(this).css("height", screenHeight);
    });
});

// 部分安卓机型初始载入时会错误判断屏幕高度,需要手动resize
setTimeout(function () {
    $(window).resize();
}, 1000);

if(isShort){
    $(".p0").css("margin-top","-210px");
    $(".p3__video-btn").css("top","220px");
    $(".p3__text").css("top","280px");
}

// 视差初始化
if (!bIsAndroid) {
    $(".single-1__scene").parallax({
        relativeInput: false,
        clipRelativeInput: false,
        calibrateX: true,
        calibrateY: true,
        invertX: true,
        invertY: true,
        scalarX: 5,
        scalarY: 5
    });
    $(".single-2__scene").parallax({
        relativeInput: false,
        clipRelativeInput: false,
        calibrateX: true,
        calibrateY: true,
        invertX: true,
        invertY: true,
        scalarX: 5,
        scalarY: 5
    });
    $(".p1__scene").parallax({
        relativeInput: false,
        clipRelativeInput: false,
        calibrateX: true,
        calibrateY: true,
        invertX: true,
        invertY: true,
        scalarX: 5,
        scalarY: 5
    });
}

// 绑定滑动翻页
verticalList.on("touchstart", function (e) {
    startTouch(e);
    return false;
});
verticalList.on("touchmove", function (e) {
    moveTouch(e);
    return false;
});
verticalList.on("touchend", function (e) {
    endTouch(e);
    return false;
});

// 显示分享浮层
$(".btn-share").on("tap", function () {
    $(".speaker").css("display", "none");
    $(".share-mask").css({
        "display": "block",
        "-webkit-transition": "display 0.3s ease-in",
        "transition": "display 0.3s ease-in"
    });
    setTimeout(function () {
        $(".share-mask").css("display", "none");
        $(".speaker").css("display", "block");
    }, 1500);
});

// 控制声音
$(".speaker-wrap").on("click", function () {
    var audioEle = document.querySelector("audio");
    if (audioEle.paused) {
        $(".speaker").removeClass("speaker_muted");
        audioEle.play();
    } else {
        $(".speaker").addClass("speaker_muted");
        audioEle.pause();
    }
});

// 监听屏幕转方向事件,支持 orientationchange 或者 resize
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect(2), false);


