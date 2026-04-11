<template>
  <div class="chat-service">
    <!-- 悬浮按钮 -->
    <button class="chat-toggle" @click="open = !open">
      {{ open ? '关闭' : '在线客服' }}
    </button>

    <!-- 聊天窗口 -->
    <div class="chat-panel" v-show="open">
      <div class="chat-header">在线咨询</div>

      <div class="chat-body" ref="bodyRef">
        <div v-for="item in msgList" :key="item.id" class="msg-item" :class="item.sender">
          {{ item.content }}
        </div>
      </div>

      <div class="chat-footer">
        <input v-model="inputText" @keyup.enter="sendMsg" placeholder="请输入消息..." />
        <button @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const open = ref(false)
const inputText = ref('')
const msgList = ref([])
const bodyRef = ref(null)

// 生成访客ID
const visitor_id = ref('v_' + Date.now() + Math.random().toString(36).slice(2, 6))

// 拉取消息
const pullMsg = async () => {
  try {
    const res = await $fetch('/api/chat/pull', {
      params: { visitor_id: visitor_id.value }
    })
    if (res.code === 200) {
      msgList.value = res.data
      nextTick(() => {
        if (bodyRef.value) {
          bodyRef.value.scrollTop = bodyRef.value.scrollHeight
        }
      })
    }
  } catch (e) { }
}

// 发送消息
const sendMsg = async () => {
  if (!inputText.value.trim()) return
  try {
    await $fetch('/api/chat/send', {
      method: 'POST',
      body: {
        visitor_id: visitor_id.value,
        sender: 'visitor',
        content: inputText.value
      }
    })
    inputText.value = ''
    pullMsg()
  } catch (e) { }
}

// 轮询
onMounted(() => {
  pullMsg()
  setInterval(pullMsg, 3000)
})
</script>

<style scoped>
.chat-service {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chat-panel {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 340px;
  height: 500px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 14px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.chat-body {
  flex: 1;
  padding: 14px;
  background: #f5f7fa;
  overflow-y: auto;
}

.msg-item {
  max-width: 75%;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  line-height: 1.4;
}

.msg-item.visitor {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.msg-item.admin {
  background: white;
  border: 1px solid #e5e7eb;
  margin-right: auto;
}

.chat-footer {
  display: flex;
  padding: 10px;
  gap: 6px;
  border-top: 1px solid #eee;
}

.chat-footer input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.chat-footer button {
  padding: 0 14px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>