import listen from "../../../common/js/listen";
import ignore from "../../../common/js/ignore";
import timeSince from "../../../common/js/timeSince";
import selfAndParents from "../../../common/js/selfAndParents";
import trigger from "../../../common/js/trigger";

class EventNormalizer {
	static _updateConfigured(eventName) {
		EventNormalizer.memo.add(eventName);
	}

	static _isConfigured(eventName) {
		return EventNormalizer.memo.has(eventName);
	}

	static _doConfig(eventName, condition) {
		return function(event) {
			if (condition(event)) {
				console.log(event);
				trigger(eventName, true, event.target);
			}
		};
	}

	static config(eventName, eventStr, condition) {
		if (!this._isConfigured(eventName)) {
			listen(eventStr, document, this._doConfig(eventName, condition));
		}
	}
}

EventNormalizer.memo = new Set();
EventNormalizer.draggedElements = new WeakSet();
EventNormalizer.lastTouch = undefined;





let testNodes = document.getElementsByClassName("group--a");
console.log(testNodes);

listen("point tap enter leave ghostclick", testNodes, event => {
	console.log(event.type, event.target);
});

listen("pointoutside tapoutside", testNodes, event => {
	console.log(event.type, event.target);
});





function _trackLastTouch(event) {
	if (event.type === "touchend") {
		EventNormalizer.lastTouch = +new Date();
	}
}

function _trackDragging(event) {
	if (event.type === "touchmove") {
		EventNormalizer.draggedElements.add(event.target);
	}
}

function _hasDragHappened() {
	return EventNormalizer.draggedElements.has(event.target);
}

function _ignoreDragging(event) {
	if (event.type === "touchend") {
		EventNormalizer.draggedElements.delete(event.target);
	}
}

function _isMouse() {

	// considerar também posicionamento do mouse aqui.
	// se o último touch estiver numa área distante na tela,
	// não configura ghost click.
	// http://stackoverflow.com/a/37563695/5621432

	return EventNormalizer.lastTouch == null || timeSince(EventNormalizer.lastTouch) > 500;
}

function _hasTargetChanged(event) {
	let targetParents = selfAndParents(event.target),
		relatedParents = selfAndParents(event.relatedTarget),
		changedNodes = targetParents.filter(domNode => !relatedParents.includes(domNode));

	return changedNodes.length > 0;
}





EventNormalizer.config("point", "touchend click", event => {
	_trackLastTouch(event);
	return event.type === "click" && _isMouse();
});

EventNormalizer.config("tap", "touchmove touchend", event => {
	_trackDragging(event);

	if (event.type === "touchend" && !_hasDragHappened()) {
		_ignoreDragging(event);
		return true;
	}
	else {
		_ignoreDragging(event);
	}
});

EventNormalizer.config("enter", "touchend mouseover", event => {
	_trackLastTouch(event);
	return event.type === "mouseover" && _isMouse() && _hasTargetChanged(event);
});

EventNormalizer.config("leave", "touchend mouseout", event => {
	_trackLastTouch(event);
	return event.type === "mouseout" && _isMouse() && _hasTargetChanged(event);
});

EventNormalizer.config("ghostclick", "touchend click", event => {
	_trackLastTouch(event);
	return event.type === "click" && !_isMouse();
});

EventNormalizer.config("pointoutside", "point", event => {
	return false;
});

EventNormalizer.config("tapoutside", "tap", event => {
	return false;
});
















// done;
