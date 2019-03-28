var _getAxisStartProp = function _getAxisStartProp(isHorizontal) {
	return isHorizontal ? "left" : "top";
};

var _getAxisEndProp = function _getAxisEndProp(isHorizontal) {
	return isHorizontal ? "right" : "bottom";
};

function _getAxisInfo(domCoords, maskCoords, isHorizontal) {
	var startProp = _getAxisStartProp(isHorizontal),
	    endProp = _getAxisEndProp(isHorizontal);

	var domStart = domCoords[startProp],
	    domEnd = domCoords[endProp],
	    maskStart = maskCoords[startProp],
	    maskEnd = maskCoords[endProp];

	var startBeforeStart = domStart <= maskStart,
	    startBeforeStartExc = domStart < maskStart,
	    startAfterStart = domStart >= maskStart,
	    startBeforeEnd = domStart <= maskEnd,
	    startAfterEnd = domStart >= maskEnd;

	var endBeforeStart = domEnd <= maskStart,
	    endAfterStart = domEnd >= maskStart,
	    endBeforeEnd = domEnd <= maskEnd,
	    endAfterEnd = domEnd >= maskEnd,
	    endAfterEndExc = domEnd > maskEnd;

	var isOffBefore = startBeforeStart && endBeforeStart,
	    isOffAfter = startAfterEnd && endAfterEnd,
	    isContained = startAfterStart && endBeforeEnd,
	    isContainer = startBeforeStart && endAfterEnd,
	    isClippedBefore = startBeforeStartExc && endAfterStart,
	    isClippedAfter = startBeforeEnd && endAfterEndExc;

	return {
		isOffBefore: isOffBefore,
		isOffAfter: isOffAfter,
		isContained: isContained,
		isContainer: isContainer,
		isClippedBefore: isClippedBefore,
		isClippedAfter: isClippedAfter
	};
}

var _getVerticalAxisInfo = function _getVerticalAxisInfo(domCoords, maskCoords) {
	return _getAxisInfo(domCoords, maskCoords, false);
};

var _getHorizontalAxisInfo = function _getHorizontalAxisInfo(domCoords, maskCoords) {
	return _getAxisInfo(domCoords, maskCoords, true);
};

function clippingInfo(domEl) {
	var maskEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

	var domCoords = domEl.getBoundingClientRect(),
	    maskCoords = maskEl.getBoundingClientRect();

	var vertAxis = _getVerticalAxisInfo(domCoords, maskCoords),
	    horzAxis = _getHorizontalAxisInfo(domCoords, maskCoords);

	var isOffTop = vertAxis.isOffBefore,
	    isOffBottom = vertAxis.isOffAfter,
	    isOffLeft = horzAxis.isOffBefore,
	    isOffRight = horzAxis.isOffAfter,
	    isOff = isOffTop || isOffBottom || isOffLeft || isOffRight,
	    isClippedTop = !isOff && vertAxis.isClippedBefore,
	    isClippedBottom = !isOff && vertAxis.isClippedAfter,
	    isClippedLeft = !isOff && horzAxis.isClippedBefore,
	    isClippedRight = !isOff && horzAxis.isClippedAfter,
	    isClipped = isClippedTop || isClippedBottom || isClippedLeft || isClippedRight,
	    isFullyVisible = vertAxis.isContained && horzAxis.isContained,
	    isInvisible = isOff,
	    isAsVisibleAsPossible = isFullyVisible || vertAxis.isContainer && horzAxis.isContainer || vertAxis.isContained && horzAxis.isContainer || vertAxis.isContainer && horzAxis.isContained,
	    isNotAsVisibleAsPossible = isInvisible || !isAsVisibleAsPossible,
	    isPartiallyVisible = !isInvisible && !isFullyVisible;

	return {
		isOffTop: isOffTop,
		isOffBottom: isOffBottom,
		isOffLeft: isOffLeft,
		isOffRight: isOffRight,
		isOff: isOff,
		isClippedTop: isClippedTop,
		isClippedBottom: isClippedBottom,
		isClippedLeft: isClippedLeft,
		isClippedRight: isClippedRight,
		isClipped: isClipped,
		isFullyVisible: isFullyVisible,
		isPartiallyVisible: isPartiallyVisible,
		isInvisible: isInvisible,
		isAsVisibleAsPossible: isAsVisibleAsPossible,
		isNotAsVisibleAsPossible: isNotAsVisibleAsPossible
	};
}

var childEl = document.querySelector(".child");
var parentEl = document.querySelector(".parent");

console.log(clippingInfo(childEl, parentEl));

/*# sourceMappingURL=index.js.map */