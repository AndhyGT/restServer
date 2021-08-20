const { Router } = require('express');
const { check } = require('express-validator');

const {
    crearProducto,
    borrarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto } = require('../controllers/productos.controllers');

const { existeProducto } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/productos
 */

// obtener todo los productos
router.get('/', obtenerProductos);

// Obtener un prodocuto por id - publico
router.get('/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProductoPorId);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es ID de Mongo').isMongoId(),
    check('categoria').custom(existeProducto),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('categoria', 'No es ID de Mongo').isMongoId(),
    check('id', 'No es ID de Mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;