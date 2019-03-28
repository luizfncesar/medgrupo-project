import ajaxPromise from "../../../common/js/ajaxPromise";
import scrapeNirvanaProduct from "../../../common/js/scrapeNirvanaProduct";

ajaxPromise("http://hmlbf.ellus.com/productInfo/46I865_534", {
		useCrossDomain: true
	})
	.then(data => console.log(data));

ajaxPromise("teste.txt")
	.then(data => console.log(data));

scrapeNirvanaProduct("http://hmlbf.ellus.com/productInfo/46I865_534", {
		useCrossDomain: true
	})
	.then(data => console.log(data));
