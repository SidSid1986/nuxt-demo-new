/*
 * @Author: Sid Li
 * @Date: 2026-03-24 10:26:50
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-01 08:46:51
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
  return request('/api/home/index_images', {
    method: 'get',
  });
}

 

 
 
//about
export function aboutInfo() {
  return request('/api/about/info', {
    method: 'get',
  });
}

//download files
export function fileListApi(page: any, pageSize: any,keyword:any) {
  return request(`/api/files/list?page=${page}&page_size=${pageSize}&keyword=${keyword}`, {
    method: 'get',
  });
}

//service
export function serviceContent() {
  return request('/api/service/content', {
    method: 'get',
  });
}

//news list
export function newsList(page: any, pageSize: any) {
  return request(`/api/news/list?page=${page}&page_size=${pageSize}`, {
    method: 'get',
  });
}

//news detail
export function newsDetail(id: any) {
  return request(`/api/news/${id}`, {
    method: 'get',
  });
}

//solution tab industries list
export function industriesList() {
  return request('/api/industries/list', {
    method: 'get',
  });
}

//solution list
export function solutionList(params: any) {
  return request('/api/solution/list', {
    method: 'get',
    params,
  });
}

// pruduct category list
export function productCategoryTree() {
  return request('/api/category/tree', {
    method: 'get',
  });
}

// product list 
export function productList(params: any) {
  return request('/api/product/list', {
    method: 'get',
    params,
  });
}

//product detail
export function productDetail(id: any) {
  return request(`/api/product/detail/${id}`, {
    method: 'get',
  });
}
