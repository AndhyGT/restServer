const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, borrarCategoria, obtenerCategorias, obtenerCategoriaPorId, actualizarCategoria } = require('../controllers/categorias.controllers');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');

const routes = Router();

/**
 * {{url}}/api/categorias
 */

// obtener toda las categorias - publico
routes.get('/', obtenerCategorias);

// obtener una categoria por id - publico
routes.get('/:id', [
    check('id', 'No es un ID válido de Mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaPorId);

// crear categoria - privado - cualquier persona con token valido
routes.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// actualizar una categoria - privado - cualquiera con token valido
routes.put('/:id', [
    validarJWT,
    check('id', 'El ID no es valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
routes.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria)




module.exports = routes;