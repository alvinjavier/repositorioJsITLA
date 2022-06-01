//3. Escribe un programa de dos líneas que pida el nombre del usuario con un *prompt* y escriba un texto que diga “Hola nombreUsuario”.
const ps = require("prompt-sync");
const prompt = ps();
let primerNum = parseInt(prompt("Primer Numero? "));
let segundoNum = parseInt(prompt("Segundo Numero? "));
console.log(primerNum + segundoNum);
