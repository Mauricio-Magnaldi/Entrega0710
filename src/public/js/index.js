//Websocket lado cliente.
console.log("Probando el cliente.");

const socketClient = io();

const form = document.getElementById('form');
//const inputName = document.getElementById('nameChat');
const inputPrecio = document.getElementById('precio');

form.onsubmit = (event) => {
    //Esto se debe hacer en el callback siempre para que no se refresque la página.
    event.preventDefault();
    //const userName = inputName.value;
    const precio = inputPrecio.value;
    socketClient.emit('eventoDesdeElCliente', precio);
    //socketClient.emit('eventoDesdeElCliente', userName);
    //console.log(`El usuario ${userName} está en el chat.`);
};

socketClient.on('eventoDesdeElServidor', (info) => {
    //console.log(`Informacion enviada desde el servidor al cliente: ${info}`);
    console.log(`El ultimo precio es: ${info}.`);
});

