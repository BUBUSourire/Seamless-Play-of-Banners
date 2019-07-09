let n
ini()//初始化,banner默认状态
let timeId = setTime()

//创建轮播
function setTime(){
    return setInterval(() => {
        makeLeave(getImage(n))
            .one('transitionend', (e) => {
                makeEnter($(e.currentTarget))
            })
        makeCurrent(getImage(n + 1))
        n += 1
    }, 3000)
}

//鼠标悬停离开
$('.banner').on('mouseenter', () => {
    window.clearInterval(timeId)
})
$('.banner').on('mouseleave', () => {
    timeId=setTime()
})



/*
=====封装=====
*/

//获取第n个image
function getImage(n) {
    return $(`.banner-inner>img:nth-child(${x(n)})`)
    //`.banner-inner>img:nth-child(n)`这里的n是字符串'n',不是数字
}

//固定n的值
function x(n) {
    if (n > 3) {
        n = n % 3
        if (n === 0) {
            n = 3
        }
    }//n=1 2 3
    return n
}

//初始化
function ini() {
    n = 1
    $(`.banner-inner>img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}

//封装状态
function makeCurrent($node) {
    $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node) {
    $node.removeClass('enter current').addClass('leave')
    return $node//链式操作，传入什么，返回什么，如果不加return，那makeCurrent的返回值是undefined
}
function makeEnter($node) {
    $node.removeClass('leave current').addClass('enter')
}
