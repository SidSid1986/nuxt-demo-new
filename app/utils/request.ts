// app/utils/request.ts
import { useRuntimeConfig } from '#app';
import type { FetchContext } from 'ofetch';

export const request = $fetch.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },

  onRequest(context: FetchContext) {
    const config = useRuntimeConfig();
    const isDev = import.meta.dev;

    if (isDev) {
      context.options.baseURL = '';
    } else {
      context.options.baseURL = config.public.apiBase as string;
    }
  },

  onRequestError({ request, error }) {
    console.error('❌ 请求失败:', request, error);
  },
  onResponseError({ request, response }) {
    console.error('💥 响应错误:', request, response.status, response._data);
  }
});

export default request;