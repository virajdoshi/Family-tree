import * as HttpStatus from 'http-status-codes';
import { send } from '../utils/responseSender.js';

export class UserController {
    /**
     *
     * @param {import('../services/user.service').UserService} userService - The user service.
     */
    constructor(userService) {
        this.userService = userService;
    }
    async addUser(req, res, next) {
        try {
            const userdata = req.body;
            const isParentId = userdata.parentId ? true : false;
            const user = await this.userService.addUser(userdata, isParentId);
            send({
                message: 'User added successfully',
                statusCode: HttpStatus.StatusCodes.CREATED,
                data: user,
                req,
                res
            })
        } catch (error) {
            next(error);
        }
    }
    async updateUser() { }
    async deleteUser() { }
    async getAllUsers(req, res, next) {
        try {
            const allUsers = await this.userService.getAllUsers();
            send({
                message: 'Users fetched successfully',
                statusCode: HttpStatus.StatusCodes.OK,
                data: allUsers,
                req,
                res
            })
        } catch (error) {
            next(error);
        }
    }
}
