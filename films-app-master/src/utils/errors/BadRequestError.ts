import { BAD_REQUEST } from 'http-status';
import { BaseHTTPError } from './BaseHTTPError';

export class BadRequestError extends BaseHTTPError {
  constructor(message: string = 'Bad request') {
    super(message, BAD_REQUEST);
  }
}