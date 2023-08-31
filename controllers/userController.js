const {user} = require('../models');
const {comparePassword, hashPassword} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');

class userController {

    //Register User
    static async registerUser(req, res, next) {
        try {
            const {username, email, password, country} = req.body
            const NewUser = await user.create({username, email, password, country})
            res.status(200).json(NewUser)
        } 
        catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const {email, password} = req.body; //fields
            const userLogin = await user.findOne({ where: {email} });
            if (!userLogin) {
                throw { name: 'Unauthorized', message: 'Invalid Credentials' };
            }
            const validPassword = comparePassword(password, userLogin.password);
            if (!validPassword) {
                throw { name: 'Unauthorized', message: 'Invalid Credentials' };
            }
            const payload = {
                id: userLogin.id
            }
            const token = generateToken(payload);
            res.status(200).json({
                statusCode: 200,
                access_token: token,
                email: userLogin.email,
                username: userLogin.username,
            });
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getAllUsers(req, res) {
        try {
            const data = await user.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async getUserById(req, res) {
        try {
            const {id} = req.params;
            const data = await user.findOne({where: {id}});
            res.status(200).json(data);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const {id} = req.params;
            const user = await user.findByPk(id);

            if (user == null) {
                throw {message: 'User not found'};
            }
            if (!user) {
                throw {message: 'User not found'};
            }
            
            user.destroy({where: {id}});
            res.status(200).json({message: `User with id ${user.id} deleted`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
    
    static async updateUser(req, res) {
        try {
            const user = await user.findByPk(req.params.id);

            if(!user) {
                throw {message: 'User not found'};
            }
            const {username, email, password, country} = req.body;
            user.update({username, email, password, country},
            {where: {id: req.params.id}});

            res.status(200).json({message: `User with id ${user.id} updated`});
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
}

module.exports = userController