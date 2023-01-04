import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
  } from "express";
import { ValidateError } from "tsoa";
import { BaseHTTPError, UnauthorizedError, BadRequestError, InternalServerError } from '../utils/errors';

export function errorHandler(
    err: BaseHTTPError,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    if (err) {
      console.log(err)
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        const exceptions = Object.entries(err.fields).map(([key, value]) => {
          return { message: `${key}. ${value.message}` }
        });

        return res.status(400).json({
          exceptions: exceptions
        });
      }
      if (!err.status) {
        const internalError = new InternalServerError(err.message);
        return res.status(500).json({
          exceptions: internalError.exceptions,
        });
      }
      return res.status(err.status).json({
        exceptions: err.exceptions,
      });
    }
  next();
}
