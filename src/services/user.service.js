import { UserOperations } from '../database/operations/user.operation.js';
// import { BadRequestError } from '../utils/errors.js';

export class UserService {
    constructor() {
        this.userOperations = new UserOperations();
    }

    /**
     * Add a user to the system.
     *
     * @param {object} userdata - the user data to be added
     * @param {boolean} isParentId - flag indicating if the user has a parent ID
     * @return {Promise<void>} a promise that resolves when the user is added
     */
    async addUser(userdata, isParentId) {
        const isRootExist = await this.userOperations.isRootExist();

        if (!isRootExist) {
            delete userdata.parentId;
            userdata.root = true;
            return await this.userOperations.create(userdata);
        }

        const user = await this.userOperations.create(userdata);
        if (isParentId) {
            return await this.userOperations.updateChildrenIds(userdata.parentId, user._id);
        }
        return user;
    }
    async updateUser() { }
    async deleteUser() { }

    async getAllUsers() {
        const rootUser = await this.userOperations.getRoot();
        function transformUser(user, parentId = null) {
            const { firstName, middleName, lastName, childrenIds } = user;

            const name = `${firstName} ${middleName} ${lastName}`;
            const parent = parentId; // For the root user

            const children = childrenIds.map(child => transformUser(child, name));

            return { name, parent, children };
        }
        return transformUser(rootUser);
    }
}
