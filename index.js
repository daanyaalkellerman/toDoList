const form = document.getElementById('enter');
const taskInput = document.getElementById('taskAdded');
const tasks = document.getElementById('tasks');

form.addEventListener('submit', addTask);

function addTask(aT){
    aT.preventDefault();
    if(taskInput.value == '')
    {
        return;
    }

    const task = document.createElement('li');
    task.innerHTML = `
            <input type="checkbox">
            <p>${taskInput.value}</p>
            <button type="buttton">Delete</button>
            `;

            task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);

            task.querySelector('button').addEventListener('click', removeTask);

            tasks.appendChild(task);
            taskInput.value = '';
}

function toggleDone(aT){
    const task = aT.target.parentNode;
    task.querySelector('p').classLit.toggle('done')
}

function removeTask(aT){
    const task = aT.target.parentNode;
    tasks.removeChild(task);
}