const url = "http://localhost:3000/interaction";

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
window.addEventListener("load", getInteraction);
function getInteraction() {
  callAPI(url, "GET", {}).then((interacciones) => {
    const elementoListado = document.querySelector(".tbody");

    interacciones.forEach((interaccion) => {
      const line = document.createElement("tr");
      const id = document.createElement("th");
      const note = document.createElement("td");
      const createdAt = document.createElement("td");
      const user = document.createElement("td");
      const userLink = document.createElement("a");
      userLink.href = `/usuarios/detalles?id=${interaccion.user.id}`;
      const costumer = document.createElement("td");
      const costumerLink = document.createElement("a");
      costumerLink.href = `/clientes/detalles?id=${interaccion.costumer.id}`;

      const btnContainer = document.createElement("td");

      const btnHolder = document.createElement("div");
      const btnDelete = document.createElement("button");
      const btnEdit = document.createElement("button");

      id.textContent = interaccion.id;
      note.textContent = interaccion.note;
      createdAt.textContent = interaccion.createdAt;
      userLink.textContent = interaccion.user.name;
      costumerLink.textContent = interaccion.costumer.name;

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

      addEventDeleteInteraction(btnDelete, interaccion);
      addEventEditInteraction(btnEdit, interaccion);

      line.appendChild(id);

      line.appendChild(note);
      line.appendChild(createdAt);
      user.appendChild(userLink);
      line.appendChild(user);
      costumer.appendChild(costumerLink);

      line.appendChild(costumer);
      line.appendChild(btnContainer);

      elementoListado.appendChild(line);
    });
  });
}

// BORRAR INTERACCIONES
function addEventDeleteInteraction(button, interaccion) {
  button.addEventListener("click", (event) => {
    if (confirm(`Desea borrar la interaccion #${interaccion.id}?`)) {
      callAPI(`${url}/${interaccion.id}`, "DELETE", {}).then(() =>
        window.location.reload()
      );
    }
  });
}

// CREAR INTERACCIONES
const interactionCreateForm = document.querySelector(
  ".form__create-interaction"
);
const inputId = document.querySelector("#customerId");
let costumerForInteraction;
inputId.addEventListener("blur", (e) => {
  let identificador = interactionCreateForm.elements["customerId"].value;
  const id = identificador;
  const url = `http://localhost:3000/costumer/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((cliente) => {
      if (cliente.id === undefined) {
        alert("el id no existe", "danger");
        clearFormCreateNoFull();
      } else {
        interactionCreateForm.elements["costumerName"].value = cliente.name;
        interactionCreateForm.elements["costumerEmail"].value = cliente.email;
        costumerForInteraction = cliente;
      }
    });
});

function saveInteraction(event) {
  event.preventDefault();

  const inputs = event.target.elements;

  // DATE
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // USER
  const user = JSON.parse(localStorage.getItem("user"));

  const interaction = {
    note: inputs["note"].value,
    createdAt: date,
    user: user,
    costumer: costumerForInteraction,
  };

  const url = "http://localhost:3000/interaction";
  const header = {
    "Content-Type": "application/json",
  };
  const configuration = {
    method: "POST",
    body: JSON.stringify(interaction),
    headers: header,
  };

  fetch(url, configuration)
    .then((response) => {
      return response.json();
    })
    .then((interaction) => {});
  inactiveFormCreate();
  clearFormCreate(inputs);
  getInteraction();
}

interactionCreateForm.addEventListener("submit", saveInteraction);

let newInteraction = document.querySelector(".new-interaction");
newInteraction.addEventListener("click", activeFormCreate);

function clearFormCreateNoFull() {
  interactionCreateForm.elements[1].value = "";
  interactionCreateForm.elements[2].value = "";
  interactionCreateForm.elements[3].value = "";
}
function clearFormCreate(inputs) {
  inputs["note"].value = "";
  inputs["customerId"].value = "";
  inputs["costumerName"].value = "";
  inputs["costumerEmail"].value = "";
}
function activeFormCreate() {
  document.querySelector(".form-create").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
}
function inactiveFormCreate() {
  document.querySelector(".form-create").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
}

// EDIT INTERACTION
let interactionForEdit;
function addEventEditInteraction(button, interaccion) {
  button.addEventListener("click", (event) => {
    activeFormEdit();
    fillForm(interaccion);
    interactionForEdit = interaccion;
  });
}

//
let costumerForInteractionEdit;
const editInteractionForm = document.querySelector(".form__edit-interaction");

const inputNoteEdit = document.querySelector("#noteEdit");
const inputIdEdit = document.querySelector("#customerIdEdit");

async function checkInput() {
  let identificador = editInteractionForm.elements["customerIdEdit"].value;
  const id = identificador;
  const url = `http://localhost:3000/costumer/${id}`;

  await fetch(url)
    .then((response) => response.json())
    .then((cliente) => {
      if (cliente.id === undefined) {
        alert("el id no existe", "danger");
        clearFormCreateNoFull();
      } else {
        editInteractionForm.elements["costumerNameEdit"].value = cliente.name;
        editInteractionForm.elements["costumerEmailEdit"].value = cliente.email;
        costumerForInteractionEdit = cliente;
      }
    });
}

//

function saveEditInteraction(event) {
  checkInput();
  event.preventDefault();
  setTimeout(() => {
    const inputs = event.target.elements;
    const interaction = {
      id: inputs["interactionIdEdit"].value,
      note: inputs["noteEdit"].value,
      createdAt: inputs["interactionDateEdit"].value,
      user: interactionForEdit.user,
      costumer: costumerForInteractionEdit,
    };

    callAPI(`${url}/${interaction.id}`, "PUT", interaction).then(() => {
      location.reload();
    });
  }, 1000);
}

inputIdEdit.addEventListener("blur", checkInput);
inputNoteEdit.addEventListener("blur", checkInput);
editInteractionForm.addEventListener("submit", saveEditInteraction);

function fillForm(interaction) {
  editInteractionForm.elements["interactionIdEdit"].value = interaction.id;
  editInteractionForm.elements["noteEdit"].value = interaction.note;

  editInteractionForm.elements["customerIdEdit"].value =
    interaction.costumer.id;
  editInteractionForm.elements["costumerNameEdit"].value =
    interaction.costumer.name;
  editInteractionForm.elements["costumerEmailEdit"].value =
    interaction.costumer.email;
  editInteractionForm.elements["interactionDateEdit"].value =
    interaction.createdAt;
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
