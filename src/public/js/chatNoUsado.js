const socketClient = io();

const form = document.getElementById("formChat");
const inputMessage = document.getElementById("inputChat");
const h3 = document.getElementById("h3Id");
const div = document.getElementById("divId");

let usuario;

Swal.fire({
    title: 'Bienvenido',
    text: 'Ingresa tu nombre',
    input: 'text',
    inputValidator: value => {
        if(!value) {
            return "Debes ingresar un nombre."
        }
    },
    confirmButtonText: 'Aceptar',
  }).then((input) => {
    usuario = input.value;
    h3.innerText = `${usuario}`;
    socketClient.emit("nuevoUsuario", usuario);
});

socketClient.on('nuevoUsuarioBroadcast', (usuario) => {
    Toastify({
        text: `${usuario} conectado`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c73d)",
          },
      }).showToast();    
});

form.onsubmit = (evento) => {
    evento.preventDefault();
    const informacionMensaje = {
        nombre: usuario,
        mensaje: input.value, 
    };
    socketClient.emit("mensaje", informacionMensaje);
}

socketClient.on('nuevoUsuarioBroadcast', (usuario) => {
    console.log(`${usuario}`);
});

form.onsubmit = (evento) => {
    evento.preventDefault();
    const infoMensaje = {
        nombre: usuario,
        mensaje: inputMessage.value,
    }
    socketClient.emit("mensaje", infoMensaje);
    //Se limpia el texto escrito en el input después de haber dado enter.
    document.getElementById("inputChat").value = ""; 
};

socketClient.on("chat", (mensajes) => {
    const chat = mensajes.map(
        (objetoMensaje) =>`<p>${objetoMensaje.nombre}, ${objetoMensaje.mensaje}</p>`).join(' ');
    console.log(mensajes);
    div.innerHTML = chat;
});    