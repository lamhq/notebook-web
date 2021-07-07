type ErrorDetails = string | [InputErrors];

export interface InputErrors {
  [x: string]: ErrorDetails;
}

export enum ApiErrorCode {
  NetworkError = 0,
  BadRequest = 400,
  Unauthenticated = 401,
  Unauthorized = 403,
  Notfound = 404,
  ServerError = 500,
}

export class ApiError extends Error {
  public statusCode: ApiErrorCode;

  public details?: InputErrors;

  constructor(message: string) {
    super(message);
    this.statusCode = ApiErrorCode.NetworkError;
  }
}

export interface ErrorHandler {
  (error: Error | ApiError): Promise<void>;
}
