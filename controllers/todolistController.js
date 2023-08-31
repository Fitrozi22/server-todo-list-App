const {todoList} = require('../models');

class todoListController {
    static async createTodoList(req, res, next) {
        try {
            const {title, description, status, titleList_id} = req.body;
            const NewTodoList = await todoList.create({title, description, status, titleList_id});
            res.status(200).json(NewTodoList);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getAllTodoList(req, res) {
        try {
            const data = await todoList.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getTodoListById(req, res) {
        try {
            const data = await todoList.findByPk(req.params.id);
            if(!data) {
                res.status(404).json({
                    message: 'Todo list not found'
                })
            }
            res.json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async updateTodoList(req, res) {
        try {
            const {id} = req.params;
            const data = await todoList.findByPk(id);
            if(!data) {
                res.status(404).json({
                    message: 'Todo list not found'
                })
            }
            const {title, description, status, titleList_id} = req.body;
            todoList.update({title, description, status, titleList_id}, {where: {id}});
            res.status(200).json({message: `Todo list with id ${id} updated`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async deleteTodoList(req, res) {
        try {
            const {id} = req.params;
            const data = await todoList.findByPk(id);
            if(!data) {
                res.status(404).json({
                    message: 'Todo list not found'
                })
            }
            todoList.destroy({where: {id}});
            res.status(200).json({message: `Todo list with id ${id} deleted`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = todoListController
