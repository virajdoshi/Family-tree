import { UserController } from '../controllers/user.controller.js';
import { validate } from '../utils/requestValidator/validator.js';

/**
 * Object containing Express app.
 * @typedef {Object} ExpressAppObject
 * @property {import('express').Express} app - The Express application instance.
 * @property {import('../services/user.service').UserService} userService - The user service.
 */
/**
 * Initializes the router for the Express app.
 * @param {ExpressAppObject} params - Object containing the Express app.
 */
export const init = ({ app, userService }) => {
    const userController = new UserController(userService);
    const router = app.get('router');

    router.route('/user').post(validate('user.schema.js', 'addUser'), userController.addUser.bind(userController));
    router.route('/user/:id').put(validate('user.schema.js', 'updateUser'), userController.updateUser.bind(userController));
    router.route('/user/:id').delete(validate('user.schema.js', 'deleteUser'), userController.deleteUser.bind(userController));
    router.route('/user').get(userController.getAllUsers.bind(userController));
};
