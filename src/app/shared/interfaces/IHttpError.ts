export interface IHttpError {
  status: number | null;
  statusText: string | null;
  message: string;
}
