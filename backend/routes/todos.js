const express = require('express');

const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId, deleted: { $ne: true } }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



router.get('/trash', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId, deleted: true }).sort({ deletedAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const todo = await Todo.create({ text, user: req.userId });
        res.status(201).json(todo);
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const { text, completed } = req.body;

        if (text !== undefined) {
            todo.text = text;
        }

        if (completed !== undefined) {
            todo.completed = completed;
        }

        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.userId, deleted: { $ne: true } });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.deleted = true;
        todo.deletedAt = new Date();
        await todo.save();

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



router.put('/:id/restore', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.userId, deleted: true });

        if (!todo) {
            return res.status(400).json({ message: 'Todo not found in trash' });
        }

        todo.deleted = false;
        todo.deletedAt = null;
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

