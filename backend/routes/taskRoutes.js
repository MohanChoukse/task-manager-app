const express = require('express');
const { getTasks, createTask, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for logged-in user
router.get('/', getTasks);

// POST /api/tasks - Create new task
router.post('/', createTask);

// PUT /api/tasks/:id - Update task status
router.put('/:id', updateTaskStatus);

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', deleteTask);

module.exports = router; 