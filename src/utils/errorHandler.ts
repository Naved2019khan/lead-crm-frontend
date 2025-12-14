import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export function errorHandler(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      return {
        message: axiosError.response?.data?.message || 'An error occurred',
        code: axiosError.response?.data?.code,
        statusCode: axiosError.response?.status,
      };
    }
    return {
      message: 'An unexpected error occurred',
      statusCode: 500,
    };
  }
