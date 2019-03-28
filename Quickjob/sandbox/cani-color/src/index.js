import random from "lodash-es/random";
import padStart from "lodash-es/padStart";
import at from "lodash-es/at";
import listen from "canivete/dist/listen";
import createElement from "../../../common/js/createElement";


// generic convertions and validations

const hexaToDecimal = hexaStr => parseInt(hexaStr.toLowerCase(), 16);

const decimalToHexa = num => num.toString(16).toLowerCase();

const isValidPercent = percent => Number.isFinite(percent) && percent >= 0 && percent <= 1;


// generic string

function sliceEvery(str, num, memo = []) {
	if (str === "") {
		return memo;
	}
	return sliceEvery(
		str.slice(num),
		num,
		memo.concat([str.slice(0, num)])
	);
}


// dealing with ranges of numeric values

const getRangeDelta = range => range.end - range.start;

const getRangeStart = (delta, center) => Math.round(center - (delta / 2));

const getRangeEnd = (delta, center) => Math.round(center + (delta / 2));

function moveFractionRight(fraction, range) {
	fraction.end = fraction.end + (range.start - fraction.start);
	fraction.start = range.start;
	return fraction;
}

function moveFractionLeft(fraction, range) {
	fraction.start = fraction.start + (range.end - fraction.end);
	fraction.end = range.end;
	return fraction;
}

function getRangeFraction(range, center, percent) {
	let fractionDelta = getRangeDelta(range) * percent,
		fractionStart = getRangeStart(fractionDelta, center),
		fractionEnd = getRangeEnd(fractionDelta, center);

	let fraction = {
		start: fractionStart,
		end: fractionEnd
	};

	if (fraction.start < range.start) {
		fraction = moveFractionRight(fraction, range);
	}
	else if (fraction.end > range.end) {
		fraction = moveFractionLeft(fraction, range);
	}

	return fraction;
};


// dealing with color

const isHexaColor = color => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);

const isFullHexaColor = color => /^#(?:[0-9a-fA-F]{6})$/.test(color);

const isShorthandHexaColor = color => /^#(?:[0-9a-fA-F]{3})$/.test(color);

const inflateHexaColor = color => isShorthandHexaColor(color) ? `#${sliceEvery(color.slice(1), 1).map(str => `${str}${str}`).join("")}` : color;

function hexaToRGBColor(color) {
	color = inflateHexaColor(color).slice(1);
	return sliceEvery(color, color.length / 3).map(hexaToDecimal);
}

function RGBToHexaColor(color) {
	return `#${color.map(num => padStart(decimalToHexa(num), 2, "0")).join("")}`;
}


// radomizing color

function getRandomColorComponent(proximity = 0, percent = 1, start = 0, end = 255) {
	let range = getRangeFraction({
		start,
		end
	}, proximity, percent);

	return random(range.start, range.end);
}

function validateGetRandomColor(...args) {
	if (!isHexaColor(args[0])) {
		throw new Error("If passed, the first parameter should be a valid hexadecimal RGB color starting with #.");
	}

	if (!isValidPercent(args[1])) {
		throw new Error("If passed, the second parameter should be a number between 0 and 1 inclusive.");
	}
}

function getRandomColor(proximity = "#000000", percent = 1) {
	validateGetRandomColor(proximity, percent);

	let proximityRGB = hexaToRGBColor(proximity);

	return RGBToHexaColor([
		getRandomColorComponent(proximityRGB[0], percent),
		getRandomColorComponent(proximityRGB[1], percent),
		getRandomColorComponent(proximityRGB[2], percent)
	]);
}


// the app itself

function randomCard(options) {
	let backgroundColor = getRandomColor(
		at(options, "background.proximity")[0], 
		at(options, "background.percent")[0]
	);

	let foregroundColor = getRandomColor(
		at(options, "foreground.proximity")[0],
		at(options, "foreground.percent")[0]
	);

	return createElement("div", {
		"class": `background`,
		"style": `background-color: ${backgroundColor};`,
		"data-color": backgroundColor
	}, createElement("span", {
		"class": `foreground`,
		"style": `color: ${foregroundColor};`,
		"data-color": foregroundColor
	}, "canivete"));
}

function outputRandomCards(options = {}, num = 10) {
	for(let i = 0; i < num; i++) {
		document.body.appendChild(randomCard(options));
	}
}

outputRandomCards();
