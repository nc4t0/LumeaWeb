let productos = [{
    nombre: "Lavandina en gel x 1 Lt",
    precio: "1500",
    descripcion: "El mejor gel para limpiar superficies",
    imagen: "./img/Lavandina (1).jpg"
},
{
    nombre: "Desodorante de piso x 5 Lts",
    precio: "2500",
    descripcion: "consultar fragancias disponibles",
    imagen: "./img/Desodorante.jpg"
},
{
    nombre: "Lavandina x 5 Lts",
    precio: "3000",
    descripcion: "Lavandina concentrada para limpieza",
    imagen: "./img/Lavandina.jpg"
}
]

let contenedor = document.getElementById("productos")

productos.forEach(producto => {
    contenedor.innerHTML += `
    <div class="card">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      
      <div class="card-body">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <button class="btn-agregar">Agregar</button>
      </div>
    </div>
  `
})