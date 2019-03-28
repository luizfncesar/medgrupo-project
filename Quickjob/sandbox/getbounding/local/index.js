setInterval(positionBoundingBox, 100);

var $ = function $(el) {
	return document.querySelectorAll(el);
};
var main = $(".main")[0];
var copyCat = $(".copy")[0];

var copyAttr = function copyAttr(sourceEl, destEl, name) {
	return destEl.style[name] = sourceEl.getBoundingClientRect()[name] + "px";
};

function positionBoundingBox() {
	copyAttr(main, copyCat, "top");
	copyAttr(main, copyCat, "left");
	copyAttr(main, copyCat, "width");
	copyAttr(main, copyCat, "height");
}

/*# sourceMappingURL=index.js.map */