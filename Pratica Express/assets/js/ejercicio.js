// console.log("Hola")

// function simple
function saludo() {
    console.log("Hola, desde una funcion")
}


// function con parametros
function saludos(evento) {
    // evitar que se refresque la pagina
    evento.preventDefault()

    console.log("Hola, desde una funcion")
}

const miFormulario = document.querySelector("#my-form")
console.log(miFormulario)


miFormulario.addEventListener('submit', saludos)
