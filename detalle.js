
/* ////////////////////////////////////////////// */

/*///// Elementos /////*/

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

let mascota

for(let i = 0; i < todasLasMascotas.length; i++){
    const array = todasLasMascotas[i]
    for (let j = 0; j < array.length; j++) {
        const mascotaActual = array[j]
        console.log(mascotaActual)
        if (mascotaActual.id == id){
            mascota = mascotaActual
        }
    }
}

const imagenes = mascota.img

const sectionSobreMi = document.querySelector("#sobreMi")
const mascotasRelacionadas = document.querySelector("#mascotasRelacionadas")
const tituloRelacionadas = document.querySelector("#tituloRelacionadas")
const contenedorRelacionadas = document.querySelector("#contenedorRelacionadas")


/*///// Inicio /////*/

cargarDetalle()
cargarRelacionadas()

const slider = document.querySelector("#imagenSlider")
slider.src = imagenes[0]

const contenedorMiniaturas = document.querySelector(".miniaturas")
for(let i = 0; i < imagenes.length; i++){
    contenedorMiniaturas.innerHTML +=
    `<a href="#" indice="${i}" class="miniatura">
        <img src="${imagenes[i]}" alt="">
    </a>`
}

const miniaturas = document.querySelectorAll(".miniatura")

if(miniaturas.length > 0){
    miniaturas[0].classList.add("miniaturaActiva")
}


/*///// Eventos /////*/

for(let i = 0; i < miniaturas.length; i++){
    const miniatura = miniaturas[i]
    miniatura.addEventListener("click", cambiarSlide)
}


/*///// Funciones /////*/

function cargarDetalle(){

    if(!mascota.perdido){
            sectionSobreMi.innerHTML =
        `<div id="contenedorSlider">
            <img id="imagenSlider" src="" alt="">
            <div class="miniaturas"></div>
        </div>

        <div id="contenedorInformacion">
            <div id="contenedorInformacionTextos">
                <h2>${mascota.nombre}</h2>

                <div id="etiquetasDetalle">
                    <p class="sexo">${mascota.sexo}</p>
                    <p class="edad">${mascota.edad}</p>
                    <p>${mascota.lugar}</p>
                </div>

                <p>${mascota.descripcion}</p>
            </div>

            <a class="boton1" href="#">Contactar</a>
        </div>`
    }

    if(mascota.perdido){
        const dia = String(mascota.fecha.getDate()).padStart(2, "0")
        const mes = String(mascota.fecha.getMonth() + 1).padStart(2, "0")
        const anio = mascota.fecha.getFullYear()
        const fechaFormateada = `${dia}/${mes}/${anio}`

            sectionSobreMi.innerHTML =
        `<div id="contenedorSlider">
            <img id="imagenSlider" src="" alt="">
            <div class="miniaturas"></div>
        </div>

        <div id="contenedorInformacion">
            <div id="contenedorInformacionTextos">
                <h2>${mascota.nombre}</h2>

                <p class="fecha">${fechaFormateada}</p>

                <div id="etiquetasDetalle">
                    <p class="sexo">${mascota.sexo}</p>
                    <p class="edad">${mascota.edad}</p>
                    <p>${mascota.ultimaVista}</p>
                </div>

                <p>${mascota.descripcion}</p>
            </div>

            <a class="boton1" href="#">Contactar</a>
        </div>`
    }

    const etiquetasDetalle = document.querySelector("#etiquetasDetalle")
    if(!mascota.castrado && mascota.sexo === "Hembra"){
        etiquetasDetalle.innerHTML += `<p>Castrada</p>`
    } else if (mascota.castrado && mascota.sexo === "Macho"){
        etiquetasDetalle.innerHTML += `<p>Castrado</p>`
    }
}


function cambiarSlide(){
    const indice = this.getAttribute("indice")
    slider.src = imagenes[indice]

    for(let i = 0; i < miniaturas.length; i++){
        miniaturas[i].classList.remove("miniaturaActiva")
    }

    this.classList.add("miniaturaActiva")
}


function cargarRelacionadas(){
    const relacionadas = []
    let array = []
    if(mascota.perdido === false){
        array = enAdopcion
    } else{
        array = perdidos
    }

    for(let i = 0; i < array.length; i++){
        const mascotaActual = array[i]

        if(mascotaActual.especie === mascota.especie && mascotaActual.id != mascota.id){
            relacionadas.push(mascotaActual)
        }
    }

    const seleccionadas = []
    while(seleccionadas.length < 4 && seleccionadas.length < relacionadas.length){
        const indiceAleatorio = Math.floor(Math.random() * relacionadas.length)
        const mascota = relacionadas[indiceAleatorio]

        if(!seleccionadas.includes(mascota)){
            seleccionadas.push(mascota)
        }
    }

    if(!mascota.perdido){
        tituloRelacionadas.innerHTML =
        `Podrían Interesarte`

        for(let i = 0; i < seleccionadas.length; i++){
        const mascota = seleccionadas[i]
        contenedorRelacionadas.innerHTML +=
            `<article>
                <img src="${mascota.img[0]}" alt="${mascota.nombre}">
                <p class="lugar">${mascota.lugar}</p>
                <h3>${mascota.nombre}</h3>
                <p class="SexoYEdad">${mascota.sexo}, ${mascota.edad}</p>
                <p class="descripcion">${mascota.descripcion}</p>
                <a class="boton3" href="detalle.html?id=${mascota.id}">
                    Más sobre mí
                </a>
            </article>`
        }
        
        mascotasRelacionadas.innerHTML +=
        `<a class="boton2" href="adopciones.html">Ver Todas <span class="material-symbols-rounded" id="flechita2"> arrow_forward </span> </a>`
    }

    if(mascota.perdido){
        const dia = String(mascota.fecha.getDate()).padStart(2, "0")
        const mes = String(mascota.fecha.getMonth() + 1).padStart(2, "0")
        const anio = mascota.fecha.getFullYear()
        const fechaFormateada = `${dia}/${mes}/${anio}`

        tituloRelacionadas.innerHTML =
        `También Necesitan Ayuda`

        for(let i = 0; i < seleccionadas.length; i++){
        const mascota = seleccionadas[i]
        contenedorRelacionadas.innerHTML +=
            `<article>
                <img src="${mascota.img[0]}" alt="${mascota.nombre}">
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
            </article>`
        }
        
        mascotasRelacionadas.innerHTML +=
        `<a class="boton2" href="perdidos.html">Ver Todas <span class="material-symbols-rounded" id="flechita2"> arrow_forward </span> </a>`
    }
}

/* ////////////////////////////////////////////// */