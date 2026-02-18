// ── Referencias ──────────────────────────────────────────────────────
let usuario       = document.getElementById("usuario")
let mensaje       = document.getElementById("mensaje")
let password      = document.getElementById("password")
let requisito     = document.getElementById("requisito")
let fortalezaLabel = document.getElementById("fortalezaLabel")
let intentosMsg   = document.getElementById("intentosMsg")
let bloqueoMsg    = document.getElementById("bloqueoMsg")
let contador      = document.getElementById("contador")
let btnEnviar     = document.getElementById("btnEnviar")
let segments      = [
    document.getElementById("seg1"),
    document.getElementById("seg2"),
    document.getElementById("seg3"),
    document.getElementById("seg4"),
]

// ── Estado ────────────────────────────────────────────────────────────
let intentosFallidos = 0
const MAX_INTENTOS   = 3
const TIEMPO_BLOQUEO = 30
let bloqueado        = false

// ── Validación de usuario ─────────────────────────────────────────────
usuario.addEventListener("input", function(evento) {
    mensaje.classList.remove('text-danger', 'text-success')

    // Verificación de caracteres mínimos (va primero para tener prioridad)
    if (this.value.length < 3) {
        this.style.borderColor = "red"
        mensaje.textContent = "El usuario tiene menos de 3 caracteres"
        mensaje.classList.add('text-danger')
        return
    }

    // Verificación de formato: solo letras y números
    if (!(/^[a-zA-Z0-9]+$/.test(this.value))) {
        this.style.borderColor = "red"
        mensaje.textContent = "Usuario inválido: solo letras y números"
        mensaje.classList.add('text-danger')
    } else {
        this.style.borderColor = "green"
        mensaje.textContent = "Usuario válido"
        mensaje.classList.add('text-success')
    }
})

// ── Fortaleza de contraseña ───────────────────────────────────────────
function calcularFortaleza(pass) {
    let puntos = 0
    if (pass.length >= 10)                          puntos++ // longitud mínima
    if (pass.length >= 16)                          puntos++ // longitud larga
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass))  puntos++ // mayus + minus
    if (/[0-9]/.test(pass))                         puntos++ // número
    if (/[^a-zA-Z0-9]/.test(pass))                  puntos++ // símbolo
    return Math.min(4, puntos)
}

const fortalezaConfig = [
    { label: "",          color: "#dee2e6" }, // 0 - vacío
    { label: "Débil",     color: "#dc3545" }, // 1 - rojo Bootstrap
    { label: "Regular",   color: "#ffc107" }, // 2 - amarillo Bootstrap
    { label: "Buena",     color: "#0d6efd" }, // 3 - azul Bootstrap
    { label: "Fuerte ✓",  color: "#198754" }, // 4 - verde Bootstrap
]

function actualizarFortaleza(pass) {
    const nivel = pass.length === 0 ? 0 : Math.max(1, calcularFortaleza(pass))
    const cfg   = fortalezaConfig[nivel]

    segments.forEach(function(seg, i) {
        seg.style.background = i < nivel ? cfg.color : "#dee2e6"
    })

    fortalezaLabel.textContent  = cfg.label
    fortalezaLabel.style.color  = cfg.color
}

// ── Validación de contraseña ──────────────────────────────────────────
password.addEventListener("input", function(evento) {
    requisito.classList.remove('text-danger', 'text-success')
    actualizarFortaleza(this.value)

    if (this.value.length < 10) {
        this.style.borderColor = "red"
        requisito.textContent = "Mínimo 10 caracteres para la contraseña"
        requisito.classList.add('text-danger')
    } else {
        this.style.borderColor = "green"
        requisito.textContent = "La contraseña es válida"
        requisito.classList.add('text-success')
    }
})

// ── Sistema de bloqueo ────────────────────────────────────────────────
function iniciarBloqueo() {
    bloqueado = true
    bloqueoMsg.classList.remove('d-none')
    btnEnviar.disabled = true
    let restantes = TIEMPO_BLOQUEO
    contador.textContent = restantes

    let intervalo = setInterval(function() {
        restantes--
        contador.textContent = restantes

        if (restantes <= 0) {
            clearInterval(intervalo)
            // Desbloquear
            bloqueado            = false
            intentosFallidos     = 0
            btnEnviar.disabled   = false
            bloqueoMsg.classList.add('d-none')
            intentosMsg.textContent = "Intentos fallidos: 0 / 3"
            intentosMsg.className   = ""
            // Limpiar campos
            usuario.value   = ""
            password.value  = ""
            usuario.style.borderColor  = ""
            password.style.borderColor = ""
            mensaje.textContent   = ""
            requisito.textContent = ""
            actualizarFortaleza("")
        }
    }, 1000)
}

// ── Envío del formulario ──────────────────────────────────────────────
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault()
    if (bloqueado) return

    // Comprobar si ambos campos son válidos
    const usuarioValido  = usuario.value.length >= 3 && /^[a-zA-Z0-9]+$/.test(usuario.value)
    const passwordValida = password.value.length >= 10

    if (!usuarioValido || !passwordValida) {
        intentosFallidos++
        intentosMsg.textContent = "Intentos fallidos: " + intentosFallidos + " / " + MAX_INTENTOS

        if (intentosFallidos === 2) intentosMsg.className = "text-warning"
        if (intentosFallidos >= MAX_INTENTOS) {
            intentosMsg.className = "text-danger"
            iniciarBloqueo()
        }
    } else {
        // Formulario correcto
        intentosFallidos = 0
        intentosMsg.textContent = "Intentos fallidos: 0 / 3"
        intentosMsg.className   = ""
        alert("Formulario enviado correctamente ✓")
    }
})
