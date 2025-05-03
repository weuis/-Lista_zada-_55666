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

    }
}

