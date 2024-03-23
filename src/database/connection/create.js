import mongoose from 'mongoose';
import { logger } from '../../utils/logger.js';

export const connect = async (url, options = {}, dbName) => {
    try {
        const connection = await mongoose.connect(url, options);
        connection.set('maxTimeMS', 5000);
        if (connection.STATES.connecting) {
            logger.info({ databaseName: dbName, message: `Mongo connecting` });
        }
        if (connection.STATES.connected) {
            logger.info({ databaseName: dbName, message: `Mongo connected` });
        }
        if (connection.STATES.disconnected) {
            logger.error({ databaseName: dbName, message: `Mongo disconnected` });
        }
        return connection;
    } catch (error) {
        logger.error(error, { databaseName: dbName, message: `Mongoose connection error` });
        console.error(error);
    }
};

export const disconnect = async (connection, dbName) => {
    await connection.close();

    connection.on('disconnected', function () {
        logger.error({ databaseName: dbName, message: `Mongoose disconnected` });
    });
};
