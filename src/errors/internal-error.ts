export class InternalErrorException extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = 500;
  
      // Maintains proper stack trace, if available
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }