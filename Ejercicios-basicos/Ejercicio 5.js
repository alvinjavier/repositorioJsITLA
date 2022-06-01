//5. Escribe un programa que pida dos números y escriba en la pantalla cual es el mayor.
const ps = require("prompt-sync");
const prompt = ps();
let primerNum = parseInt(prompt("Primer Numero? "));
let segundoNum = parseInt(prompt("Segundo Numero? "));
if (primerNum > segundoNum) {
  console.log(primerNum + " es mayor que " + segundoNum);
} else if (segundoNum > primerNum) {
  console.log(segundoNum + " es mayor que " + primerNum);
} else {
  console.log("Ambos numeros son iguales");
}
