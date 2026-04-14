<template>
  <div class="chat-service">
    <div class="chat-buttons">
      <button class="chat-toggle" @click="open = !open; openWecom = false">
        {{ open ? '关闭客服' : '在线客服' }}
      </button>
      <button class="chat-toggle wecom" @click="openWecom = !openWecom; open = false">
        {{ openWecom ? '关闭企微' : '企业微信咨询' }}
      </button>
    </div>

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

    <div class="chat-panel wecom-panel" v-show="openWecom">
      <div class="chat-header wecom-header">企业微信咨询</div>
      <div class="chat-body" ref="wecomBodyRef">
        <div v-for="item in wecomMsgList" :key="item.id" class="msg-item" :class="item.sender">
          {{ item.content }}
        </div>
      </div>
      <div class="chat-footer">
        <input v-model="wecomInputText" @keyup.enter="sendWecomMsg" placeholder="企业微信咨询..." />
        <button @click="sendWecomMsg">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import {
  chatPullMessageLongPoll,
  chatSendMessage,
  chatSendToWeCom,
} from "@/server/common";

// ==============================================
// 公众号客服（最终修复版长轮询）
// ==============================================
const open = ref(false)
const inputText = ref('')
const msgList = ref([])
const bodyRef = ref(null)
const visitor_id = ref('v_' + Date.now() + Math.random().toString(36).slice(2, 6))
const lastMsgId = ref(0) // 记录最后一条消息ID，只拉新消息
const isPolling = ref(false) // 防止重复轮询

// 长轮询核心：只拉新消息，30秒超时
const startLongPoll = async () => {
  if (isPolling.value) return // 防止重复请求
  if (!open.value) {
    setTimeout(startLongPoll, 1000)
    return
  }

  isPolling.value = true
  try {
    const res = await chatPullMessageLongPoll(visitor_id.value, lastMsgId.value)
    if (res.code === 200 && res.data?.length > 0) {
      msgList.value.push(...res.data)
      lastMsgId.value = res.data.at(-1).id
      nextTick(() => {
        if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
      })
    }
  } catch (e) {
    console.error("公众号轮询错误:", e)
  } finally {
    isPolling.value = false
    // 超时后立刻发起下一次轮询（真正长轮询）
    setTimeout(startLongPoll, 0)
  }
}

const sendMsg = async () => {
  if (!inputText.value.trim()) return
  try {
    await chatSendMessage({
      visitor_id: visitor_id.value,
      sender: 'visitor',
      content: inputText.value
    })
    inputText.value = ''
    // 发送后手动拉取一次，立刻显示自己发的消息
    const res = await chatPullMessageLongPoll(visitor_id.value, lastMsgId.value)
    if (res.code === 200 && res.data?.length > 0) {
      msgList.value.push(...res.data)
      lastMsgId.value = res.data.at(-1).id
      nextTick(() => {
        if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
      })
    }
  } catch (e) {
    console.error("发送消息错误:", e)
  }
}

// ==============================================
// 企业微信客服（最终修复版长轮询）
// ==============================================
const openWecom = ref(false)
const wecomInputText = ref('')
const wecomMsgList = ref([])
const wecomBodyRef = ref(null)
const wecomVisitorId = ref('wecom_' + Date.now() + Math.random().toString(36).slice(2, 6))
const wecomLastMsgId = ref(0)
const isWecomPolling = ref(false)

const startWecomLongPoll = async () => {
  if (isWecomPolling.value) return
  if (!openWecom.value) {
    setTimeout(startWecomLongPoll, 1000)
    return
  }

  isWecomPolling.value = true
  try {
    const res = await chatPullMessageLongPoll(wecomVisitorId.value, wecomLastMsgId.value)
    if (res.code === 200 && res.data?.length > 0) {
      wecomMsgList.value.push(...res.data)
      wecomLastMsgId.value = res.data.at(-1).id
      nextTick(() => {
        if (wecomBodyRef.value) wecomBodyRef.value.scrollTop = wecomBodyRef.value.scrollHeight
      })
    }
  } catch (e) {
    console.error("企微轮询错误:", e)
  } finally {
    isWecomPolling.value = false
    setTimeout(startWecomLongPoll, 0)
  }
}

const sendWecomMsg = async () => {
  if (!wecomInputText.value.trim()) return
  try {
    await chatSendToWeCom({
      visitor_id: wecomVisitorId.value,
      sender: 'visitor',
      content: wecomInputText.value
    })
    wecomInputText.value = ''
    // 发送后手动拉取一次，立刻显示自己发的消息
    const res = await chatPullMessageLongPoll(wecomVisitorId.value, wecomLastMsgId.value)
    if (res.code === 200 && res.data?.length > 0) {
      wecomMsgList.value.push(...res.data)
      wecomLastMsgId.value = res.data.at(-1).id
      nextTick(() => {
        if (wecomBodyRef.value) wecomBodyRef.value.scrollTop = wecomBodyRef.value.scrollHeight
      })
    }
  } catch (e) {
    console.error("企微发送错误:", e)
  }
}

// 监听窗口开关，控制轮询
watch(open, (val) => {
  if (val && !isPolling.value) startLongPoll()
})
watch(openWecom, (val) => {
  if (val && !isWecomPolling.value) startWecomLongPoll()
})

onMounted(() => {
  startLongPoll()
  startWecomLongPoll()
})
</script>

<style scoped>
.chat-service {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
}

.chat-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
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

.chat-toggle.wecom {
  background: #07c160;
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

.wecom-panel {
  bottom: 140px;
}

.wecom-header {
  background: #07c160 !important;
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