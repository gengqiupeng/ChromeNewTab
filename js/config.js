var pageArray = [];
initPages();

document.getElementById("button").addEventListener("click", saveInput);
document.getElementById("clear").addEventListener("click", clearAll);


function saveInput() {
    pageArray = [];
    $('.page').each(function (key, element) {
        if (element.value.length !== 0) {
            pageArray.push(element.value)
        }
    });
    console.log(pageArray);
    savePages(pageArray);
    initPages();
}

function savePages(pages) {
    chrome.storage.sync.set({pages: pages});
}

function clearAll() {
    var r = confirm("是否删除所有页面？删除后无法恢复!");
    if (r == true) {
        savePages([]);
        pageArray = [];
        initPages();
    }

}

function initPages() {
    chrome.storage.sync.get('pages', function (data) {
        if (data.pages instanceof Array) {
            pageArray = data.pages
        }
        initDom();
    });
}

function initDom() {
    var container = document.getElementById("pageContainer");
    var li = '';
    console.log(pageArray);
    console.log(pageArray.length);
    if (pageArray.length > 0) {
        pageArray.forEach(function (value) {
            li = li + "<li><input type='text' value='" + value + "' class='page'></li>";
        })
    }
    li = li + "<li><input type='text' class='page'></li>";
    container.innerHTML = li;
}