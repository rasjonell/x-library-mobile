export type XLibError =
  | NotFoundError
  | UnauthorizedError
  | BadRequestError
  | UnprocessableEntityError;

export class BaseError extends Error {
  statusCode: number;
  changesetErrors?: { [key: string]: string };

  constructor(
    message: string,
    statusCode: number,
    changesetErrors?: BaseError['changesetErrors'],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.changesetErrors = changesetErrors;
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string, changesetErrors: BaseError['changesetErrors']) {
    super(message, 401, changesetErrors);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor(message: string, changesetErrors: BaseError['changesetErrors']) {
    super(message, 422, changesetErrors);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}

export function buildErrorMessage(errors: ErrorResponseData): string[] {
  return Object.entries(errors.error).map(
    ([key, value]) => `${capitalize(key)} ${value}`,
  );
}

export function capitalize(word: string): string {
  return `${word[0].toUpperCase()}${word.substring(1)}`;
}
