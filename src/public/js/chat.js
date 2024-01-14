const socketClient = io();

const email = document.getElementById("emailH3");
const form = document.getElementById("chatForm");
const message = document.getElementById("messageInput");
const chatD = document.getElementById("chatDiv");

let usuario;

Swal.fire({
    title: 'Bienvenido al chat del ecommerce.',
    text: 'Ingresa tu email.',
    input: 'email',
    inputValidator: (value) => {
      //Evalua si se ingreso algo en el input.
        if (!value) {
        return 'Debes ingresar tu email.';
      }
      /*
      Evalua si lo que se ingreso en el input, se corresponde con una dirección de email. Para esto se utiliza
      la función isValidEmail
      */
      if (!isValidEmail(value)) {
        return 'Ingresa una dirección de correo electrónico válida.';
      }
    },
    confirmButtonText: 'Aceptar',
}).then((input) => {
        usuario = input.value;
      email.innerText = `email: ${usuario}`;
      socketClient.emit("nuevoUsuario", usuario);
    }
  )
 
  //Funcion que verifica si lo ingresado es un email.
  function isValidEmail(email) {
    const emailDireccion = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailDireccion.test(email);
  }

socketClient.on('nuevoUsuarioBroadcast', (usuario) => {
    Toastify({
        text: `${usuario} conectado.`,
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c73d)",
          },
      }).showToast();
      console.log(`${usuario}`);    
});


form.onsubmit = (evento) => {
    evento.preventDefault();
    const infoMensaje = {
        nombre: usuario,
        mensaje: message.value,
    }
    socketClient.emit("mensaje", infoMensaje);
    //Se limpia el texto escrito en el input después de haber dado enter.
   document.getElementById("messageInput").value = ""; 
};

socketClient.on("chat", (mensajes) => {
    const chat = mensajes.map((objetoMensaje) => 
        `<p>${objetoMensaje.nombre}: ${objetoMensaje.mensaje}</p>`).join(' ')
    chatD.innerHTML = chat
    });    