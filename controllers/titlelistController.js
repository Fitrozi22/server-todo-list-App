const {titleList} = require('../models');

class titleListController {
    static async createTitleList(req, res, next) {
        try {
            const {title, user_id} = req.body;
            const NewTitleList = await titleList.create({title, user_id});
            res.status(200).json(NewTitleList);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getAllTitleList(req, res) {
        try {
            const data = await titleList.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getTitleListById(req, res) {
        try {
            const data = await titleList.findByPk(req.params.id);
            if(!data) {
                res.status(404).json({
                    message: 'Title list not found'
                })
            }
            res.json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        
        }
    }

    static async updateTitleList(req, res) {
        try {
            const {id} = req.params;
            const data = await titleList.findByPk(id);
            if(!data) {
                res.status(404).json({
                    message: 'Title list not found'
                })
            }
            const {title, user_id} = req.body;
            titleList.update({title, user_id}, {where: {id}});
            res.status(200).json({message: `Title list with id ${id} updated`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async deleteTitleList(req, res) {
        try {
            const {id} = req.params;
            const data = await titleList.findByPk(id);
            if(!data) {
                res.status(404).json({
                    message: 'Title list not found'
                })
            }
            titleList.destroy({where: {id}});
            res.status(200).json({message: `Title list with id ${id} deleted`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = titleListController