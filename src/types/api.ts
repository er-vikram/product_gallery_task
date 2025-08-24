export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
  }
  
  export interface ApiError {
    message: string;
    status: number;
    code?: string;
  }
  
  export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';
  