setInterval(positionBoundingBox, 100);

const $ = el => document.querySelectorAll(el);
const main = $(".main")[0];
const copyCat = $(".copy")[0];

const copyAttr = (sourceEl, destEl, name) => destEl.style[name] = sourceEl.getBoundingClientRect()[name] + "px";

function positionBoundingBox() {
	copyAttr(main, copyCat, "top");
	copyAttr(main, copyCat, "left");
	copyAttr(main, copyCat, "width");
	copyAttr(main, copyCat, "height");
}
