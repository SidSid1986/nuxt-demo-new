/*
 * @Author: Sid Li
 * @Date: 2026-03-24 10:26:50
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-23 14:12:35
 * @FilePath: \nuxt-free-new\app\server\chat.ts
 * @Description: 聊天相关 API
 */
import request from '@/utils/request';

// ======================== 基础聊天 ========================
// 获取聊天记录（长轮询）
export function chatPullMessageLongPoll(visitor_id: string, last_id: number) {
  return request(`/api/chat/pull?visitor_id=${visitor_id}&last_id=${last_id}`, {
    method: 'get',
  });
}

// 发送聊天消息（公众号）
export function chatSendMessage(data: {
  visitor_id: string;
  sender: string;
  content: string;
}) {
  return request('/api/chat/send', {
    method: 'POST',
    body: data,
  });
}

// ======================== 企业微信客服 ========================
// 发送消息 → 客服（统一接口）
export function chatSendToWeCom(data: {
  visitor_id: string;
  sender: string;
  content: string;
  touser: string;
  chat_type: string;  // product / maintain
}) {
  return request('/api/chat/send_to_wecom', {
    method: 'POST',
    body: data,
  });
}

// 废弃旧接口（保留兼容）
export function chatSendToWeCom2(data: any) {
  return chatSendToWeCom(data);
}

// ======================== 客服座席分配（独立座席系统） ========================
// 产品咨询 - 分配座席 ✅ 修复：支持传 visitor_id
export function assignProductAgent(visitor_id?: string) {
  let url = '/api/chat/assign-product-agent';
  if (visitor_id) url += `?visitor_id=${visitor_id}`;
  return request(url, { method: 'get' });
}

// 产品咨询 - 释放座席
export function releaseProductAgent(agent: number) {
  return request(`/api/chat/release-product-agent?agent=${agent}`, {
    method: 'POST',
  });
}

// 维保咨询 - 分配座席 ✅ 修复：支持传 visitor_id
export function assignMaintainAgent(visitor_id?: string) {
  let url = '/api/chat/assign-maintain-agent';
  if (visitor_id) url += `?visitor_id=${visitor_id}`;
  return request(url, { method: 'get' });
}

// 维保咨询 - 释放座席
export function releaseMaintainAgent(agent: number) {
  return request(`/api/chat/release-maintain-agent?agent=${agent}`, {
    method: 'POST',
  });
}

// ======================== ✅ 新增：座席心跳保活（统一放这里） ========================
export function chatPollHeartbeat(data: { visitor_id: string; chat_type: string }) {
  return request(`/api/chat/poll-heartbeat?visitor_id=${data.visitor_id}&chat_type=${data.chat_type}`, {
    method: 'get',
  });
}