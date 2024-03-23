import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import requestId from 'express-request-id';
import createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import { config } from './config/config.js';
import { Init } from './init.js';
import { TimeOutError, getErrorAndCode } from './src/utils/errors.js';
import { logger, requestLogger } from './src/utils/logger.js';

class App {
	constructor() {
		this.app = express();
		this.init();
	}

	init() {
		try {
			// removing the x-powered-by header for security reasons
			this.app.disable("x-powered-by");
			this.app.use(cors());
			this.app.use(requestLogger());
			this.app.use(express.json({ limit: '1mb' }));
			this.app.use(bodyParser.json());
			this.app.use(
				bodyParser.urlencoded({
					extended: false,
					limit: "1mb",
				})
			);
			this.app.use(requestId());

			//setting base router path
			const router = express.Router();
			const base = '/familytree';
			this.app.use(base, router);
			this.app.set('router', router);

			// setting timeout
			this.app.use((req, res, next) => {
				res.setTimeout(config.HTTP.TIMEOUT, () => {
					next(new TimeOutError("Request Timeout"));
				});
				next();
			});

			// Handling preflight request
			this.app.options("/*", (req, res, next) => {
				res.send(HttpStatus.StatusCodes.OK);
			});

			// Application health check
			this.app.get("/api/health", (req, res) => {
				const healthcheck = {
					uptime: process.uptime(),
					message: `All OK from ${config.SERVICENAME}`,
					timestamp: Date.now(),
				};
				try {
					res.send(healthcheck);
				} catch (error) {
					healthcheck.message = error;
					res.status(HttpStatus.StatusCodes.SERVICE_UNAVAILABLE).send();
				}
			});

			// catch 404 and forward to error handler
			this.app.use(function (req, res, next) {
				next(createError(404));
			});

			// Handling error
			this.app.use(function (err, req, res, next) {
				const errorData = getErrorAndCode(err);
				logger.error(err, { requestId: req.id });
				res.status(errorData.code || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
					error: errorData.message || 'Internal Server Error',
				});
			});

			// initializing mongo and routes
			const init = new Init();
			init.initialize(this.app, config);

			// initialize http Server
			this.app.listen(config.HTTP.PORT, () => {
				logger.info(`listening at http://localhost:${config.HTTP.PORT}`);
			});
		} catch (error) {
			logger.error(`Error Starting a server on port ${config.HTTP.PORT}`, error);
			process.exit(1);
		}
	}
}

export const app = new App();
