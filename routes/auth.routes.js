const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSinging } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const routes = Router();


routes.post('/login', [
    //    validarJWT,
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


routes.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSinging);


module.exports = routes;