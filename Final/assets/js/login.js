const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
if (user !== null) {
  window.location.replace("http://localhost:3200");
}

const urlApi = "http://localhost:3000/user";

const login = document.querySelector(".form-login");

if (login) {
  login.addEventListener("submit", validarUsuario);
}

function validarUsuario(e) {
  e.preventDefault();
  const inputs = e.target.elements;

  const user = {
    name: inputs[0].value,
    password: inputs[1].value,
  };

  obtener(user, inputs);
}

async function obtener(user, inputs) {
  const response = await fetch(urlApi);

  const data = await response.json();

  const userAccepted = data.find(
    (data) => data.username === user.name && data.password === user.password
  );

  if (userAccepted) {
    console.log(userAccepted);
    localStorage.setItem("user", JSON.stringify(userAccepted));
    window.location.assign("http://localhost:3200");
  } else {
    alert("Usuario o Contraseña incorrectos", "danger");
    inputs[0].value = "";
    inputs[1].value = "";
  }
}

// callAPI("http://localhost:3100/interactions/1")
// .then( interactions => {

//     // guardar
//     localStorage.setItem("user", JSON.stringify(interactions.user))

//     // obtener
//     const user = JSON.parse(localStorage.getItem("user"))
//     console.log(user.id)

//     // borrar localStorage
//     localStorage.removeItem("");
// })
