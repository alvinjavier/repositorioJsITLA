//3. Escribe un programa de dos líneas que pida el nombre del usuario con un *prompt* y escriba un texto que diga “Hola nombreUsuario”.

const ps = require("prompt-sync");
const prompt = ps();
let userName = prompt("Cual es tu nombre? ");
console.log("Hola nombreUsuario " + userName);
