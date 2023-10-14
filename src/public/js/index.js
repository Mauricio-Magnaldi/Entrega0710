const socketClient = io();
const form = document.getElementById('form');
const inputName = document.getElementById('emailChat');

form.onsubmit = (event) => {
    event.preventDefault();
    const userName = inputName.value;
    socketClient.emit('mensajeEvento', userName);
};

