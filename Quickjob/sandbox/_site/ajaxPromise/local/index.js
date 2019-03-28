function _parseAjaxPromiseOptions(options) {
	var defaultOptions = {
		useCrossDomain: false,
		timeout: 10000
	};

	if (options == null || typeof options === "boolean") {
		var original = !!options;
		options = Object.assign({}, defaultOptions);
		options.useCrossDomain = original;
	} else {
		options = Object.assign({}, defaultOptions, options);
	}

	return options;
}

function _handleAjaxRequest(evt, request, resolve, reject, timer, isLegacy) {
	if (isLegacy || request.readyState === XMLHttpRequest.DONE) {
		clearTimeout(timer);

		if (isLegacy ? evt.type === "load" : request.status >= 200 && request.status < 400) {
			resolve(request.responseText);
		} else if (!isLegacy || evt.type === "error") {
			reject();
		}
	}
}

function _handleLegacyAjaxRequest(evt, request, resolve, reject, timer) {
	return _handleAjaxRequest(evt, request, resolve, reject, timer, true);
}

function _handleDefaultAjaxRequest(evt, request, resolve, reject, timer) {
	return _handleAjaxRequest(evt, request, resolve, reject, timer, false);
}

function _makeAjaxRequest(url, resolve, reject, options, isLegacy) {
	var request = isLegacy ? new window.XDomainRequest() : new XMLHttpRequest(),
	    timer = void 0;

	request.open("GET", url, true);

	if (isLegacy) {
		request.onload = function (evt) {
			return _handleLegacyAjaxRequest(evt, request, resolve, reject, timer);
		};
		request.onerror = function (evt) {
			return _handleLegacyAjaxRequest(evt, request, resolve, reject, timer);
		};
	} else {
		request.onreadystatechange = function (evt) {
			return _handleDefaultAjaxRequest(evt, request, resolve, reject, timer);
		};
	}

	setTimeout(function () {
		return request.send();
	}, 0);

	timer = setTimeout(function () {
		reject();
		request.abort();
	}, options.timeout);
}

function _makeLegacyAjaxRequest(url, resolve, reject, options) {
	_makeAjaxRequest(url, resolve, reject, options, true);
}

function _makeDefaultAjaxRequest(url, resolve, reject, options) {
	_makeAjaxRequest(url, resolve, reject, options, false);
}

function ajaxPromise(url, options) {
	options = _parseAjaxPromiseOptions(options);

	return new Promise(function (resolve, reject) {
		if (window.XDomainRequest && options.useCrossDomain) {
			_makeLegacyAjaxRequest(url, resolve, reject, options);
		} else {
			_makeDefaultAjaxRequest(url, resolve, reject, options);
		}
	});
}

function _getHtmlTagThatContains(html, tagName, str) {
	var regexStr = "<" + tagName + "[^>]*>((?:(?!<|" + str + ")[\\s\\S])*(?:<(?!\\/?" + tagName + ")[^>]*>(?:(?!<|" + str + ")[\\s\\S])*)*" + str + "[\\s\\S]*?)<\\/" + tagName + ">";
	var regex = new RegExp(regexStr, "gm");
	var match = regex.exec(html);
	return match != null ? match[0] : undefined;
}

function _getProductJsonFromProductInfo(html) {
	if (html != null) {
		var scriptTagStr = _getHtmlTagThatContains(html, "json", "detail");

		if (scriptTagStr != null) {
			var objectStr = scriptTagStr.match(/{[\s\S]+}/gm)[0];
			return JSON.parse(objectStr);
		}
	}
}

function _parseNirvanaResponse(url) {
	return function (html) {
		var productJson = _getProductJsonFromProductInfo(html);

		return new Promise(function (resolve, reject) {
			if (productJson) {
				resolve(productJson.detail);
			} else {
				reject();
			}
		});
	};
}

var scrapeNirvanaProduct = function scrapeNirvanaProduct(url, options) {
  return ajaxPromise(url, options).then(_parseNirvanaResponse(url));
};

ajaxPromise("http://hmlbf.ellus.com/productInfo/46I865_534", {
	useCrossDomain: true
}).then(function (data) {
	return console.log(data);
});

ajaxPromise("teste.txt").then(function (data) {
	return console.log(data);
});

scrapeNirvanaProduct("http://hmlbf.ellus.com/productInfo/46I865_534", {
	useCrossDomain: true
}).then(function (data) {
	return console.log(data);
});

/*# sourceMappingURL=index.js.map */