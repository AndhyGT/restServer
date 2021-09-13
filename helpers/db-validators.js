const bcryptjs = require('bcryptjs');


const Role = require('../models/role');
const {
    Usuario,
    Categoria,
    Producto
} = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}


const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la BD`)
    }
}

const incriptarPassword = async (password) => {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    const passwordIncriptado = bcryptjs.hashSync(password, salt);

    return passwordIncriptado;
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existeCategoria = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id categoria no existe ${id}`);
    }
}

const existeProducto = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id producto no existe ${id}`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitido, ${colecciones}`);
    }

    return true;
}

// await Usuario.findOne({ correo });
// if (existeEmail) {
//     return res.status(400).json({
//         msg: 'El correo ya esta registrado'
//     })
// }

module.exports = {
    esRoleValido,
    emailExiste,
    incriptarPassword,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}