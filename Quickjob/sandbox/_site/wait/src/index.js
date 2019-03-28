import waitInPromise from "../../../common/js/waitInPromise";

const doubleAndShow = value => {
	value = value * 2;
	console.log(value);
	return value;
};

Promise.resolve(150)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow)
	.then(waitInPromise(1200))
	.then(doubleAndShow);
