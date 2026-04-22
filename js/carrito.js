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
const overlay = document.getElementById("overlay")

btnCarrito.addEventListener("click", () => {
  panel.classList.add("activo")
  overlay.classList.add("activo")
})

cerrar.addEventListener("click", () => {
  panel.classList.remove("activo")
  overlay.classList.remove("activo")
})

overlay.addEventListener("click", () => {
  panel.classList.remove("activo")
  overlay.classList.remove("activo")
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

  <div class="controls">
    <button onclick="disminuir(${index})">-</button>
    <span>${producto.cantidad}</span>
    <button onclick="aumentar(${index})">+</button>

    <span class="subtotal">$${subtotal}</span>

  <button class="btn-eliminar" onclick="eliminarProducto(${index})">
  <i class="fa-solid fa-trash"></i>
</button>
  </div>
</div>
    `
  })

  total.innerHTML = `<strong>Total:</strong> <span>$${suma}</span>`
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
 const inputNombre = document.getElementById("nombre")
const inputDireccion = document.getElementById("direccion")

const errorNombre = document.getElementById("error-nombre")
const errorDireccion = document.getElementById("error-direccion")

let hayError = false

// resetear estados
errorNombre.style.display = "none"
errorDireccion.style.display = "none"

inputNombre.classList.remove("input-error")
inputDireccion.classList.remove("input-error")

// validar nombre
if (!inputNombre.value.trim()) {
  errorNombre.textContent = "Completá tu nombre"
  errorNombre.style.display = "block"
  inputNombre.classList.add("input-error")
  hayError = true
}

// validar dirección
if (!inputDireccion.value.trim()) {
  errorDireccion.textContent = "Completá tu dirección"
  errorDireccion.style.display = "block"
  inputDireccion.classList.add("input-error")
  hayError = true
}

if (hayError) {
  inputNombre.focus()
  return
}

const nombre = inputNombre.value.trim()
const direccion = inputDireccion.value.trim()
    

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