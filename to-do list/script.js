async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const response = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: taskInput.value })
    });

    if (response.ok) {
        const newTask = await response.json();
        const li = document.createElement('li');
        li.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = async function () {
            const delResponse = await fetch(`http://127.0.0.1:5000/tasks/${newTask.id}`, {
                method: 'DELETE'
            });
            if (delResponse.ok) {
                taskList.removeChild(li);
            }
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = ''; // Clear input
    } else {
        alert('Error adding task');
    }
}

async function loadTasks() {
    const response = await fetch('http://127.0.0.1:5000/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = async function () {
            const delResponse = await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
                method: 'DELETE'
            });
            if (delResponse.ok) {
                taskList.removeChild(li);
            }
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

window.onload = loadTasks;
