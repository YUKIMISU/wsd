export * from './config.d'

// ajax 请求返回对象
export interface ajaxRequest {
  code: number;
  message: string;
  content: any;
}
export interface ajaxResponse {
  url: string;
  type?: string;
  data?: object;
  success?(): void;
  error?(): void;
}

export function ajax(obj: ajaxResponse): Promise<ajaxRequest>


