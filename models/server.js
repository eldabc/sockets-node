const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {

        this.app      = express();
        this.port     = process.env.PORT;
        this.server   = require('http').createServer(this.app); //es el server que se debe levantar
        this.io       = require('socket.io')(this.server);//toda la info de los socket conectador se puede usar para mandar informacion a todos los clientes conectados

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {}

    sockets() {

        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;