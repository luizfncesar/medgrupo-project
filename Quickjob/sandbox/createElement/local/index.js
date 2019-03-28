/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

function setAttr(domNode, name, value) {
	name = name === "className" ? "class" : name;

	if (value != null && value !== "") {
		if (typeof value === "boolean") {
			if (value === false) {
				domNode.removeAttribute(name);
			} else {
				domNode.setAttribute(name, "");
			}
		} else {
			domNode.setAttribute(name, value);
		}
	}
}

var setAttrs = function setAttrs(domNode, attrs) {
  return Object.keys(attrs).forEach(function (name) {
    return setAttr(domNode, name, attrs[name]);
  });
};

function createElement(type, attrs) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	if (type == null) {
		return "";
	}

	var domNode = document.createElement(type);

	attrs = attrs == null ? {} : attrs;
	children = children == null ? [] : children;
	setAttrs(domNode, attrs);

	children.map(function (child) {
		return isString(child) ? document.createTextNode(child) : child;
	}).forEach(function (child) {
		return domNode.appendChild(child);
	});

	return domNode;
}

var _parseBemEntityWithFunc = function _parseBemEntityWithFunc(func) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return Object.keys(args[0]).forEach(func.apply(undefined, args));
};

var addClass = function addClass(domNode, str) {
  return domNode.classList.add(str);
};

var removeClass = function removeClass(domNode, str) {
  return domNode.classList.remove(str);
};

var _hasNoModifiers = function _hasNoModifiers(modifierObj) {
  return Object.keys(modifierObj).length === 0;
};

var _hasAllModifiersSetToFalse = function _hasAllModifiersSetToFalse(modifierObj) {
  return Object.keys(modifierObj).every(function (key) {
    return modifierObj[key] === false;
  });
};

function removeClassesStartingWithButNot(domNode, str) {
	for (var i = domNode.classList.length - 1; i >= 0; i--) {
		var currentClass = domNode.classList.item(i);

		if (currentClass !== str && currentClass.startsWith(str)) {
			removeClass(domNode, currentClass);
		}
	}
	return domNode;
}

var _joinBemEntityWithDelimiter = function _joinBemEntityWithDelimiter(entity, delimiter) {
  return entity != null && entity !== "" && typeof entity !== "boolean" ? "" + delimiter + entity : "";
};

function _formatBemModifier(modifier, value, delimiterArr) {
	var modifierDelimiter = delimiterArr[1],
	    modifierBase = _joinBemEntityWithDelimiter(modifier, modifierDelimiter);

	var valueDelimiter = delimiterArr[2],
	    valueBase = _joinBemEntityWithDelimiter(value, valueDelimiter);

	return value === true ? modifierBase : value !== false && value != null ? "" + modifierBase + valueBase : "";
}

function formatBemClassFromRadical(radical, modifier, value, delimiterArr) {
	var classModifier = _formatBemModifier(modifier, value, delimiterArr);
	return "" + radical + classModifier;
}

function _parseModifierProp(modifierObj, domNode, radical, delimiterArr) {
	return function (modifier) {
		var value = modifierObj[modifier],
		    removedBemClass = formatBemClassFromRadical(radical, modifier, true, delimiterArr),
		    addedBemClass = formatBemClassFromRadical(radical, modifier, value, delimiterArr);

		if (value === false) {
			removeClass(domNode, removedBemClass);
		} else if (value !== true) {
			removeClassesStartingWithButNot(domNode, removedBemClass);
		}

		if (value !== false) {
			addClass(domNode, addedBemClass);
		}
	};
}

var _parseModifier = function _parseModifier() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _parseBemEntityWithFunc.apply(undefined, [_parseModifierProp].concat(args));
};

function _parseBemProp(bemObj, domNode, delimiterArr, shouldRepeatBemRadical) {
	return function (radical) {
		var modifierObj = bemObj[radical];

		if (shouldRepeatBemRadical || _hasNoModifiers(modifierObj) || _hasAllModifiersSetToFalse(modifierObj)) {
			addClass(domNode, radical);
		} else {
			removeClass(domNode, radical);
		}

		_parseModifier(modifierObj, domNode, radical, delimiterArr);
	};
}

var _parseBem = function _parseBem() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _parseBemEntityWithFunc.apply(undefined, [_parseBemProp].concat(args));
};

var modifyBemClass = function modifyBemClass(domNode, bemObj, delimiterArr) {
  return _parseBem(bemObj, domNode, delimiterArr, true);
};

function _formatBemRadical(block, element, delimiterArr) {
	var elementDelimiter = delimiterArr[0],
	    elementBase = _joinBemEntityWithDelimiter(element, elementDelimiter);

	return "" + block + elementBase;
}

function formatBemClass(block, element, modifier, value, delimiterArr) {
	var radical = _formatBemRadical(block, element, delimiterArr);
	return formatBemClassFromRadical(radical, modifier, value, delimiterArr);
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Representa um temporizador, envolvendo setTimeout numa Promise.
 * 
 * @class
 */
var Timer = function () {
	function Timer() {
		_classCallCheck(this, Timer);
	}

	_createClass(Timer, [{
		key: "start",


		// controller

		/**
   * Inicia o temporizador e retorna uma Promise no final.
   * 
   * @instance
   * @memberOf Timer
   * @param {number} delay Tempo em milisegundos.
   * @return {Promise}
   *
   * @example
   * // Faz algo depois de um segundo.
   * var esperaUmSegundo = new Timer.start(1000);
   * esperaUmSegundo.then(fazAlgo);
   */
		value: function start(delay) {
			var _this = this;

			this.stop();

			if (delay != null && delay > 0) {
				return new Promise(function (resolve) {
					_this.timeout = setTimeout(function () {
						return resolve();
					}, delay);
				});
			}

			return Promise.resolve();
		}

		/**
   * Interrompe o temporizador caso esteja em andamento.
   * 
   * @instance
   * @memberOf Timer
   *
   * @example
   * // Interrompido antes de executar o then.
   * var esperaUmSegundo = new Timer.start(1000);
   * esperaUmSegundo.then(fazAlgo);
   * esperaUmSegundo.stop();
   */

	}, {
		key: "stop",
		value: function stop() {
			if (this.hasOwnProperty("timeout")) {
				clearTimeout(this.timeout);
				delete this.timeout;
			}
		}
	}]);

	return Timer;
}();

var t = new Timer();
var m = new Timer();

m.start(3000).then(function () {
	console.log("o script não vai chegar aqui porque esse timer será interrompido");
});

t.start(2000).then(function () {
	console.log("mostra 2000");
	m.stop();
});

var elNode = createElement("div", {
	className: "elemento"
}, "laser");

console.log(elNode);

var hfNode = createElement("div", {
	className: "elemento"
}, createElement("a", {
	href: "#laser",
	"className": "elemento__a"
}, "palavra"), " ", createElement("span", {
	className: "elemento__span"
}, "mista"));

console.log(hfNode);

var testeJsx = createElement(
	"div",
	{ className: "laser" },
	createElement(
		"span",
		null,
		"1 2 3 Testando"
	)
);

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

var delimiterArr = ["__", "--", "-"];

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

/*# sourceMappingURL=index.js.map */