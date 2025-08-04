const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const alertBox = document.getElementById('alertBox');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function showAlert(message, type = 'success') {
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    setTimeout(() => alertBox.innerHTML = '', 3000);
}

function updateTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center`;

        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>
            <div>
                <button class="btn btn-sm btn-success me-1" onclick="toggleTask(${index})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        showAlert('Task cannot be empty!', 'danger');
        return;
    }

    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    showAlert('Task added successfully!');
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showAlert('Task deleted!', 'warning');
    updateTaskList();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});


updateTaskList();
