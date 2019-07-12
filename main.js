function my$(id) {
    return document.getElementById(id);
};


let $picWidth = $('#banner').width()//获取图片宽度
let $picNum = $('#bannerPic').children('li')//获取最初的banner的个数
let $ulObj = $('#bannerPic')

//克隆第一个banner图放在最后，克隆最后一张banner到最前面
let firstBannerPic = $picNum.eq(0).clone(true).appendTo($ulObj)
let $lists = $('#bannerPic>li')//获取克隆后banner的个数

//循环point注册点击事件
let $points = $('#point>li')
for (let i = 0; i < $points.length; i++) {
    $points.eq(i).on('click', () => {
        $('#bannerPic').css({ transform: 'translateX(' + i * (-$picWidth) + 'px)' })
    })
}

//右侧焦点切换
let current = 0 //添加索引

$('#right').on('click', clickHandle)
function clickHandle () {
    if (current === $lists.length - 1) {
        current = 0;
        $('#bannerPic').hide()
        .offset()
        $('#bannerPic').css({ transform: 'translateX(' + 0 + 'px)' })
        .show()
    }
    current++
    $('#bannerPic').css({ transform: 'translateX(' + (-current) * ($picWidth) + 'px)' })
}
//当用户点击最后一张banner切换时看到的第一张banner其实可第一张banner的克隆
//当索引为5即看到最后一张banner时，current=5立即跳进if，隐藏bannerPic同时offset重新设置其位置

//自动轮播
let timeId=setInterval(clickHandle,5000)

//鼠标进入离开
$('#box').mouseenter(() => {
    clearInterval(timeId)
    $('#focus').addClass('active')
    $('#focus').removeClass('miss')
})
$('#box').mouseleave(() => {
    timeId=setInterval(clickHandle,5000)
    $('#focus').addClass('miss')
    $('#focus').removeClass('active')
    
})

//左边焦点切换
$('#left').on('click',() => {
    if(current===0){
        current=$lists.length-1
        $('#bannerPic').hide()
        .offset()
        $('#bannerPic').css({ transform: 'translateX(' + (-current) * ($picWidth) + 'px)' })
        .show()
    }
    current--
    $('#bannerPic').css({ transform: 'translateX(' + (-current) * ($picWidth) + 'px)' })
})

