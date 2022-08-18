export {};

declare global {
  interface ErrorResponseData {
    detail: string;
    error: {
      [key: string]: string;
    };
  }

  interface AxiosErrorResponse {
    response: {
      status: number;
      data: { errors: ErrorResponseData };
    };
  }
}
