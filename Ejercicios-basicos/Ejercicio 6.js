//6. Escribe un programa que pida 3 números y escriba en la pantalla el mayor de los tres.
const ps = require("prompt-sync");
const prompt = ps();
let primerNum = parseInt(prompt("Primer Numero?"));
let segundoNum = parseInt(prompt("Segundo Numero?"));
let tercerNum = parseInt(prompt("Tercer Numero?"));

if (primerNum > segundoNum && primerNum > tercerNum) {
  console.log(primerNum + " es mayor que " + segundoNum + " y " + tercerNum);
} else if (segundoNum > primerNum && segundoNum > tercerNum) {
  console.log(segundoNum + " es mayor que " + primerNum + " y " + tercerNum);
} else if (tercerNum > primerNum && tercerNum > segundoNum) {
  console.log(tercerNum + " es mayor que " + primerNum + " y " + segundoNum);
} else if (primerNum > segundoNum && primerNum == tercerNum) {
  console.log(
    primerNum + " y " + tercerNum + " son iguales y mayor que " + segundoNum
  );
} else if (segundoNum > primerNum && segundoNum == tercerNum) {
  console.log(
    segundoNum + " y " + tercerNum + " son iguales y mayor que " + primerNum
  );
} else if (primerNum > tercerNum && primerNum == segundoNum) {
  console.log(
    primerNum + " y " + segundoNum + " son iguales y mayor que " + tercerNum
  );
} else {
  console.log("Todos son iguales - " + primerNum);
}
