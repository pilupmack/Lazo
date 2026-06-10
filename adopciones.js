/*///// ///// ///// ///// ///// ///// ///// /////*/


// ELEMENTOS

const contenedorArticlesAdopciones = document.querySelector("#contenedorArticlesAdopciones")

const selectEspecie = document.querySelector ("#selectEspecie")
const selectSexo = document.querySelector("#selectSexo")
const selectLugar = document.querySelector("#selectLugar")
const inputBuscador = document.querySelector(`#inputBuscador`)

const botonNuevaMascota = document.querySelector("#botonNuevaMascota")
const fondoOscuro = document.querySelector("#fondoOscuro")
const contenedorCamposFormulario = document.querySelector("#contenedorCamposFormulario")
const botonCancelar = document.querySelector("#botonCancelar")
const botonGuardar = document.querySelector("#guardarMascota")

const fondoMensaje = document.querySelector("#fondoMensaje")
const contenedorMensaje = document.querySelector("#contenedorMensaje")


//INICIO

contenedorArticlesAdopciones.innerHTML = ""
cargarAdopciones(enAdopcion)

cargarSelectEspecie()
cargarSelectSexo()
cargarSelectLugar()


//EVENTOS

selectEspecie.addEventListener("change", filtrarMascotas)
selectSexo.addEventListener("change", filtrarMascotas)
selectLugar.addEventListener("change", filtrarMascotas)
inputBuscador.addEventListener("keyup", filtrarMascotas)

botonNuevaMascota.addEventListener("click", cargarFormulario)
botonCancelar.addEventListener("click", cerrarFormulario)
botonGuardar.addEventListener("click", guardarMascota)


//FUNCIONES

function cargarAdopciones(enAdopcion){
    contenedorArticlesAdopciones.innerHTML = ""

    if(enAdopcion.length === 0){
        contenedorArticlesAdopciones.innerHTML =`<p class="sinResultados">¡Todas las mascotas encontraron un hogar! 🥹💗</p>`
        return
    }

    for(let i = 0; i < enAdopcion.length; i++){
        const mascotaActual = enAdopcion[i]
        let textoBoton = ""
        if(mascotaActual.sexo === "Macho"){
            textoBoton = "¡Ya fue adoptado!"
        }else{
            textoBoton = "¡Ya fue adoptada!"
        }

        contenedorArticlesAdopciones.innerHTML +=
            `<article>
                <img src="${mascotaActual.img[0]}" alt="${mascotaActual.nombre}">
                <p class="lugar">${mascotaActual.lugar}</p>
                <h3>${mascotaActual.nombre}</h3>
                <p class="SexoYEdad">${mascotaActual.sexo}, ${mascotaActual.edad}</p>
                <p class="descripcion">${mascotaActual.descripcion}</p>
                <div class="contenedorBotones">
                    <a class="boton3" href="detalle.html?id=${mascotaActual.id}"> Más sobre mí </a>
                    <a class="boton4" data-id="${mascotaActual.id}"> ${textoBoton} </a>
                </div>
            </article>`
    }

    const botonesAdoptado = document.querySelectorAll(".boton4")
    for(let i = 0; i < botonesAdoptado.length; i++){
        botonesAdoptado[i].addEventListener("click",function(){
            eliminarMascota(Number(this.dataset.id))
            }
        )
    }
}

function eliminarMascota(idMascota){
    for(let i = 0; i < enAdopcion.length; i++){
        if(enAdopcion[i].id === idMascota){
            enAdopcion.splice(i, 1)
            break
        }
    }

    cargarAdopciones(enAdopcion)

    cargarSelectEspecie()
    cargarSelectSexo()
    cargarSelectLugar()
}

function cargarSelectEspecie(){
    const categoriasEspecie = []
    for(let i = 0; i < enAdopcion.length; i++){
        const mascotaActual = enAdopcion[i]
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
    for(let i = 0; i < enAdopcion.length; i++){
        const mascotaActual = enAdopcion[i]
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

function cargarSelectLugar(){
    const categoriasLugar = []
    for(let i = 0; i < enAdopcion.length; i++){
        const mascotaActual = enAdopcion[i]
        const categoriaActual = mascotaActual.lugar

        if(!categoriasLugar.includes(categoriaActual)){
            categoriasLugar.push(categoriaActual)
        }
    }

    selectLugar.innerHTML = `<option value="todos">Todos`

    for(let i = 0; i < categoriasLugar.length; i++){
        const categoriaActual = categoriasLugar[i]
        selectLugar.innerHTML += `<option value="${categoriaActual}">${categoriaActual}`
    }
}

function filtrarMascotas(){
    const especieSeleccionada = selectEspecie.value
    const sexoSeleccionado = selectSexo.value
    const lugarSeleccionado = selectLugar.value
    const textoBuscado = inputBuscador.value.toLowerCase()

    const mascotasFiltradas = []

    for(let i = 0; i < enAdopcion.length; i++){

        const mascotaActual = enAdopcion[i]

        const coincideEspecie =
            especieSeleccionada === "todas" ||
            mascotaActual.especie === especieSeleccionada

        const coincideSexo =
            sexoSeleccionado === "todos" ||
            mascotaActual.sexo === sexoSeleccionado

        const coincideLugar =
            lugarSeleccionado === "todos" ||
            mascotaActual.lugar === lugarSeleccionado

        const coincideBusqueda =
            mascotaActual.descripcion.toLowerCase().includes(textoBuscado) || mascotaActual.especie.toLowerCase().includes(textoBuscado) || mascotaActual.lugar.toLowerCase().includes(textoBuscado) || mascotaActual.sexo.toLowerCase().includes(textoBuscado)

        if(coincideEspecie && coincideSexo && coincideLugar && coincideBusqueda){
            mascotasFiltradas.push(mascotaActual)
        }
    }

    if(mascotasFiltradas.length === 0){
    contenedorArticlesAdopciones.innerHTML = 
        `<p class="sinResultados">
            No encontramos mascotas con esas características 🥺</p>`
        } else {
            cargarAdopciones(mascotasFiltradas)
        }

}

function cargarFormulario(){
    fondoOscuro.style.display = "flex"
    crearCamposFormulario()

}

function cerrarFormulario(){
    fondoOscuro.style.display = "none"
}

function crearCamposFormulario(){
    contenedorCamposFormulario.innerHTML = ""
    contenedorCamposFormulario.innerHTML +=
        `<div class="campo">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre">
            <p id="errorNombre" class="mensajeError"></p>
        </div>
    
        <div class="campo">
            <label for="inputImagenes">Fotos!</label>
            <input type="text" id="inputImagenes" placeholder="https://imagen, https://imagen, https://imagen">
            <p id="errorImagenes" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="sexo">Sexo</label>
            <select id="sexo"></select>
            <p id="errorSexo" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="especie">Especie</label>
            <select id="especie"></select>
            <input type="text" id="nuevaEspecie" placeholder="Otra especie">
            <p id="errorEspecie" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="edad">Edad</label>
            <input type="number" id="edad">
            <select id="tipo">
                <option value="semanas"> Semanas </option>
                <option value="meses"> Meses </option>
                <option value="años"> Años </option>
            </select>
            <p id="errorEdad" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="lugar">Lugar</label>
            <select id="lugar"></select>
            <input type="text" id="nuevoLugar" placeholder="Nuevo lugar">
            <p id="errorLugar" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" placeholder="Contanos cómo es la personalidad de esta mascota :)"> </textarea>
            <p id="errorDescripcion" class="mensajeError"></p>
        </div>

        <div class="campo">
            <label for="castrado">¿Está castrada/o?</label>
            <select id="castrado">
                <option value="true"> Si </option>
                <option value="false"> No </option>
            </select>
            <p id="errorCastrado" class="mensajeError"></p>
        </div>`

    cargarOpcionesFormulario()
    configurarEventosErrores()
}

function cargarOpcionesSelect(select, opciones){
    select.innerHTML = `<option value=""> Seleccioná una opción </option>`

    for(let i = 0; i < opciones.length; i++){
        const opcionActual = opciones[i]
        select.innerHTML += `<option value="${opcionActual}"> ${opcionActual} </option>`
    }
}

function obtenerCategorias(propiedad){
    const categorias = []
    for(let i = 0; i < enAdopcion.length; i++){
        const mascotaActual = enAdopcion[i]
        const valor = mascotaActual[propiedad]
        if(!categorias.includes(valor)){
            categorias.push(valor)
        }
    }
    return categorias
}

function cargarOpcionesFormulario(){
    const selectSexo = document.querySelector("#sexo")
    const selectEspecie = document.querySelector("#especie")
    const selectLugar = document.querySelector("#lugar")
    const selectCastrado = document.querySelector("#castrado")

    cargarOpcionesSelect(selectSexo,["Macho", "Hembra"])

    cargarOpcionesSelect(selectEspecie,obtenerCategorias("especie"))

    cargarOpcionesSelect(selectLugar,obtenerCategorias("lugar"))

    cargarOpcionesSelect(selectCastrado,["Sí", "No"])
}

function configurarTexto(texto){
    const palabras = texto.trim().toLowerCase().split(" ")
    let resultado = ""
    for(let i = 0; i < palabras.length; i++){
        const palabraActual = palabras[i]
        if(palabraActual !== ""){
            resultado += palabraActual[0].toUpperCase() + palabraActual.slice(1)
            if(i < palabras.length - 1){
                resultado += " "
            }
        }
    }
    return resultado
}

function quitarError(campo, idError){
    campo.classList.remove("error")
    document.querySelector(idError).innerHTML = ""
}

function configurarEventosErrores(){
    document.querySelector("#nombre").addEventListener("input", function(){
        quitarError(this, "#errorNombre")
    })

    document.querySelector("#inputImagenes").addEventListener("input", function(){
        quitarError(this, "#errorImagenes")
    })

    document.querySelector("#sexo").addEventListener("change", function(){
        quitarError(this, "#errorSexo")
    })

    document.querySelector("#especie").addEventListener("change", function(){
        quitarError(this, "#errorEspecie")
    })

    document.querySelector("#nuevaEspecie").addEventListener("input", function(){
        quitarError(this, "#errorEspecie")
    })

    document.querySelector("#edad").addEventListener("input", function(){
        quitarError(this, "#errorEdad")
    })

    document.querySelector("#tipo").addEventListener("change", function(){
        quitarError(this, "#errorEdad")
    })

    document.querySelector("#lugar").addEventListener("change", function(){
        quitarError(this, "#errorLugar")
    })

    document.querySelector("#nuevoLugar").addEventListener("input", function(){
        quitarError(this, "#errorLugar")
    })

    document.querySelector("#descripcion").addEventListener("input", function(){
        quitarError(this, "#errorDescripcion")
    })

    document.querySelector("#castrado").addEventListener("change", function(){
        quitarError(this, "#errorCastrado")
    })
}

function limpiarErrores(){
    const errores = document.querySelectorAll(".mensajeError")
    for(let i = 0; i < errores.length; i++){
        errores[i].innerHTML = ""
    }

    const campos = document.querySelectorAll("input, select, textarea")
    for(let i = 0; i < campos.length; i++){
        campos[i].classList.remove("error")
    }
}

function validarFormulario(){
    limpiarErrores()
    let formularioValido = true
    const nombre = document.querySelector("#nombre")
    const inputImagenes = document.querySelector("#inputImagenes")
    const sexo = document.querySelector("#sexo")
    const especie = document.querySelector("#especie")
    const nuevaEspecie = document.querySelector("#nuevaEspecie")
    const edad = document.querySelector("#edad")
    const tipo = document.querySelector("#tipo")
    const lugar = document.querySelector("#lugar")
    const nuevoLugar = document.querySelector("#nuevoLugar")
    const descripcion = document.querySelector("#descripcion")
    const castrado = document.querySelector("#castrado")

    // Nombre //
    if(nombre.value.trim() === ""){
        nombre.classList.add("error")
        document.querySelector("#errorNombre").innerHTML = "Ingresá el nombre de la mascota."
        formularioValido = false
    }

    // Imágenes //
    const imagenes = inputImagenes.value.split(",")
    let hayImagen = false
    for(let i = 0; i < imagenes.length; i++){
        imagenes[i] = imagenes[i].trim()
        if(imagenes[i] !== ""){
            hayImagen = true
        }
    }

    if(!hayImagen){
        inputImagenes.classList.add("error")
        document.querySelector("#errorImagenes").innerHTML = "Ingresá al menos una imagen."
        formularioValido = false
    }

    for(let i = 0; i < imagenes.length; i++){
        const imagenActual = imagenes[i]
        if(imagenActual !== ""){
            try{
                new URL(imagenActual)
            }catch{
                inputImagenes.classList.add("error")
                document.querySelector("#errorImagenes").innerHTML = "Uno de los enlaces no es válido."
                formularioValido = false
                break
            }
        }
    }

    // Sexo //
    if(sexo.value === ""){
        sexo.classList.add("error")
        document.querySelector("#errorSexo").innerHTML = "Seleccioná un sexo."
        formularioValido = false
    }


    // Especie //
    const especieSeleccionada = especie.value
    const especieNuevaTexto = nuevaEspecie.value.trim()

    if(especieSeleccionada === "" && especieNuevaTexto === ""){
        especie.classList.add("error")
        document.querySelector("#errorEspecie").innerHTML = "Seleccioná una especie o escribí una nueva."
        formularioValido = false
    }

    if(especieSeleccionada !== "" && especieNuevaTexto !== ""){
        especie.classList.add("error")
        nuevaEspecie.classList.add("error")
        document.querySelector("#errorEspecie").innerHTML = "Solo podés completar una de las dos opciones."
        formularioValido = false
    }

    // Edad //
    if(edad.value === ""){
        edad.classList.add("error")
        document.querySelector("#errorEdad").innerHTML = "Ingresá una edad."
        formularioValido = false
    }

    if(tipo.value === ""){
        tipo.classList.add("error")
        document.querySelector("#errorEdad").innerHTML = "Seleccioná semanas, meses o años."
        formularioValido = false
    }


    // Lugar //
    const lugarSeleccionado = lugar.value
    const lugarNuevoTexto = nuevoLugar.value.trim()

    if(lugarSeleccionado === "" && lugarNuevoTexto === ""){
        lugar.classList.add("error")
        document.querySelector("#errorLugar").innerHTML = "Seleccioná un lugar o escribí uno nuevo."
        formularioValido = false
    }

    if(lugarSeleccionado !== "" && lugarNuevoTexto !== ""){
        lugar.classList.add("error")
        nuevoLugar.classList.add("error")
        document.querySelector("#errorLugar").innerHTML = "Solo podés completar una de las dos opciones."
        formularioValido = false
    }


    // Descripción //
    if(descripcion.value.trim() === ""){
        descripcion.classList.add("error")
        document.querySelector("#errorDescripcion").innerHTML = "Ingresá una descripción."
        formularioValido = false
    }


    // Castrado //
    if(castrado.value === ""){
        castrado.classList.add("error")
        document.querySelector("#errorCastrado").innerHTML = "Seleccioná una opción."
        formularioValido = false
    }
    return formularioValido
}

function guardarMascota(){
    if(!validarFormulario()){
        return
    }

    const imagenes = inputImagenes.value.split(",")
    for(let i = 0; i < imagenes.length; i++){
        imagenes[i] = imagenes[i].trim()
    }

    const especieNueva = configurarTexto(document.querySelector("#nuevaEspecie").value)
    let especieFinal = ""
    if(especieNueva !== ""){
        especieFinal = especieNueva
    }else{
        especieFinal = document.querySelector("#especie").value
    }

    const lugarNuevo = configurarTexto(document.querySelector("#nuevoLugar").value)
    let lugarFinal = ""
    if(lugarNuevo !== ""){
        lugarFinal = lugarNuevo
    }else{
        lugarFinal = document.querySelector("#lugar").value
    }

    const edadNumero = document.querySelector("#edad").value
    const edadTipo = document.querySelector("#tipo").value
    let edadFinal = ""
    if(edadNumero == 1){
        if(edadTipo === "años"){
            edadFinal = "1 año"
        } else if(edadTipo === "meses"){
            edadFinal = "1 mes"
        } else{
            edadFinal = "1 semana"
        }
    }else{
        edadFinal = `${edadNumero} ${edadTipo}`
    }

    const nuevaMascota = {
        id: enAdopcion.length,
        img: imagenes,
        nombre: configurarTexto(document.querySelector("#nombre").value),
        sexo: document.querySelector("#sexo").value,
        edad: edadFinal,
        descripcion: document.querySelector("#descripcion").value,
        especie: especieFinal,
        lugar: lugarFinal,
        castrado: document.querySelector("#castrado").value
    }

    enAdopcion.push(nuevaMascota)
    cargarSelectEspecie()
    cargarSelectSexo()
    cargarSelectLugar()
    cargarAdopciones(enAdopcion)
    cerrarFormulario()

    mostrarMensajeExito("<h3>¡Todo listo!</h3><p>La publicación se creó correctamente 🐾</p>")
}

function mostrarMensajeExito(texto){
    contenedorMensaje.innerHTML = texto
    fondoMensaje.style.display = "flex"
    setTimeout(
        ocultarMensajeExito,
        2000
    )
}

function ocultarMensajeExito(){
    fondoMensaje.style.display = "none"
}

/*///// ///// ///// ///// ///// ///// ///// /////*/