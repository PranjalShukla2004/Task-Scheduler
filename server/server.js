const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

let tasks = [];
// to get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// to add a new task
app.post('/tasks', (req, res) => {
    const { id, text } = req.body;
    if (text) {
        tasks.push({ id, text });
        return res.status(201).json({ message: 'Task added successfully', tasks });
    }
    res.status(400).json({ message: 'Task text is required' });
});

//  yto delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully', tasks });
});

// to edit a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { text } = req.body;
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.text = text;
        }
        return task;
    });
    res.json({ message: 'Task updated successfully', tasks });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});