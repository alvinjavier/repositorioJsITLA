const user = JSON.parse(localStorage.getItem("user"));
if (user == null) {
  window.location.replace("http://localhost:3200/login");
}

const btnCerrarSesion = document.querySelector("#cerrar-sesion");
btnCerrarSesion.addEventListener("click", cerrarSesion);
function cerrarSesion() {
  localStorage.removeItem("user");
  window.location.replace("http://localhost:3200/login");
}
