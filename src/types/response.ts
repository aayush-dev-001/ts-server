export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  msg?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
