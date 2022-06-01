//8. Escribir un programa que nos diga si un número dado es primo (no es divisible por ninguno otro número que no sea él mismo o la unidad).
const ps = require("prompt-sync");
const prompt = ps();

let num = parseInt(prompt("Numero? "));
if (num == 0 || num == 1 || num == 4) {
  console.log(num + " NO es primo");
} else {
  let esPrimo = 0;
  for (let x = 2; x < num / 2; x++) {
    if (num % x == 0) {
      console.log(num + " No es primo");
      esPrimo++;
      break;
    }
  }
  if (esPrimo == 0) {
    console.log(num + " es primo");
  }
}
