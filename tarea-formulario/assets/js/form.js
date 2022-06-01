const form = document.querySelector("#form");

function eventSubmit(event) {
  event.preventDefault();
  const inputs = event.target.elements;
  const height = inputs[0].value;
  const width = inputs[1].value;
  const content = inputs[2].value;
  const boxElement = document.querySelector("#box");
  boxElement.style.height = height + "px";
  boxElement.style.width = width + "px";
  boxElement.textContent = content;
}
form.addEventListener("submit", eventSubmit);
