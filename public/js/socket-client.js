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
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});


socket.on('enviar-mensaje', ( payload ) => {
  console.log(payload)
})


btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value;

  // callback para enviar feedback al cliente que hizo la solicitud
  socket.emit('enviar-mensaje' , mensaje, ( callback ) => {
    console.log('Desde el server:', callback);
  });
  
});

