var _splitEventStr = function _splitEventStr(eventStr) {
  return eventStr.split(" ");
};

var _reactToEvent = function _reactToEvent(methodName, eventStr, domNodes, callback, isCapture) {
	var eventTypes = _splitEventStr(eventStr),
	    domNodeArr = domNodes.length == null ? [domNodes] : Array.from(domNodes);

	eventTypes.forEach(function (eventType) {
		return domNodeArr.forEach(function (domNode) {
			return domNode[methodName](eventType, callback, isCapture);
		});
	});
};

var listen = function listen(eventStr, domNodes, callback) {
  var isCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return _reactToEvent("addEventListener", eventStr, domNodes, callback, isCapture);
};

var timeSince = function timeSince(timestamp) {
  return timestamp != null ? +new Date() - timestamp : undefined;
};

function parents(domNode) {
	var memo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var parentNode = domNode.parentNode;
	return !parentNode ? memo : parents(parentNode, memo.concat([parentNode]));
}

var selfAndParents = function selfAndParents(domNode) {
  return domNode != null ? [domNode].concat(parents(domNode)) : [];
};

function trigger(eventName, bubbles, target) {
	var event = void 0;

	if (window.CustomEvent != null) {
		event = document.createEvent('Event');
		event.initEvent(eventName, bubbles, true);
	} else {
		event = new CustomEvent(eventName, {
			bubbles: bubbles
		});
	}

	target.dispatchEvent(event);
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventNormalizer = function () {
	function EventNormalizer() {
		_classCallCheck(this, EventNormalizer);
	}

	_createClass(EventNormalizer, null, [{
		key: "_updateConfigured",
		value: function _updateConfigured(eventName) {
			EventNormalizer.memo.add(eventName);
		}
	}, {
		key: "_isConfigured",
		value: function _isConfigured(eventName) {
			return EventNormalizer.memo.has(eventName);
		}
	}, {
		key: "_doConfig",
		value: function _doConfig(eventName, condition) {
			return function (event) {
				if (condition(event)) {
					console.log(event);
					trigger(eventName, true, event.target);
				}
			};
		}
	}, {
		key: "config",
		value: function config(eventName, eventStr, condition) {
			if (!this._isConfigured(eventName)) {
				listen(eventStr, document, this._doConfig(eventName, condition));
			}
		}
	}]);

	return EventNormalizer;
}();

EventNormalizer.memo = new Set();
EventNormalizer.draggedElements = new WeakSet();
EventNormalizer.lastTouch = undefined;

var testNodes = document.getElementsByClassName("group--a");
console.log(testNodes);

listen("point tap enter leave ghostclick", testNodes, function (event) {
	console.log(event.type, event.target);
});

listen("pointoutside tapoutside", testNodes, function (event) {
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
	return EventNormalizer.lastTouch == null || timeSince(EventNormalizer.lastTouch) > 500;
}

function _hasTargetChanged(event) {
	var targetParents = selfAndParents(event.target),
	    relatedParents = selfAndParents(event.relatedTarget),
	    changedNodes = targetParents.filter(function (domNode) {
		return !relatedParents.includes(domNode);
	});

	return changedNodes.length > 0;
}

EventNormalizer.config("point", "touchend click", function (event) {
	_trackLastTouch(event);
	return event.type === "click" && _isMouse();
});

EventNormalizer.config("tap", "touchmove touchend", function (event) {
	_trackDragging(event);

	if (event.type === "touchend" && !_hasDragHappened()) {
		_ignoreDragging(event);
		return true;
	} else {
		_ignoreDragging(event);
	}
});

EventNormalizer.config("enter", "touchend mouseover", function (event) {
	_trackLastTouch(event);
	return event.type === "mouseover" && _isMouse() && _hasTargetChanged(event);
});

EventNormalizer.config("leave", "touchend mouseout", function (event) {
	_trackLastTouch(event);
	return event.type === "mouseout" && _isMouse() && _hasTargetChanged(event);
});

EventNormalizer.config("ghostclick", "touchend click", function (event) {
	_trackLastTouch(event);
	return event.type === "click" && !_isMouse();
});

EventNormalizer.config("pointoutside", "point", function (event) {
	return false;
});

EventNormalizer.config("tapoutside", "tap", function (event) {
	return false;
});

// done;

/*# sourceMappingURL=index.js.map */