export class BaseHTTPError extends Error {
  public status: number;
  public exceptions: object[];
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.exceptions = [
      {
        message
      },
    ];

    Error.captureStackTrace(this, this.constructor);
  }
}