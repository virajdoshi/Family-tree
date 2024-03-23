import createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';

export class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "BadRequestError";
	}
}

export class UnauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnauthorizedError";
	}
}

export class TimeOutError extends Error {
	constructor(message) {
		super(message);
		this.name = "TimeOutError";
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class TooManyRequest extends Error {
	constructor(message) {
		super(message);
		this.name = "TooManyRequest";
	}
}

/**
 * @typedef {Object} ErrorResults
 * @property {number} code
 * @property {string} message
 */

/**
 * @param {Error} err
 * @returns {ErrorResults}
 */
export function getErrorAndCode(err) {
	if (err instanceof createError.HttpError) {
		return { message: err.message, code: err.status };
	}
	if (err instanceof UnauthorizedError) {
		return { message: err.message, code: HttpStatus.StatusCodes.UNAUTHORIZED };
	}
	if (err instanceof BadRequestError) {
		return { message: err.message, code: HttpStatus.StatusCodes.BAD_REQUEST };
	}
	if (err instanceof TimeOutError) {
		return { message: err.message, code: HttpStatus.StatusCodes.REQUEST_TIMEOUT };
	}
	if (err instanceof NotFoundError) {
		return { message: err.message, code: HttpStatus.StatusCodes.NOT_FOUND };
	}
	if (err instanceof TooManyRequest) {
		return { message: err.message, code: HttpStatus.StatusCodes.TOO_MANY_REQUESTS };
	}
	return { message: HttpStatus.ReasonPhrases.INTERNAL_SERVER_ERROR, code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR };
}
