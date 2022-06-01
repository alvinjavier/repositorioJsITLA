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
  const url = `http://localhost:3000/costumer/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((cliente) => {
      const elementoListado = document.querySelector(".tbody");

      const line = document.createElement("tr");
      const id = document.createElement("th");
      const name = document.createElement("td");
      const nameLink = document.createElement("a");
      nameLink.href = `/clientes/detalles?id=${cliente.id}`;
      const email = document.createElement("td");
      const address = document.createElement("td");
      const createdAt = document.createElement("td");
      const btnContainer = document.createElement("td");

      const btnHolder = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnEdit = document.createElement("button");

      id.textContent = cliente.id;
      nameLink.textContent = cliente.name;
      email.textContent = cliente.email;
      address.textContent = cliente.address;
      createdAt.textContent = cliente.createdAt;
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

      addEventDeleteClient(btnDelete, cliente);
      addEventEditClient(btnEdit, cliente);

      line.appendChild(id);
      line.appendChild(name);
      name.appendChild(nameLink);

      line.appendChild(email);
      line.appendChild(address);
      line.appendChild(createdAt);
      line.appendChild(btnContainer);

      elementoListado.appendChild(line);
    });
});

// BORRAR CLIENTE
function addEventDeleteClient(button, cliente) {
  button.addEventListener("click", (event) => {
    if (confirm(`Desea borrar el cliente ${cliente.name}?`)) {
      callAPI(
        `http://localhost:3000/costumer/${cliente.id}`,
        "DELETE",
        {}
      ).then(() => window.location.replace("http://localhost:3200/clientes"));
    }
  });
}

// EDIT CLIENT
function addEventEditClient(button, cliente) {
  button.addEventListener("click", (event) => {
    activeFormEdit();
    fillForm(cliente);
  });
}

const editClientForm = document.querySelector(".form__edit-client");

function saveEditClient(event) {
  event.preventDefault();

  const inputs = event.target.elements;
  const cliente = {
    id: inputs["id"].value,
    name: inputs["clientName"].value,
    email: inputs["clientEmail"].value,
    address: inputs["clientAddress"].value,
    createdAt: inputs["clientDate"].value,
  };

  callAPI(`http://localhost:3000/costumer/${cliente.id}`, "PUT", cliente).then(
    () => {
      location.reload();
    }
  );
}

editClientForm.addEventListener("submit", saveEditClient);

function fillForm(cliente) {
  editClientForm.elements["id"].value = cliente.id;
  editClientForm.elements["clientName"].value = cliente.name;
  editClientForm.elements["clientEmail"].value = cliente.email;
  editClientForm.elements["clientAddress"].value = cliente.address;
  editClientForm.elements["clientDate"].value = cliente.createdAt;
}
function clearFormEdit(inputs) {
  inputs["id"].value = "";
  inputs["clientName"].value = "";
  inputs["clientEmail"].value = "";
  inputs["clientAddress"].value = "";
  inputs["clientDate"].value = "";
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
