/**
 * Created by 耿秋鹏 on 2018/3/26.
 */

var pageArray = [];
initPages();

function getRandomInt() {
    var min = Math.ceil(0);
    var max = Math.floor(pageArray.length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomImage() {
    console.log(pageArray)
    var index = getRandomInt();
    if (index < 0) {
        return "http://tab.beiliji.online/TheLastOfUs/index.php"
    } else {
        return pageArray[index];
    }
}


function initPages() {
    pageArray = getPageArray();
    initBackGround()
}

function initBackGround() {
    $("html").css("background", "url(" + getRandomImage() + ")  no-repeat center fixed");
    $("html").css("background-size", "cover");
}