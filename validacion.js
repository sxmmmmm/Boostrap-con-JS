let usuario = document.getElementById("usuario");

usuario.addEventListener("input", function(evento){
    mensaje.classList.remove('text-danger', 'text-success');
    if(this.value == this.value.replace(/^[a-z]+$/)) {
        this.style.borderColor = "red"
        mensaje.textContent = "usuario invalido"
        mensaje.classList.add('text-danger')
    }else {
        this.style.borderColor = "green"
        mensaje.textContent = "usuario valido"
        mensaje.classList.add('text-success')
    }
})
