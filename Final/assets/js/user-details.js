function getParam(param) {
  const parametro = new URLSearchParams(location.search);
  return parametro.get(param);
}

function callAPI(url, method, data) {
  let configuracion = {};
  const header = {
    "Content-Type": "application/json",
  };

  if (method === "GET") {
    configuracion = {
      method: method,
      headers: header,
    };
  } else {
    configuracion = {
      method: method,
      body: JSON.stringify(data),
      headers: header,
    };
  }

  return fetch(url, configuracion).then((response) => {
    return response.json();
  });
}

window.addEventListener("load", (e) => {
  const id = getParam("id");
  console.log(id);
  const url = `http://localhost:3000/user/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((user) => {
      const elementoListado = document.querySelector(".tbody");

      const line = document.createElement("tr");
      const id = document.createElement("th");
      const name = document.createElement("td");
      const nameLink = document.createElement("a");
      nameLink.href = `/usuarios/detalles?id=${user.id}`;
      const username = document.createElement("td");
      const password = document.createElement("td");
      const createdAt = document.createElement("td");

      const btnContainer = document.createElement("td");

      const btnHolder = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnEdit = document.createElement("button");

      id.textContent = user.id;
      nameLink.textContent = user.name;
      username.textContent = user.username;
      password.textContent = user.password;

      createdAt.textContent = user.createdAt;
      btnDelete.textContent = "Delete";
      btnEdit.textContent = "Edit";

      btnHolder.setAttribute("class", "btn-group");
      btnHolder.setAttribute("role", "group");
      btnContainer.appendChild(btnHolder);

      btnDelete.setAttribute("type", "button");
      btnDelete.setAttribute("class", "btn btn-danger");
      btnEdit.setAttribute("type", "button");
      btnEdit.setAttribute("class", "btn btn-warning");

      btnHolder.appendChild(btnDelete);
      btnHolder.appendChild(btnEdit);

      addEventDeleteUser(btnDelete, user);
      addEventEditUser(btnEdit, user);

      line.appendChild(id);
      line.appendChild(name);
      name.appendChild(nameLink);
      line.appendChild(username);
      line.appendChild(password);
      line.appendChild(createdAt);
      line.appendChild(btnContainer);

      elementoListado.appendChild(line);
    });
});

// BORRAR user
function addEventDeleteUser(button, user) {
  button.addEventListener("click", (event) => {
    if (confirm(`Desea borrar el user ${user.name}?`)) {
      callAPI(`http://localhost:3000/user/${user.id}`, "DELETE", {}).then(() =>
        window.location.replace("http://localhost:3200/usuarios")
      );
    }
  });
}

// EDIT USER
function addEventEditUser(button, user) {
  button.addEventListener("click", (event) => {
    activeFormEdit();
    fillForm(user);
  });
}

const editUserForm = document.querySelector(".form__edit-user");

function saveEditUser(event) {
  event.preventDefault();

  const inputs = event.target.elements;
  const user = {
    id: inputs["id"].value,
    name: inputs["name"].value,
    username: inputs["userName"].value,
    password: inputs["userPassword"].value,
    createdAt: inputs["userDate"].value,
  };

  callAPI(`http://localhost:3000/user/${user.id}`, "PUT", user).then(() => {
    location.reload();
  });
}

editUserForm.addEventListener("submit", saveEditUser);

function fillForm(user) {
  editUserForm.elements["id"].value = user.id;
  editUserForm.elements["name"].value = user.name;
  editUserForm.elements["userName"].value = user.username;
  editUserForm.elements["userPassword"].value = user.password;
  editUserForm.elements["userDate"].value = user.createdAt;
}
function clearFormEdit(inputs) {
  inputs["id"].value = "";
  inputs["userName"].value = "";
  inputs["userName"].value = "";
  inputs["userPassword"].value = "";
  inputs["userDate"].value = "";
}
function activeFormEdit() {
  document.querySelector(".form-edit").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
}
function inactiveFormEdit() {
  document.querySelector(".form-edit").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
}
let overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
  inactiveFormEdit();
  inactiveFormCreate();
});
