document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        updateTaskList();
        taskInput.value = '';
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    
    // Only fill progress bar if tasks are completed
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
    if(tasks.length && completeTasks === totalTasks){
        blaskconfetti();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('taskItem');
        listItem.innerHTML = `
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fas fa-edit" onclick="editTask(${index})"></i>
                <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        `;
        taskList.appendChild(listItem);
    });
};


document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

const blaskconfetti =() =>{
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
}
