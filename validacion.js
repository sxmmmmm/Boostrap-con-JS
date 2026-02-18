let usuario = document.getElementById("usuario")
let mensaje = document.getElementById("mensaje")
let caracteres = document.getElementById("caracteres")


usuario.addEventListener("input", function(evento){
    mensaje.classList.remove('text-danger', 'text-success');

    if(this.value ==  this.value.replace(/^[a-z]+$/)) {
        this.style.borderColor = "red"
        mensaje.textContent = "usuario invalido"
        mensaje.classList.add('text-danger')
    }else {
        this.style.borderColor = "green"
        mensaje.textContent = "usuario valido"
        mensaje.classList.add('text-success')
    }

    //verificacion caracteres
    if (this.value.length < 3) {
        this.style.borderColor = "red"
        mensaje.textContent = "El usuario tiene menos de 3 caracteres"
        mensaje.classList.add('text-danger')
    }

})

//contador de caracteres contraseña
let password = document.getElementById("password")
let requisito = document.getElementById("requisito")

    password.addEventListener("input", function(evento){
        requisito.classList.remove('text-danger', 'text-success');
    if(this.value.length < 10) {
        this.style.borderColor = "red"
        requisito.textContent = "Minimo 10 caracteres para la contraseña"
        requisito.classList.add('text-danger')
    }else{
        this.style.borderColor = "green"
        requisito.textContent = "La contraseña es valida"
        requisito.classList.add('text-success')
    }
    })



    