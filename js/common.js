function getPageArray() {
    var pageArray = JSON.parse(localStorage.getItem("page"));
    return pageArray == null ? [] : pageArray;
}