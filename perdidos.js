/*///// ///// ///// ///// ///// ///// ///// /////*/


// ELEMENTOS

const contenedorArticlesPerdidos = document.querySelector("#contenedorArticlesPerdidos")

const selectEspecie = document.querySelector ("#selectEspecie")
const selectSexo = document.querySelector("#selectSexo")
const selectUltimoLugar = document.querySelector("#selectUltimoLugar")
const selectOrden = document.querySelector("#selectOrden")
const inputBuscador = document.querySelector(`#inputBuscador`)


//INICIO

contenedorArticlesPerdidos.innerHTML = ""
cargarSelectOrden()
const perdidosOrdenados = ordenarMascotas(perdidos, "recientes")
cargarPerdidos(perdidosOrdenados)

cargarSelectEspecie()
cargarSelectSexo()
cargarSelectUltimoLugar()


//EVENTOS

selectEspecie.addEventListener("change", filtrarMascotas)
selectSexo.addEventListener("change", filtrarMascotas)
selectUltimoLugar.addEventListener("change", filtrarMascotas)
selectOrden.addEventListener("change", filtrarMascotas)
inputBuscador.addEventListener("keyup", filtrarMascotas)


//FUNCIONES

function cargarPerdidos(perdidos){
    contenedorArticlesPerdidos.innerHTML = ""

    for(let i = 0; i < perdidos.length; i++){
        const mascotaActual = perdidos[i]
        const dia = String(mascotaActual.fecha.getDate()).padStart(2, "0")
        const mes = String(mascotaActual.fecha.getMonth() + 1).padStart(2, "0")
        const anio = mascotaActual.fecha.getFullYear()
        const fechaFormateada = `${dia}/${mes}/${anio}`
        contenedorArticlesPerdidos.innerHTML += 
        `<article>
            <img src="${mascotaActual.img[0]}" alt="${mascotaActual.nombre}">
            <div class="infoCardPerdidos">
                <p class="fecha">${fechaFormateada}</p>
                <h3>${mascotaActual.nombre}</h3>
                <p class="sexo">${mascotaActual.sexo}</p>
                <div class="ultimaVez">
                    <p>Vista por última vez en <br><span>📍 ${mascotaActual.ultimaVista}</span></p>
                </div>
                <div class="divBotones">
                    <a class="boton3" href="#">Contacto</a>
                    <a class="boton4" href="detalle.html?id=${mascotaActual.id}">Más detalles</a>
                </div>
            </div>
        </article>`
    }
}

function cargarSelectEspecie(){
    const categoriasEspecie = []
    for(let i = 0; i < perdidos.length; i++){
        const mascotaActual = perdidos[i]
        const categoriaActual = mascotaActual.especie

        if(!categoriasEspecie.includes(categoriaActual)){
            categoriasEspecie.push(categoriaActual)
        }
    }

    selectEspecie.innerHTML = `<option value="todas">Todas`

    for(let i = 0; i < categoriasEspecie.length; i++){
        const categoriaActual = categoriasEspecie[i]
        selectEspecie.innerHTML += `<option value="${categoriaActual}">${categoriaActual}`
    }
}

function cargarSelectSexo(){
    const categoriasSexo = []
    for(let i = 0; i < perdidos.length; i++){
        const mascotaActual = perdidos[i]
        const categoriaActual = mascotaActual.sexo

        if(!categoriasSexo.includes(categoriaActual)){
            categoriasSexo.push(categoriaActual)
        }
    }

    selectSexo.innerHTML = `<option value="todos">Todos`

    for(let i = 0; i < categoriasSexo.length; i++){
        const categoriaActual = categoriasSexo[i]
        selectSexo.innerHTML += `<option value="${categoriaActual}">${categoriaActual}`
    }
}

function cargarSelectUltimoLugar(){
    const categoriasUltimoLugar = []
    for(let i = 0; i < perdidos.length; i++){
        const mascotaActual = perdidos[i]
        const categoriaActual = mascotaActual.ultimaVista

        if(!categoriasUltimoLugar.includes(categoriaActual)){
            categoriasUltimoLugar.push(categoriaActual)
        }
    }

    selectUltimoLugar.innerHTML = `<option value="todos">Todos`

    for(let i = 0; i < categoriasUltimoLugar.length; i++){
        const categoriaActual = categoriasUltimoLugar[i]
        selectUltimoLugar.innerHTML += `<option value="${categoriaActual}">${categoriaActual}`
    }
}

function cargarSelectOrden(){
    selectOrden.innerHTML = ""
    selectOrden.innerHTML +=
    `<option value="recientes">Más recientes</option>`
    selectOrden.innerHTML +=
    `<option value="antiguos">Más antiguos</option>`
}

function ordenarMascotas(arrayMascotas, orden){
    const mascotasOrdenadas = []
    for(let i = 0; i < arrayMascotas.length; i++){
        mascotasOrdenadas.push(arrayMascotas[i])
    }

    for(let i = 0; i < mascotasOrdenadas.length - 1; i++){
        for(let j = i + 1; j < mascotasOrdenadas.length; j++){
            if((orden === "recientes" && mascotasOrdenadas[i].fecha < mascotasOrdenadas[j].fecha) || (orden === "antiguos" && mascotasOrdenadas[i].fecha > mascotasOrdenadas[j].fecha)){
                const auxiliar = mascotasOrdenadas[i]
                mascotasOrdenadas[i] = mascotasOrdenadas[j]
                mascotasOrdenadas[j] = auxiliar
            }
        }
    }
    return mascotasOrdenadas
}

function filtrarMascotas(){

    const especieSeleccionada = selectEspecie.value
    const sexoSeleccionado = selectSexo.value
    const lugarSeleccionado = selectUltimoLugar.value
    const textoBuscado = inputBuscador.value.toLowerCase()

    const mascotasFiltradas = []

    for(let i = 0; i < perdidos.length; i++){

        const mascotaActual = perdidos[i]

        const coincideEspecie =
            especieSeleccionada === "todas" ||
            mascotaActual.especie === especieSeleccionada

        const coincideSexo =
            sexoSeleccionado === "todos" ||
            mascotaActual.sexo === sexoSeleccionado

        const coincideLugar =
            lugarSeleccionado === "todos" ||
            mascotaActual.ultimaVista === lugarSeleccionado

        const coincideBusqueda =
            mascotaActual.ultimaVista.toLowerCase().includes(textoBuscado) || mascotaActual.especie.toLowerCase().includes(textoBuscado) || mascotaActual.sexo.toLowerCase().includes(textoBuscado)

        if(coincideEspecie && coincideSexo && coincideLugar && coincideBusqueda){
            mascotasFiltradas.push(mascotaActual)
        }
    }

    if(mascotasFiltradas.length === 0){
    contenedorArticlesPerdidos.innerHTML = 
        `<p class="sinResultados">
            No encontramos mascotas con esas características :( </p>`
        } else {
            cargarPerdidos(mascotasFiltradas)
    }

    const ordenSeleccionado = selectOrden.value
    const mascotasOrdenadas =
    ordenarMascotas(mascotasFiltradas, ordenSeleccionado)
    if(mascotasOrdenadas.length === 0){
        contenedorArticlesPerdidos.innerHTML =
        `<p class="sinResultados"> No encontramos mascotas con esas características :( </p>`}else{
        cargarPerdidos(mascotasOrdenadas)
        }
}