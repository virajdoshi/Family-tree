import joi from 'joi';

export const addUser = joi.object({
    body: joi.object({
        parentId: joi.string().optional(),
        firstName: joi.string().required(),
        middleName: joi.string().required(),
        lastName: joi.string().required(),
        dob: joi.date().optional(),
    }).unknown(false),
}).unknown()

export const updateUser = joi.object({
    params: joi.object({
        id: joi.string().required()
    }).unknown(false),
    body: joi.object({
        firstName: joi.string().optional(),
        middleName: joi.string().optional(),
        lastName: joi.string().optional(),
        dob: joi.date().optional(),
    }).or('firstName', 'middleName', 'lastName', 'dob').unknown(false)
}).unknown()

export const deleteUser = joi.object({
    params: joi.object({
        id: joi.string().required()
    }).unknown(false),
}).unknown()
