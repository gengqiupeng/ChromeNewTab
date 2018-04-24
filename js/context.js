chrome.contextMenus.create({
    type: "normal",
    title: "添加到新标签页背景",
    onclick: addImage,
    contexts: ['image']
})

function addImage(info, tab) {
    var pageArray = JSON.parse(localStorage.getItem("page"));
    pageArray = pageArray == null ? [] : pageArray;
    pageArray.push(info.srcUrl)
    var pages = JSON.stringify(pageArray);
    localStorage.setItem("page", pages);
}