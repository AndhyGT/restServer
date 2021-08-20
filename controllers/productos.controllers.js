const { request, response } = require('express');
const { Producto } = require('../models');

// obtenerProducto- paginados - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}
// obtenerProducto - populate {}
const obtenerProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Categoria
        .findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
}

// crear producto
const crearProducto = async (req, res = responses) => {

    const { estado, usuario, ...body } = req.body;

    const productoBD = await Producto.findOne({ nombre });

    if (productoBD) {
        return res.status(400).json({
            msg: `El producto ${productoBD.nombre} ya existe`
        });
    }

    // Generar los datos a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(s),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json({
        producto
    });
}

// actualizarProducto
const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

// borrarProducto - estado:false
const borrarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(producto)
}

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
}