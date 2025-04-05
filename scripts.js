const agregarTarea = document.getElementById("add-task");
const botonTareas = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("task-list");

agregarTarea.addEventListener('click', () => {
    const tareas = botonTareas.value;

    if (tareas.trim() === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerText = tareas;

    const eliminarTarea = document.createElement('button');
    eliminarTarea.innerText = 'Eliminar';
    eliminarTarea.classList.add('eliminar');

    eliminarTarea.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completadas');
    });

    taskItem.appendChild(eliminarTarea);
    listaTareas.appendChild(taskItem);

    botonTareas.value = "";
});
