const express = require('express');
const router = express.Router();
const todoListController = require('../controllers/todolistController');

router.post('/', todoListController.createTodoList);
router.get('/', todoListController.getAllTodoList);
router.get('/:id', todoListController.getTodoListById);
router.put('/:id', todoListController.updateTodoList);
router.delete('/:id', todoListController.deleteTodoList);

module.exports = router