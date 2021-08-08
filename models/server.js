const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categorys: '/api/categorias',
            users: '/api/usuarios'
        }


        // Conectar a base de datos
        this.conectarDB();

        // middleware
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.categorys, require('../routes/categorias.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en: ', this.port);
        });
    }
}

module.exports = Server;