class Task {
    constructor(id, content, user, priority, category, status = 'pending') {
        this.id = id;
        this.content = content;
        this.user = user;
        this.priority = priority;
        this.category = category;
        this.status = status;
        this.createdAt = new Date().toLocaleString();
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.renderTasks();
    }

    addTask(content, user, priority, category) {
        const id = Date.now();
        const newTask = new Task(id, content, user, priority, category);
        this.tasks.push(newTask);
        this.saveAndRender();
    }

    toggleStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = task.status === 'pending' ? 'done' : 'pending';
            this.saveAndRender();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
    }

    saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.renderTasks(currentFilter, currentCategory);
    }

    renderTasks(statusFilter = 'all', categoryFilter = 'all') {
        const list = document.getElementById('task-list');
        list.innerHTML = '';

        let filtered = [...this.tasks];

        if (statusFilter !== 'all') {
            filtered = filtered.filter(t => t.status === statusFilter);
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(t => t.category === categoryFilter);
        }

        if (filtered.length === 0) {
            list.innerHTML = '<p class="text-center text-gray-500">Brak zadań.</p>';
            return;
        }

        filtered.forEach(task => {
            const li = document.createElement('li');
            li.className = `p-4 rounded-lg shadow border flex justify-between items-start ${task.status === 'done' ? 'bg-green-100' : 'bg-yellow-50'}`;

            li.innerHTML = `
        <div>
          <h3 class="font-semibold text-lg">${task.content}</h3>
          <p class="text-sm text-gray-600">
            ${task.user} • ${task.createdAt}<br>
            ${task.priority} • ${task.category} • ${task.status === 'done' ? 'Zakończone' : 'Oczekujące'}
          </p>
        </div>
        <div class="space-x-2">
          <button class="toggle-status bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" data-id="${task.id}">
            ${task.status === 'done' ? 'Cofnij' : 'Gotowe'}
          </button>
          <button class="delete-task bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" data-id="${task.id}">Usuń</button>
        </div>`;

            list.appendChild(li);
        });

        document.querySelectorAll('.toggle-status').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);
                this.toggleStatus(id);
            });
        });

        document.querySelectorAll('.delete-task').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);
                this.deleteTask(id);
            });
        });

    }
}

const taskManager = new TaskManager();
let currentFilter = 'all';
let currentCategory = 'all';

document.getElementById('add-task').addEventListener('click', () => {
    const content = document.getElementById('task-content').value.trim();
    const user = document.getElementById('task-user').value.trim();
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;

    if (!content || !user) {
        alert('Wpisz treść i użytkownika!');
        return;
    }

    taskManager.addTask(content, user, priority, category);

    document.getElementById('task-content').value = '';
    document.getElementById('task-user').value = '';
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        taskManager.renderTasks(currentFilter, currentCategory);
    });
});

document.getElementById('filter-category').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    taskManager.renderTasks(currentFilter, currentCategory);
});

