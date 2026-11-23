const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto

app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    // Validar que lleguen los tres campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    // Convertir el precio a número
    const precioNumero = parseFloat(precio)

    // Reto opcional: el precio debe ser un número mayor que cero
    if (isNaN(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un número mayor que cero' })
    }

    // Generar un id nuevo que no se repita (máximo id actual + 1)
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: precioNumero
    }

    // Agregar al arreglo y responder con 201
    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
})

// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Si el producto no existe, responder 404
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const { nombre, descripcion, precio } = req.body

    // Validar que lleguen los tres campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({ mensaje: 'Los campos nombre, descripcion y precio son obligatorios' })
    }

    const precioNumero = parseFloat(precio)

    // Reto opcional: el precio debe ser un número mayor que cero
    if (isNaN(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({ mensaje: 'El precio debe ser un número mayor que cero' })
    }

    // Reemplazar los datos conservando el mismo id
    productos[indice] = {
        id,
        nombre,
        descripcion,
        precio: precioNumero
    }

    res.status(200).json(productos[indice])
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const indice = productos.findIndex(p => p.id === id)

    // Si el producto no existe, responder 404
    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    // splice devuelve un arreglo con el elemento eliminado
    const eliminado = productos.splice(indice, 1)[0]

    res.json({ mensaje: 'Producto eliminado', producto: eliminado })
})


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
