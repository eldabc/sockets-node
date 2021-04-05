const express = require('express');
const cors = require('cors');

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

        this.io.on('connection', socket => { 
            // console.log("Cliente conectado", socket.id);

            //para desconectar cliente 
            socket.on('disconnect', () => {
                // console.log('Cliente desconectado', socket.id);
            });

            // Enviar mensaje al cliente que emitió el evento
            socket.on('enviar-mensaje', ( mensaje, callback ) => {
                const id = 123; //id que se generaria si enviaramos a bd
                callback( { id, fecha: new Date().getTime() } ); //retorno el objeto esto es para cuando queremos devolver al fron el resultado de lo realizado en el back

            });

            // enviar mensaje a todos los clientes
            socket.on('enviar-mensaje-todos', ( mensaje ) => {
                const payload = {
                    mensaje,
                    id: 11,
                    body: "Test Menssagge TODOS"
                }
                this.io.emit('enviar-mensaje', payload );
            });
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;