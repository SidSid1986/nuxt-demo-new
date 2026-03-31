/*
 * @Author: Sid Li
 * @Date: 2026-03-24 10:26:50
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 08:56:21
 * @FilePath: \nuxt-free-new\app\server\common.ts
 * @Description: 
 */
// services/common.ts
import request from '@/utils/request';

/**
 * 通用图片上传
 * @param data FormData 对象
 */
export function uploadImageCommon(data: FormData) {
  // 注意：上传文件时，$fetch 会自动识别 FormData 并设置 Content-Type 为 multipart/form-data
  // 不需要手动设置 headers
  return request('/common/upload_image', {
    method: 'POST',
    body: data,
    // 强制不解析 JSON，如果后端返回的不是标准 JSON，可以加 parseResponse: false
  });
}

export function homeImage() {
  return request('api/home/index_images', {
    method: 'get',
  });
}

//product list
export function productList() {
  return request('api/product/list', {
    method: 'get',
  });
}

//news list
export function newsList() {
  return request('api/news/list', {
    method: 'get',
  });
}
//about
export function aboutInfo() {
  return request('api/about/info', {
    method: 'get',
  });
}

//download files
export function fileListApi(page: any, pageSize: any) {
  return request(`api/files/list?page=${page}&page_size=${pageSize}`, {
    method: 'get',
  });
}
