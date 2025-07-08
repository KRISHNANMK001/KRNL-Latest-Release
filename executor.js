class Executor {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    add(task) {
        this.queue.push(task);
        this.runNext();
    }

    async runNext() {
        if (this.running || this.queue.length === 0) return;
        this.running = true;
        const task = this.queue.shift();
        try {
            await task();
        } catch (e) {
            console.error('Task failed:', e);
        }
        this.running = false;
        this.runNext();
    }
}

function createTask(id, delay) {
    return () => new Promise((resolve) => {
        console.log(`Starting task ${id}`);
        setTimeout(() => {
            console.log(`Finished task ${id}`);
            resolve();
        }, delay);
    });
}

const executor = new Executor();

executor.add(createTask(1, 1000));
executor.add(createTask(2, 500));
executor.add(createTask(3, 1500));
