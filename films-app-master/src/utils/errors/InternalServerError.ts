import { INTERNAL_SERVER_ERROR } from 'http-status';
import { BaseHTTPError } from './BaseHTTPError';

export class InternalServerError extends BaseHTTPError {
  constructor(message: string = 'Internal server error') {
    super(message, INTERNAL_SERVER_ERROR);
  }
}