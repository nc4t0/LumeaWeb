let carrito = JSON.parse(localStorage.getItem("carrito")) || []

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

// 🔥 CONTADOR (usa cantidad total, no cantidad de productos)
function actualizarContador() {
  const contador = document.querySelector(".contador")

  let total = carrito.reduce((acc, p) => acc + p.cantidad, 0)

  if (contador) {
    contador.textContent = total
  }
}

// 🔥 UNA sola función (la correcta)
function agregarAlCarrito(producto) {
  let existente = carrito.find(p => p.nombre === producto.nombre)

  if (existente) {
    existente.cantidad++
  } else {
    carrito.push({ ...producto, cantidad: 1 }) // 👈 acá ya guarda imagen también
  }

  guardarCarrito()
  actualizarContador()
  renderCarrito()
}

// UI carrito
const btnCarrito = document.querySelector(".btn-carrito")
const panel = document.getElementById("carritoPanel")
const cerrar = document.getElementById("cerrarCarrito")

btnCarrito.addEventListener("click", () => {
  panel.classList.add("activo")
})

cerrar.addEventListener("click", () => {
  panel.classList.remove("activo")
})

// 🖼️ RENDER con imagen
function renderCarrito() {
  const contenedor = document.getElementById("carritoItems")
  const total = document.getElementById("total")

  contenedor.innerHTML = ""

  let suma = 0

  carrito.forEach((producto, index) => {
    let subtotal = producto.precio * producto.cantidad
    suma += subtotal

    contenedor.innerHTML += `
      <div class="carrito-item">

        <img src="${producto.imagen || ''}" class="thumb">

        <div class="info">
          <strong>${producto.nombre}</strong>
          <p>$${producto.precio}</p>
        </div>

        <div class="controls">
          <button onclick="disminuir(${index})">-</button>
          <span>${producto.cantidad}</span>
          <button onclick="aumentar(${index})">+</button>
          <span>$${subtotal}</span>
          <button onclick="eliminarProducto(${index})">❌</button>
        </div>

      </div>
    `
  })

  total.textContent = "Total: $" + suma
}

// funciones //

function aumentar(index) {
  carrito[index].cantidad++
  guardarCarrito()
  renderCarrito()
  actualizarContador()
}

function disminuir(index) {
  carrito[index].cantidad--

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1)
  }

  guardarCarrito()
  renderCarrito()
  actualizarContador()
}

function eliminarProducto(index) {
  carrito.splice(index, 1)
  guardarCarrito()
  actualizarContador()
  renderCarrito()
}

// init
actualizarContador()
renderCarrito()

// WSP //
document.getElementById("enviarWhatsApp").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value
  const direccion = document.getElementById("direccion").value

  if (carrito.length === 0) {
    alert("El carrito está vacío")
    return
  }

  let mensaje = `Pedido web%0A%0A`
  mensaje += `Nombre: ${nombre}%0A`
  mensaje += `Dirección: ${direccion}%0A%0A`

  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}%0A`
  })

  let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  mensaje += `%0A Total: $${total}`

  const numero = "5491170633263"

  window.open(`https://wa.me/${numero}?text=${mensaje}`, "_blank")
})