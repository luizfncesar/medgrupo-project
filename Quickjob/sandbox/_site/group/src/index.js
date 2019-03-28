import lojas from "../lojas";
import groupByRecursive from "../../../common/js/groupByRecursive";

const byMarca = item => item.marca;
const byEstado = item => item.estado;
const byCidade = item => item.cidade;
const byBairro = item => item.bairro;

console.log(groupByRecursive(lojas, byMarca, byEstado, byCidade));

const greaterThanOneHundred = num => (num > 100) ? "big" : "small";
const evenOrOdd = num => (num % 2) === 0 ? "even" : "odd";

console.log(groupByRecursive([38, 46, 79, 103, 129, 187, 190], greaterThanOneHundred, evenOrOdd));




// Usage example:

/*
const stores = [{
	state: "RJ",
	city: "Rio de Janeiro",
	type: "Electronics"
},{
	state: "RJ",
	city: "Rio de Janeiro",
	type: "Apparel"
}, {
	state: "SP",
	city: "São Paulo",
	type: "Apparel"
}, {
	state: "SP",
	city: "São Paulo",
	type: "Electronics"
}, {
	state: "SP",
	city: "Osasco",
	type: "Apparel"
}];

const byState = item => item.state;
const byCity = item => item.city;
const byType = item => item.type;

groupByRecursive(stores, byState);
groupByRecursive(stores, byState, byCity);
groupByRecursive(stores, byState, byCity, byType);
groupByRecursive(stores, byType, byState, byCity);
*/
