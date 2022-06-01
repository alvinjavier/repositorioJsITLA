const express = require("express");
const app = express();

app.use(express.static("assets"));
app.use(express.static("node_modules"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/clientes", function (req, res) {
  res.sendFile(__dirname + "/views/clientes.html");
});

app.get("/clientes/detalles", function (req, res) {
  res.sendFile(__dirname + "/views/client-details.html");
});

app.get("/usuarios", function (req, res) {
  res.sendFile(__dirname + "/views/usuarios.html");
});

app.get("/usuarios/detalles", function (req, res) {
  res.sendFile(__dirname + "/views/user-details.html");
});

app.get("/interacciones", function (req, res) {
  res.sendFile(__dirname + "/views/interacciones.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.listen(3200);
console.log("Express esta corriendo en el puerto: 3200");
console.log("http://localhost:3200");
