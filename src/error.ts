export interface IQsError {
  date: string;
  errorCode: string;
  statusCode: number;
}

export class QsError extends Error {
  private date;
  private errorCode: string;
  private statusCode: number;
  public constructor(
    message: string,
    errorCode: string,
    statusCode: number
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.date = new Date();
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
