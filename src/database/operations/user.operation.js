import mongoose from 'mongoose';
import { user } from '../models/user.js';

export class UserOperations {
    /**
     * Create a new record using the provided data.
     *
     * @param {Object} data - the data to create the record with
     * @return {Promise<Object>} a promise that resolves to the created record
     */
    async create(data) {
        return await user.create(data);
    }

    /**
     * Updates the children id of a user.
     *
     * @param {String} parentId - description of parameter
     * @param {String} childrenId - description of parameter
     * @return {Promise<Object>} returns promise that resolves to the updated user object
     */
    async updateChildrenIds(parentId, childrenId) {
        const { ObjectId } = mongoose.Types;
        return await user.findOneAndUpdate({ _id: parentId }, { '$push': { childrenIds: new ObjectId(childrenId) } }, { new: true });
    }

    /**
     * Asynchronously removes an item with the given id.
     *
     * @param {String} id - The id of the item to be removed
     */
    async remove(id) {
        return await user.findOneAndDelete({ _id: id });
    }

    /**
     * Remove a specific ID from the parent's children list in the database.
     *
     * @param {String} id - The ID of the child to be removed from the parent's children list.
     * @return {Promsie<Object>} The updated user object after the removal.
     */
    async removeFromParent(id) {
        return await user.findOneAndUpdate({ 'childrenIds': { $in: [id] } }, { $pull: { 'childrenIds': id } }, { new: true });
    }

    /**
     * Update a user by ID.
     *
     * @param {String} id - The id of the item to be updated
     * @param {Object} data - The data to be updated
     * @return {Promise<Object>} returns updated data
     */
    async updateById(id, data) {
        return await user.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async isRootExist() {
        return await user.findOne({ root: true });
    }

    async getRoot() {
        return await user.findOne({ root: true }).populate({ path: 'childrenIds', populate: { path: 'childrenIds', populate: { path: 'childrenIds' } } });
    }
}
