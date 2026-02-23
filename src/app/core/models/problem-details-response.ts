export interface ProblemDetailsResponse {
  title: string;
  status: number;
  detail: string; 
  extensions?: {
    errors?: Record<string, string[]>;
    traceId?: string;
    [key: string]: any;
  };
}