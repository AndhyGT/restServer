const { Router } = require('express');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/users.controllers');

const routes = Router();


routes.get('/', usuariosGet);

routes.post('/', usuariosPost);

routes.put('/:id', usuariosPut);

routes.patch('/', usuariosPatch);

routes.delete('/', usuariosDelete);



module.exports = routes;