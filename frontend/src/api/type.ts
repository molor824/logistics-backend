export type Response<T> = T | ErrorResponse;
export type ErrorResponse = {
  type: string;
};
