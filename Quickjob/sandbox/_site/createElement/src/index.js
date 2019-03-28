import createElement from "../../../common/js/createElement";
import modifyBemClass from "../../../common/js/modifyBemClass";
import modifyBemClassCompact from "../../../common/js/modifyBemClassCompact";
import formatBemClass from "../../../common/js/formatBemClass";
import Timer from "../../../common/js/Timer";

var t = new Timer();
var m = new Timer();

m.start(3000).then(() => {
	console.log("o script não vai chegar aqui porque esse timer será interrompido");
});

t.start(2000).then(() => {
	console.log("mostra 2000");
	m.stop();
});

var elNode = createElement("div", {
	className: "elemento"
}, "laser");

console.log(elNode);

var hfNode = createElement("div", {
		className: "elemento"
	},
	createElement("a", {
		href: "#laser",
		"className": "elemento__a"
	}, "palavra"),
	" ",
	createElement("span", {
		className: "elemento__span"
	}, "mista")
);

console.log(hfNode);

let testeJsx = <div className="laser">
	<span>1 2 3 Testando</span>
</div>;

modifyBemClass(hfNode, {
	elemento: {
		level: 42
	},
	landing__button: {
		level: 42
	}
}, ["__", "--", "-"]);

document.body.appendChild(hfNode);
document.body.appendChild(testeJsx);

let delimiterArr = ["__", "--", "-"];

console.log(formatBemClass("", "", "", null, delimiterArr));
console.log(formatBemClass("", "", "", "42", delimiterArr));
console.log(formatBemClass("", "", "level", "42", delimiterArr));
console.log(formatBemClass("front", "", "level", "42", delimiterArr));
console.log(formatBemClass("front", "", "level", true, delimiterArr));
console.log(formatBemClass("", "teste", "level", true, delimiterArr));
console.log(formatBemClass("front", "", "level", false, delimiterArr));
console.log(formatBemClass("", "teste", "level", false, delimiterArr));
console.log(formatBemClass("front", "teste", "level", true, delimiterArr));
console.log(formatBemClass("front", "teste", "level", false, delimiterArr));
console.log(formatBemClass("front", "teste", "level", null, delimiterArr));
console.log(formatBemClass("front", "teste", "level", 42, delimiterArr));
console.log(formatBemClass("front", "teste", null, "42", delimiterArr));
