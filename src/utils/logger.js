import morgan from 'morgan';
import * as winston from 'winston';
import { config } from '../../config/config.js';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
        winston.format.colorize({ 'all': true })
    ),
    defaultMeta: { service: config.SERVICENAME },
    transports: [new winston.transports.Console()]
});


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
morgan.token('params', function (req, res) { return JSON.stringify(req.params) })
morgan.token('query', function (req, res) { return JSON.stringify(req.query) })
morgan.token('headers', function (req, res) { return JSON.stringify(req.headers) })
morgan.token('rqId', function (req, res) { return req.id })


export const requestLogger = function (options = { body: false }) {
    return morgan(function (tokens, req, res) {
        let morganOptions = {
            url: tokens.url(req, res),
            method: tokens.method(req, res),
            code: Number(tokens.status(req, res)),
            took: Number(tokens['response-time'](req, res)),
            token: tokens.req(req, res, 'token'),
            query: tokens.query(req, res),
            params: tokens.params(req, res),
            time: tokens.date(req, res, 'iso'),
            headers: tokens.headers(req, res),
            rqId: tokens.rqId(req, res),
        }
        if (options.body && options.body == true) {
            morganOptions.body = tokens.body(req, res)
        }
        return JSON.stringify(morganOptions)
    })
}
