var pageArray = [];
initPages();

document.getElementById("button").addEventListener("click", saveInput);
document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("export").addEventListener("click", exportConfig);
document.getElementById("import").addEventListener("click", importConfig);

function exportConfig() {
    var text = JSON.stringify(pageArray);
    var MIME_TYPE = 'text/plain';

    window.URL = window.webkitURL || window.URL;

    var bb = new Blob([text], {type: MIME_TYPE});

    var a = document.createElement('a');
    a.download = 'config.json';
    a.href = window.URL.createObjectURL(bb);
    a.textContent = 'Download ready';
    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    a.click();
}

function importConfig() {
    var file = $("#configFile")[0].files[0];
    var reader = new FileReader();

    //将文件以文本形式读入页面
    reader.readAsText(file);
    reader.onload = function (e) {
        var text = e.currentTarget.result;
        pageArray = JSON.parse(text);
        $('#fileModal').modal('hide');
        initDom();
        saveInput();
    }
}

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

function change(key) {
    alert(key)
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
    var div = '';
    console.log(pageArray);
    console.log(pageArray.length);
    if (pageArray.length > 0) {
        pageArray.forEach(function (value) {
            div = div + " <div class='col-xs-3 col-sm-3'>" +
                "<img class='thumbnail' src='" + value + "'>" +
                "<input  class='page form-control' value='" + value + "'>" +
                "</div>";
        })
    }
    div = div + " <div class='col-xs-3 col-sm-3'>" +
        "<img class='thumbnail add_more' src='../images/ic_add_white_24px.svg'>" +
        "<input  class='page form-control' value=''>" +
        "</div>";
    container.innerHTML = div;
}