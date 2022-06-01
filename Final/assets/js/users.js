const url = "http://localhost:3000/user";

function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
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

// CARGAR EN LA PANTALLA
window.addEventListener("load", getUsers);
function getUsers() {
  callAPI(url, "GET", {}).then((users) => {
    const elementoListado = document.querySelector(".tbody");

    users.forEach((user) => {
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
}

// BORRAR user
function addEventDeleteUser(button, user) {
  button.addEventListener("click", (event) => {
    if (confirm(`Desea borrar el user ${user.name}?`)) {
      callAPI(`${url}/${user.id}`, "DELETE", {}).then(() =>
        window.location.reload()
      );
    }
  });
}

// CREAR users
const userCreateForm = document.querySelector(".form__create-users");

function saveUser(event) {
  event.preventDefault();

  const inputs = event.target.elements;
  // DATE
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const user = {
    name: inputs["name"].value,
    username: inputs["userName"].value,
    password: inputs["userPassword"].value,
    createdAt: date,
  };

  const url = "http://localhost:3000/user";
  const header = {
    "Content-Type": "application/json",
  };
  const configuration = {
    method: "POST",
    body: JSON.stringify(user),
    headers: header,
  };

  fetch(url, configuration)
    .then((response) => {
      return response.json();
    })
    .then((user) => {});
  inactiveFormCreate();
  clearFormCreate(inputs);
  getUsers();
}

userCreateForm.addEventListener("submit", saveUser);

let newUser = document.querySelector(".new-user");
newUser.addEventListener("click", activeFormCreate);

function clearFormCreate(inputs) {
  inputs["name"].value = "";
  inputs["userName"].value = "";
  inputs["userPassword"].value = "";
}
function activeFormCreate() {
  document.querySelector(".form-create").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
}
function inactiveFormCreate() {
  document.querySelector(".form-create").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
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

  callAPI(`${url}/${user.id}`, "PUT", user).then(() => {
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
