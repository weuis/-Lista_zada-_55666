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
