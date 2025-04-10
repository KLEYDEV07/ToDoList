// ----------- LOGIN & REGISTRO (forms.html) -----------
const formulario = document.querySelector("form");
const input = document.getElementById("add-user");
const password = document.getElementById("add-password");
const boton = document.querySelector("button");
let modoRegistro = false;

if (formulario && input && password && boton) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        if (modoRegistro) {
            RegistrarUsuario();
            boton.textContent = "Iniciar sesión";
            modoRegistro = false;
        } else {
            validacion();
        }
    });

    function validacion() {
        const usuarioIngresado = input.value;
        const contraseniaIngresada = password.value;
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioExistente = usuariosGuardados.find(usuario => usuario.usuario === usuarioIngresado);

        if (!usuarioExistente) {
            alert("Usuario no existe. Puedes registrarte ahora.");
            boton.textContent = "Registrar";
            modoRegistro = true;
        } else {
            if (usuarioExistente.contrasenia === contraseniaIngresada) {
                alert("Bienvenido");
                window.location.href = "index.html";
            } else {
                alert("Contraseña incorrecta");
            }
        }
    }

    function RegistrarUsuario() {
        const NuevaContrasenia = password.value;
        const NuevoUsuario = input.value;
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

        const yaExiste = usuariosGuardados.find(u => u.usuario === NuevoUsuario);
        if (yaExiste) {
            alert("Ese usuario ya existe");
            return;
        }

        // ✅ Validación de seguridad de contraseña
        if (!contraseniaSegura(NuevaContrasenia)) {
            alert("La contraseña debe tener mínimo 6 caracteres, una mayúscula y un carácter especial.");
            return;
        }

        const NewUser = {
            usuario: NuevoUsuario,
            contrasenia: NuevaContrasenia
        };

        usuariosGuardados.push(NewUser);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        alert("Usuario registrado con éxito");
        input.value = "";
        password.value = "";
    }
}

// ----------- TO-DO LIST (index.html) -----------
const tareaInput = document.getElementById("input-tarea");
const botonAgregar = document.getElementById("agregar-tarea");
const lista = document.getElementById("contenedor-tareas");

if (tareaInput && botonAgregar && lista) {
    botonAgregar.addEventListener("click", function () {
        const tareaTexto = tareaInput.value.trim();

        if (tareaTexto !== "") {
            const nuevaTarea = document.createElement("li");
            nuevaTarea.textContent = tareaTexto;

            nuevaTarea.addEventListener("click", function () {
                nuevaTarea.classList.toggle("completada");
            });

            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", function () {
                nuevaTarea.remove();
            });

            nuevaTarea.appendChild(eliminarBtn);
            lista.appendChild(nuevaTarea);
            tareaInput.value = "";
        } else {
            alert("Por favor, escribí una tarea.");
        }
    });
}

// 🎛️ Configuración visual
const btnConfig = document.getElementById("btn-config");
const panelConfig = document.getElementById("panel-config");

const bgColor = document.getElementById("bg-color");
const textColor = document.getElementById("text-color");
const fontStyle = document.getElementById("font-style");
const fontSize = document.getElementById("font-size");
const btnReset = document.getElementById("btn-reset");

if (btnConfig) {
    btnConfig.addEventListener("click", () => {
        panelConfig.style.display = panelConfig.style.display === "none" ? "block" : "none";
    });
}

function aplicarEstilos() {
    document.body.style.backgroundColor = bgColor.value;
    document.body.style.color = textColor.value;
    document.body.style.fontFamily = fontStyle.value;
    document.body.style.fontSize = fontSize.value + "px";
}

[bgColor, textColor, fontStyle, fontSize].forEach(el => {
    el?.addEventListener("input", aplicarEstilos);
});

btnReset?.addEventListener("click", () => {
    document.body.style = "";
    bgColor.value = "#ffffff";
    textColor.value = "#000000";
    fontStyle.value = "Arial";
    fontSize.value = 16;
    panelConfig.style.display = "none";
});

// ✅ Función de validación de contraseña segura
function contraseniaSegura(password) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const largoMinimo = password.length >= 6;

    return tieneMayuscula && tieneEspecial && largoMinimo;
}
