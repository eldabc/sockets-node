const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io(); //mantiene el estado de comunicación con el servidor

socket.on('connect', () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  // console.log('Cliente desconectado');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';

});

socket.on('enviar-mensaje', ( payload ) => {
  console.log(payload)
})

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;

  // enviar mensaje a todos
  socket.emit('enviar-mensaje-todos', mensaje);//emite en evento

  // eviar feedback al cliente que hizo la solicitud
  socket.emit('enviar-mensaje' , mensaje, ( objeto ) => {
    console.log('Desde el server:', objeto);
  });
  
});

