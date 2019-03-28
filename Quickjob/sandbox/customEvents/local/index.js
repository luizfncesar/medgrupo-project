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

var ignore = function ignore(eventStr, domNodes, callback) {
  var isCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return _reactToEvent("removeEventListener", eventStr, domNodes, callback, isCapture);
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventTimeTracker = function () {
	function EventTimeTracker() {
		_classCallCheck(this, EventTimeTracker);

		this.memo = {};
	}

	_createClass(EventTimeTracker, [{
		key: "_getLastOccurrenceOf",
		value: function _getLastOccurrenceOf(eventType) {
			return this.memo[eventType];
		}
	}, {
		key: "_setLastOccurrenceOf",
		value: function _setLastOccurrenceOf(event) {
			this.memo[event.type] = +new Date();
		}
	}, {
		key: "listen",
		value: function listen$$1(eventStr) {
			this.ignore(eventStr);
			listen(eventStr, document, this._setLastOccurrenceOf.bind(this), true);
		}
	}, {
		key: "ignore",
		value: function ignore$$1(eventStr) {
			ignore(eventStr, document, this._setLastOccurrenceOf.bind(this), true);
		}
	}, {
		key: "get",
		value: function get(eventStr) {
			var _this = this;

			var eventTimes = eventStr.split(" ").map(function (eventType) {
				return _this._getLastOccurrenceOf(eventType);
			}).filter(function (eventTime) {
				return eventTime != null;
			});

			if (eventTimes.length === 0) {
				return;
			}

			return Math.max.apply(Math, _toConsumableArray(eventTimes));
		}
	}, {
		key: "getLastOccurrence",
		value: function getLastOccurrence(eventStr) {
			return this.get(eventStr);
		}
	}]);

	return EventTimeTracker;
}();

var clickTracker = new EventTimeTracker();
clickTracker.listen("click focus");

setInterval(function () {
	console.log("last click: " + clickTracker.getLastOccurrence("click"));
}, 1000);

setInterval(function () {
	console.log("last focus: " + clickTracker.getLastOccurrence("focus"));
}, 2000);

setInterval(function () {
	console.log("last focus OR click: " + clickTracker.getLastOccurrence("click focus"));
}, 2000);

/*# sourceMappingURL=index.js.map */