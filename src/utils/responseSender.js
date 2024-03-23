/**
 * Sends a response using provided parameters.
 * @param {Object} param - Parameters for sending response.
 * @param {string} param.err - Error message if any.
 * @param {Object} param.data - Data to be sent in the response.
 * @param {string} param.message - Message to be sent in the response.
 * @param {number} param.statusCode - Custom status code for the response.
 * @param {number} param.httpStatusCode - HTTP status code for the response.
 * @param {Object} param.extras - Extra data to be included in the response.
 * @param {import('express').Request} param.req - Express request object.
 * @param {import('express').Response} param.res - Express response object.
 * @returns {void}
 */
export function send(param) {
    const {
        err, data, message, statusCode, httpStatusCode, extras, req, res,
    } = param;
    const result = {
        message: message || 'Success',
        data: data || [],
        statusCode: statusCode || httpStatusCode,
        ...extras,
    };

    if (err) {
        result.message = err;
        result.data = data || [];
        res.status(httpStatusCode || statusCode || 500).json(result);
    } else {
        res.status(httpStatusCode || statusCode || 200).json(result);
    }
};
