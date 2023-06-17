import { IGenericErrorMessage } from "./error";

export interface IGenericErrorResponse {
  success: false;
  message: string;
  errorMessages: IGenericErrorMessage[];
}
