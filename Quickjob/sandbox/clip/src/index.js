const _getAxisStartProp = isHorizontal => isHorizontal ? "left" : "top";

const _getAxisEndProp = isHorizontal => isHorizontal ? "right" : "bottom";

function _getAxisInfo(domCoords, maskCoords, isHorizontal) {
	let startProp           = _getAxisStartProp(isHorizontal),
		endProp             = _getAxisEndProp(isHorizontal);

	let domStart            = domCoords[startProp],
		domEnd              = domCoords[endProp],
		maskStart           = maskCoords[startProp],
		maskEnd             = maskCoords[endProp];

	let startBeforeStart    = domStart <= maskStart,
		startBeforeStartExc = domStart < maskStart,
		startAfterStart     = domStart >= maskStart,
		startBeforeEnd      = domStart <= maskEnd,
		startAfterEnd       = domStart >= maskEnd;

	let endBeforeStart      = domEnd <= maskStart,
		endAfterStart       = domEnd >= maskStart,
		endBeforeEnd        = domEnd <= maskEnd,
		endAfterEnd         = domEnd >= maskEnd,
		endAfterEndExc      = domEnd > maskEnd;

	let isOffBefore         = startBeforeStart && endBeforeStart,
		isOffAfter          = startAfterEnd && endAfterEnd,
		isContained         = startAfterStart && endBeforeEnd,
		isContainer         = startBeforeStart && endAfterEnd,
		isClippedBefore     = startBeforeStartExc && endAfterStart,
		isClippedAfter      = startBeforeEnd && endAfterEndExc;

	return {
		isOffBefore,
		isOffAfter,
		isContained,
		isContainer,
		isClippedBefore,
		isClippedAfter
	};
}

const _getVerticalAxisInfo = (domCoords, maskCoords) => _getAxisInfo(domCoords, maskCoords, false);

const _getHorizontalAxisInfo = (domCoords, maskCoords) => _getAxisInfo(domCoords, maskCoords, true);

function clippingInfo(domEl, maskEl = document.body) {
	let domCoords  = domEl.getBoundingClientRect(),
		maskCoords = maskEl.getBoundingClientRect();

	let vertAxis   = _getVerticalAxisInfo(domCoords, maskCoords),
		horzAxis   = _getHorizontalAxisInfo(domCoords, maskCoords);

	let isOffTop                 = vertAxis.isOffBefore,
		isOffBottom              = vertAxis.isOffAfter,
		isOffLeft                = horzAxis.isOffBefore,
		isOffRight               = horzAxis.isOffAfter,
		isOff                    = isOffTop || isOffBottom || isOffLeft || isOffRight,
		isClippedTop             = !isOff && (vertAxis.isClippedBefore),
		isClippedBottom          = !isOff && (vertAxis.isClippedAfter),
		isClippedLeft            = !isOff && (horzAxis.isClippedBefore),
		isClippedRight           = !isOff && (horzAxis.isClippedAfter),
		isClipped                = isClippedTop || isClippedBottom || isClippedLeft || isClippedRight,
		isFullyVisible           = vertAxis.isContained && horzAxis.isContained,
		isInvisible              = isOff,
		isAsVisibleAsPossible    = isFullyVisible || (vertAxis.isContainer && horzAxis.isContainer) || (vertAxis.isContained && horzAxis.isContainer) || (vertAxis.isContainer && horzAxis.isContained),
		isNotAsVisibleAsPossible = isInvisible || !isAsVisibleAsPossible,
		isPartiallyVisible       = !isInvisible && !isFullyVisible;

	return {
		isOffTop,
		isOffBottom,
		isOffLeft,
		isOffRight,
		isOff,
		isClippedTop,
		isClippedBottom,
		isClippedLeft,
		isClippedRight,
		isClipped,
		isFullyVisible,
		isPartiallyVisible,
		isInvisible,
		isAsVisibleAsPossible,
		isNotAsVisibleAsPossible
	};
}





let childEl = document.querySelector(".child");
let parentEl = document.querySelector(".parent");

console.log(clippingInfo(childEl, parentEl));
