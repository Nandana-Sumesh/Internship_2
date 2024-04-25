window.addEventListener('load', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];



function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('list-item');

    
    const isCompleted = task.startsWith('[Completed]');


    const taskText = isCompleted ? task.substring(11) : task;

    li.innerHTML = `
    <div class="header-item">${taskText}</div>
    <div class="header-item status${!isCompleted ? ' bold' : ''}">${isCompleted ? 'Completed' : 'Pending'}</div>
    <div class="header-item"><button class="removeBtn">Remove</button></div>
  `;

    li.querySelector('.removeBtn').addEventListener('click', () => {
      removeTask(index);
    });
    taskList.appendChild(li);
  });
}

  renderTasks();


  addTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskInput.value = '';
    }
  });


  function toggleTaskCompletion(index) {
    tasks[index] = tasks[index].startsWith('[Completed]') ? tasks[index].substring(11) : '[Completed] ' + tasks[index];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }


  function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});

