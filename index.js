//declare variables
const form = document.getElementById('enter');
const taskInput = document.getElementById('taskAdded');
const tasks = document.getElementById('tasks');


document.addEventListener('DOMContentLoaded', loadTasks);
form.addEventListener('submit', addTask);

// sorts tasks alphabetically
function sortTasks() {
    const list = Array.from(tasks.children);
    const sorted = list.sort((a, b) => {
        const aText = a.querySelector('p').innerText.toLowerCase();
        const bText = b.querySelector('p').innerText.toLowerCase();
        return aText.localeCompare(bText);
    });
    tasks.innerHTML = '';

    // Append the sorted task elements
    sorted.forEach(task => {
        tasks.appendChild(task);
    });

    // Save the sorted tasks to local storage
    taskTLS();
}
//Add a new task
function addTask(aT) {
    // stop the default form submission behavior
    aT.preventDefault();

    // check if theres no input
    if (taskInput.value == '') {
        return;
    }

    // makes a new task element
    const task = document.createElement('li');
    task.innerHTML = `
        <input type="checkbox">
        <p>${taskInput.value}</p>
        <button type="buttton">Delete</button>
    `;

    // event listeners for checkbox change and delete button click
    task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
    task.querySelector('button').addEventListener('click', removeTask);

    tasks.appendChild(task);
    // clears the input
    taskInput.value = '';

    taskTLS();
    // sorts tasks alphabetically and updates on screen
    sortTasks();
}

//  when the checkbox is changed it toggles the "done" class
function toggleDone(aT) {
    const task = aT.target.parentNode;
    task.querySelector('p').classList.toggle('done');

    taskTLS();
}

// removes tasks when clicked
function removeTask(aT) {
    const task = aT.target.parentNode;
    tasks.removeChild(task);

    taskTLS();
}

// save tasks to local storage
function taskTLS() {
    //puts all tasks in an array
    const taskList = Array.from(tasks.children);

    // saves task text as JSON
    const taskTexts = taskList.map(task => task.querySelector('p').innerText);
    localStorage.setItem('tasks', JSON.stringify(taskTexts));
}

// get tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');

    // checks for stored tasks
    if (storedTasks) {
        const taskTexts = JSON.parse(storedTasks);

        tasks.innerHTML = '';

        // makes task element for each stored task
        taskTexts.forEach(taskText => {
            const task = document.createElement('li');
            task.innerHTML = `
                <input type="checkbox">
                <p>${taskText}</p>
                <button type="button">Delete</button>
            `;

            task.querySelector('input[type="checkbox"]').addEventListener('change', toggleDone);
            task.querySelector('button').addEventListener('click', removeTask);

            tasks.appendChild(task);
        });
    }
}


