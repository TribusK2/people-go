export interface IApiResponse<T> {
  data: T;
  code: number;
  error?: string;
}