const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io(); //mantiene el estado de comunicación con el servidor

socket.on('connect', () => {
  // console.log('Conectado');
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  console.log('Cliente desconectado');

  lblOnline.style.display = 'none';
  lblOffline.style.display = '';

});

socket.on('enviar-mensaje', ( payload ) => {
  console.log(payload)
})

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;

  socket.emit('enviar-mensaje' , mensaje);//emite en evento
  // console.log(mensaje);
});

