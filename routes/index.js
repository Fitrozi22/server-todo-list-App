const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const todoListRouter = require('./todoList');
const titleListRouter = require('./titleList');

router.use('/api/users', userRouter);
router.use('/api/todolist', todoListRouter);
router.use('/api/titlelist', titleListRouter);



module.exports = router