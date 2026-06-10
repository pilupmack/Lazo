/* ////////////////////////////////////////////// */

/*///// Elementos /////*/

const contenedorSlides = document.querySelector(".contenedorSlides");
const slides = document.querySelectorAll(".slide");

const contenedorArticlesBuscados = document.querySelector("#contenedorArticlesBuscados")

const contenedorArticlesAdopciones = document.querySelector("#contenedorArticlesAdopciones")
const btnDerecha = document.querySelector("#btnDerecha")
const btnIzquierda = document.querySelector("#btnIzquierda")

const adoptadas = document.querySelector("#adoptadas")
const reunidas = document.querySelector("#reunidas")
const encuentros = document.querySelector("#encuentros")

const pTestimonio = document.querySelector(".testimonio")
const pPersonaTestimonio = document.querySelector(".personaTestimonio")


/*///// Inicio /////*/

setInterval(cambiarSlide, 6000)

const observer = new IntersectionObserver(iniciarAnimacion)
observer.observe(adoptadas)
let yaSeAnimaron = false

cargarBuscados()
cargarAdopciones()

const indiceRandom = Math.floor(Math.random() * testimonios.length)
pTestimonio.textContent = `"${testimonios[indiceRandom].testimonio}"`
pPersonaTestimonio.textContent = `— ${testimonios[indiceRandom].persona}`


/*///// Eventos /////*/

contenedorSlides.addEventListener("transitionend", volverAlInicio)

btnDerecha.addEventListener("click", moverDerecha)
btnIzquierda.addEventListener("click", moverIzquierda)


/*///// Funciones /////*/

let slideActual = 0

function cambiarSlide(){
    slideActual++
    contenedorSlides.style.transform = `translateX(-${slideActual * 100}%)`
}


function volverAlInicio(){
    if(slideActual === slides.length - 1){
        contenedorSlides.style.transition = "none"
        slideActual = 0

        contenedorSlides.style.transform = "translateX(0)"
        contenedorSlides.offsetHeight
        contenedorSlides.style.transition = "transform 0.8s ease"

    }
}

function moverDerecha(){
    const anchoVisible = contenedorArticlesAdopciones.clientWidth
    contenedorArticlesAdopciones.scrollLeft += anchoVisible
}

function moverIzquierda(){
    const anchoVisible = contenedorArticlesAdopciones.clientWidth
    contenedorArticlesAdopciones.scrollLeft -= anchoVisible

}

function iniciarAnimacion(entradas){
    if(entradas[0].isIntersecting && !yaSeAnimaron){
        yaSeAnimaron = true
        animarNumero(adoptadas, 274)
        animarNumero(reunidas, 32)
        animarNumero(encuentros, 48)
    }

}

function animarNumero(elemento, numeroFinal){
    let numeroActual = 0
    const incremento = Math.ceil(numeroFinal / 100)
    const intervalo = setInterval(aumentarNumero, 20)

    function aumentarNumero(){
        numeroActual += incremento
        if(numeroActual >= numeroFinal){
            numeroActual = numeroFinal
            clearInterval(intervalo)
        }
        elemento.innerHTML = numeroActual
    }
}

function cargarAdopciones(){
    const seleccionadas = []
    while(seleccionadas.length < 9){
        const indiceAleatorio = Math.floor(Math.random() * enAdopcion.length)
        const mascota = enAdopcion[indiceAleatorio]
        if(!seleccionadas.includes(mascota)){
            seleccionadas.push(mascota)
        }
    }

    for(let i = 0; i < seleccionadas.length; i++){
        const mascota = seleccionadas[i]
        contenedorArticlesAdopciones.innerHTML +=
        `<article>
            <img src="${mascota.img[0]}" alt="${mascota.nombre}">
            <p class="lugar">${mascota.lugar}</p>
            <h3>${mascota.nombre}</h3>
            <p class="SexoYEdad">${mascota.sexo}, ${mascota.edad}</p>
            <p class="descripcion">${mascota.descripcion}</p>
            <a class="boton3" href="detalle.html?id=${mascota.id}">Más sobre mí</a>
        </article>`
    }
}

function cargarBuscados(){
    const masRecientes = []
    while(masRecientes.length < 4){
        let masNueva = null
        for(let i = 0; i < perdidos.length; i++){
            const mascota = perdidos[i]
            if(!masRecientes.includes(mascota) && (masNueva === null || mascota.fecha > masNueva.fecha)){
                masNueva = mascota
            }
        }
        masRecientes.push(masNueva)
    }
    for(let i = 0; i < masRecientes.length; i++){
        const mascota = masRecientes[i]
        const dia = String(mascota.fecha.getDate()).padStart(2, "0")
        const mes = String(mascota.fecha.getMonth() + 1).padStart(2, "0")
        const anio = mascota.fecha.getFullYear()

        const fechaFormateada = `${dia}/${mes}/${anio}`

        contenedorArticlesBuscados.innerHTML += 
        `<article>
            <img src="${mascota.img[0]}" alt="${mascota.nombre}">

            <div class="infoCardPerdidos">
                <p class="fecha">${fechaFormateada}</p>
                <h3>${mascota.nombre}</h3>
                <p class="sexo">${mascota.sexo}</p>
                <div class="ultimaVez">
                    <p>Vista por última vez en <br><span>📍 ${mascota.ultimaVista}</span></p>
                </div>
                <div class="divBotones">
                    <a class="boton3" href="#">Contacto</a>
                    <a class="boton4" href="detalle.html?id=${mascota.id}">Más detalles</a>
                </div>

            </div>
        </article>`
    }
}

/* ////////////////////////////////////////////// */