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

function waitInPromise(delay) {
	return function (arg) {
		var timer = new Timer();
		return timer.start(delay).then(function () {
			return arg;
		});
	};
}

var doubleAndShow = function doubleAndShow(value) {
	value = value * 2;
	console.log(value);
	return value;
};

Promise.resolve(150).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow).then(waitInPromise(1200)).then(doubleAndShow);

/*# sourceMappingURL=index.js.map */