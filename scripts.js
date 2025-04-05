const agregarTarea = document.getElementById("add-task");
const botonTareas = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("task-list");

// Cargar tareas almacenadas al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasGuardadas.forEach(tarea => agregarTareaDOM(tarea.texto, tarea.completada));
});

agregarTarea.addEventListener('click', () => {
    const texto = botonTareas.value;

    if (texto.trim() === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    agregarTareaDOM(texto);
    guardarTarea(texto);

    botonTareas.value = "";
});

// Función para agregar tarea al DOM con checkbox
function agregarTareaDOM(texto, completada = false) {
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completada;

    const label = document.createElement('span');
    label.innerText = texto;
    if (completada) label.classList.add('completadas');

    checkbox.addEventListener('change', () => {
        label.classList.toggle('completadas');
        toggleCompletada(texto);
    });

    const eliminarTarea = document.createElement('button');
    eliminarTarea.innerText = 'Eliminar';
    eliminarTarea.classList.add('eliminar');

    eliminarTarea.addEventListener('click', () => {
        taskItem.remove();
        eliminarTareaLocal(texto);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(eliminarTarea);
    listaTareas.appendChild(taskItem);
}

// Guardar nueva tarea
function guardarTarea(texto) {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push({ texto, completada: false });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Eliminar tarea del localStorage
function eliminarTareaLocal(texto) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.filter(tarea => tarea.texto !== texto);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Cambiar estado completado
function toggleCompletada(texto) {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tarea = tareas.find(t => t.texto === texto);
    if (tarea) {
        tarea.completada = !tarea.completada;
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
}
