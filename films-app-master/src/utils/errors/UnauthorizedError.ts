import { UNAUTHORIZED } from 'http-status';
import { BaseHTTPError } from './BaseHTTPError';

export class UnauthorizedError extends BaseHTTPError {
  constructor(message: string = 'Unauthorized') {
    super(message, UNAUTHORIZED);
  }
}