import Raffler from "../../../common/js/Raffler";

var valoresOriginais = [0, 2, 4, 6, 8];
var bingo = new Raffler(valoresOriginais);
console.log(valoresOriginais);
var itemSorteado = bingo.draw();
console.log(itemSorteado);
var outroItemSorteado = bingo.draw();
console.log(outroItemSorteado);
var itensRestantes = bingo.getAvailableItems();
console.log(itensRestantes);
var maisUmSorteado = bingo.draw();
console.log(maisUmSorteado);
itensRestantes = bingo.getAvailableItems();
console.log(itensRestantes);
console.log("devolve todo mundo");
bingo.putBack(itemSorteado);
bingo.putBack(outroItemSorteado);
bingo.putBack(maisUmSorteado);

itensRestantes = bingo.getAvailableItems();
console.log(itensRestantes);
