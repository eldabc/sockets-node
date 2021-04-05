const socketController = (socket) => { 

    console.log("Cliente conectado", socket.id);

    //cuando se desconecta el cliente 
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // Enviar mensaje al cliente que emitió el evento
    socket.on('enviar-mensaje', ( mensaje, callback ) => {
        const id = 123; //id que se generaria si enviaramos a bd
        callback( { id, fecha: new Date().getTime(), message: mensaje } ); //retorno el objeto esto es para cuando queremos devolver al fron el resultado de lo realizado en el back
        
        // mensaje de difusión
        socket.broadcast.emit('enviar-mensaje', { id: 'idGenerated', message: mensaje } );
    })
}

module.exports = {
    socketController
}