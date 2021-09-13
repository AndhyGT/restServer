const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorys: '/api/categorias',
            products: '/api/productos',
            users: '/api/usuarios',
            uploads: '/api/uploads'
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

        // FileUpload - Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.users, require('../routes/users.routes'));
        this.app.use(this.paths.categorys, require('../routes/categorias.routes'));
        this.app.use(this.paths.products, require('../routes/productos.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en: ', this.port);
        });
    }
}

module.exports = Server;