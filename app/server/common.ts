/*
 * @Author: Sid Li
 * @Date: 2026-03-24 10:26:50
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-09 14:17:37
 * @FilePath: \nuxt-free-new\app\server\common.ts
 * @Description: 
 */
// services/common.ts
import request from '@/utils/request';

 
// 通用图片上传
export function uploadImageCommon(data: FormData) {
 
  return request('/common/upload_image', {
    method: 'POST',
    body: data,
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

//solution detail
export function solutionDetail(id: any) {
  return request(`/api/solution/detail/${id}`, {
    method: 'get',
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
export function productDetail(robotType: any, id: any) {
  return request(`/api/product/detail/${robotType}/${id}`, {
    method: 'get',
  });
}

//main product list
export function mainProductList(page: any, pageSize: any) {
  return request(`/api/product/main/products?page=${page}&page_size=${pageSize}`, {
    method: 'get',
  });
}

// abtou swiper list
export function aboutSwiperList() {
  return request('/api/about/banners', {
    method: 'get',
  });
}

//about step 
export function aboutStepList() {
  return request('/api/about/steps', {
    method: 'get',
  });
}


//process list
export function processList(params: any) {
  return request('/api/process/list', {
    method: 'get',
    params,
  });
}

//process detail
export function processDetail(id: any) {
  return request(`/api/process/detail/${id}`, {
    method: 'get',
  });
}
