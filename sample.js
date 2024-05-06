function handleListClick(event) {
  const listName = event.target.textContent.trim();
  document.querySelector('.main-content').innerHTML = `
    <h1>${listName}</h1>
    <div class="task-list" id="task-list">
      <h2>Task List</h2>
      <!-- Task items will be added here -->
    </div>
  `;

  if (listName === "📝 Tasks") {
    const addTaskSection = document.createElement('div');
    addTaskSection.classList.add('add-task');
    addTaskSection.innerHTML = `
      <input type="text" id="new-task" placeholder="Add a new task...">
      <button onclick="handleAddTask()">+ Task</button>
    `;
    document.querySelector('.main-content').appendChild(addTaskSection);

     const completedTasksSection = document.createElement('div');
     completedTasksSection.classList.add('completed-tasks');
     completedTasksSection.id = 'completed-tasks';
     completedTasksSection.innerHTML = `
       <h2>Completed Tasks</h2>
       <!-- Completed task items will be added here -->
     `;
     document.querySelector('.main-content').appendChild(completedTasksSection);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    tasks.forEach(taskName => {
      const newTaskItem = document.createElement('div');
      newTaskItem.classList.add('task-item');
      newTaskItem.innerHTML = `
        <input type="radio" name="task" class="task-checkbox">
        <span>${taskName}</span>
      `;
      if (taskName.startsWith('✔️ ')) {
        const completedTask = newTaskItem.cloneNode(true);
        completedTask.classList.add('completed-task');
        completedTask.querySelector('input').remove();
        completedTasksList.appendChild(completedTask);
      } else {
      taskList.appendChild(newTaskItem);
    }
  });
  }
}
  function handleAddTask() {
  const taskInput = document.getElementById('new-task');
  const taskName = taskInput.value.trim();
  if (taskName) {
    const taskList = document.getElementById('task-list');
    const newTaskItem = document.createElement('div');
    newTaskItem.classList.add('task-item');
    newTaskItem.innerHTML = `
      <input type="radio" name="task" class="task-checkbox">
      <span>${taskName}</span>
    `;
    
    taskList.appendChild(newTaskItem);
    taskInput.value = '';
    taskInput.focus();

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    
    newTaskItem.querySelector('.task-checkbox').addEventListener('change', function() {
      if (this.checked) {
        const completedTask = this.parentNode.cloneNode(true);
        completedTask.classList.add('completed-task');
        completedTask.querySelector('input').remove();
        document.getElementById('completed-tasks').appendChild(completedTask);
        this.parentNode.remove(); 
      }
    });
  }
}

function handleAddList() {
  const newListName = prompt('Enter the name of the new list:');
  if (newListName) {
    const newButton = document.createElement('button');
    newButton.classList.add('list-button');
    newButton.textContent = newListName;
    document.querySelector('.sidebar').insertBefore(newButton, document.getElementById('add-list-button'));
    newButton.addEventListener('click', handleListClick);
  }
}

function handleMoveCompletedTasks() {
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(taskItem => {
    const taskCheckbox = taskItem.querySelector('.task-checkbox');
    if (taskCheckbox.checked) {
      const completedTask = taskItem.cloneNode(true);
      completedTask.classList.add('completed-task');
      completedTask.querySelector('.task-checkbox').remove();
      document.getElementById('completed-tasks').appendChild(completedTask);
      taskItem.remove();
    }
  });
}
document.querySelectorAll('.list-button').forEach(button => {
  button.addEventListener('click', handleListClick);
});

document.getElementById('add-list-button').addEventListener('click', handleAddList);

document.getElementById('move-completed-tasks').addEventListener('click', handleMoveCompletedTasks);


handleListClick({ target: { textContent: '📝 Tasks' } });