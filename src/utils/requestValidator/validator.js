import { logger } from '../../utils/logger.js';
import { send } from '../../utils/responseSender.js';

export const validate = (type, schema) => {
    return async (req, res, next) => {
        try {
            const validationConfig = await import(`./requestSchema/${type}`);
            await validationConfig[schema].validateAsync(req);
            return next();
        } catch (e) {
            logger.error({ message: e.message, schema: type, schemaName: schema });
            return send({
                err: e.message,
                httpStatusCode: 400,
                statusCode: 400,
                req,
                res,
            });
        }
    };
};
