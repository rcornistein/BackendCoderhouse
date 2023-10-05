/************  MANEJADOR DE LISTADO  ****************/
crearListado = items => items.map(prod => `
                            <div class="col-3" id="${prod.tipo}">
                                <div class="card m-1">
                                    <img src="${prod.imagen}" class="h-75 card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${prod.nombre}</h5>
                                        <h6 class="card-subtitle">${prod.precio.toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}</h6>
                                        <p class="card-text ">${prod.descripcion}</p>
                                        <a href="#" class="btn btn-primary" onclick="agregarItem(${prod.codigo})">Agregar</a>
                                    </div>
                                </div>
                            </div>`
)

filtrar = filtro => {
    if (filtro != `todos`){
        return productos.filter(producto => producto.tipo == filtro)
    }
    return productos
}

mostrarListado = tipo => {
    document.querySelector(`#lista`).innerHTML = ""
    let filtrado = filtrar(tipo.id)
    let lista = crearListado(filtrado)
    lista.forEach(producto => document.querySelector(`#lista`).insertAdjacentHTML("beforeend", producto))
    document.querySelectorAll(`li a`).forEach(elemento => elemento.classList.remove("active"))
    document.querySelector(`#${tipo.id} a`).classList.add("active")
}

document.querySelector("body").onload = mostrarListado(document.querySelector(`#todos`))




/************  CARRITO DE COMPRAS  ****************/
let carrito = []
generarCarrito = (item) => item.map(prod => `
                            <div class="card w-50 m-auto">
                                <img src="${prod.imagen}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${prod.precio.toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}</h5>
                                    <a href="#" class="btn btn-danger" onclick="eliminarItem(${prod.codigo}, this.parentNode)">Eliminar</a>
                                </div>
                            </div>`
)

agregarItem = (cod) => {
    let item = productos.filter(producto => producto.codigo == cod)
    carrito.push(item[0])
    let agregado = generarCarrito(item)
    document.querySelector(`#carrito`).insertAdjacentHTML("afterbegin", agregado)
    document.querySelector(`button`).classList.remove("d-none")
}

eliminarItem = (cod, elementoDOM) => {
    let item = carrito.indexOf(cod)
    carrito.splice(item, 1)
    let eliminar = elementoDOM.parentNode
    eliminar.parentNode.removeChild(eliminar)
    if (document.querySelector(`#carrito div`) == document.querySelector(`#carrito div.d-flex`)){
        document.querySelector(`button`).classList.add("d-none")
    }
}

completarCompra = () => {
    let subTotal = carrito.reduce((acumulador, precio) => acumulador + precio.precio, 0)
    document.querySelector(`.modal-body`).innerHTML = `
            <p class="lead font-weight-bold text-center">Le agradece amablemente su compra!</p>
            <p><b>Subtotal:</b> ${subTotal.toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}<br>
            <b>I.V.A.:</b> ${(subTotal*.21).toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}<br>
            <b>Total Compra:</b> ${(subTotal*1.21).toLocaleString(`en-US`, {style: `currency`, currency: `USD`,})}</p>
            `
    document.querySelector(`#myModal`).addEventListener('hidden.bs.modal', function(){
        window.location.reload()
     });
}

document.querySelector(`button.btn-outline-success`).addEventListener(`click`, completarCompra)