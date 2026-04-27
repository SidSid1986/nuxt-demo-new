<template>
  <div class="chat-service">
    <!-- 公众号客服容器  -->
    <!--  <div class="chat-group wechat-group">
      <!~~ 公众号迷你窗口  ~~>
      <div class="mini-chat" :class="{ blink: chatBlink }"  v-show="minimizeChat" @click="restoreChat">
        <img src="/images/chat/chatLogo.png" alt="客服头像" class="mini-avatar" />
        <span class="mini-title">在线客服</span>
        <button class="mini-close" @click.stop="closeMiniChat">×</button>
      </div>

      <!~~ 悬浮按钮 ~~>
      <button class="chat-toggle" @click="handleOpenChat">
        {{ open ? '关闭客服' : '在线客服' }}
      </button>

      <!~~ 公众号聊天面板  ~~>
      <div class="chat-panel" v-show="open && !minimizeChat">
        <div class="chat-header">
          <span class="header-title">在线客服</span>
          <span class="header-status">客服在线</span>
          <div class="window-controls">
            <button class="control-btn minimize-btn" @click="minimizeChat = true">
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="2" rx="1" fill="white" />
              </svg>
            </button>
            <button class="control-btn close-btn" @click="handleCloseChat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div class="chat-body" ref="bodyRef">
          <div class="msg-item admin" v-if="open">
            <img src="/images/chat/chatLogo.png" alt="客服头像" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">您好！很高兴为您服务，请问有什么可以帮助您的？</div>
              <div class="msg-time">{{ getCurrentTime() }}</div>
            </div>
          </div>
          <div v-for="item in msgList" :key="item.id" class="msg-item" :class="item.sender">
            <img :src="item.sender === 'visitor' ? '/images/chat/we.png' : '/images/chat/chatLogo.png'" alt="头像"
              class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">{{ item.content }}</div>
              <div class="msg-time">{{ formatTime(item.create_time || new Date()) }}</div>
            </div>
          </div>
        </div>
        <div class="chat-footer">
          <input v-model="inputText" @keyup.enter="sendMsg" placeholder="请输入消息..." class="msg-input" />
          <button @click="sendMsg" class="send-btn">发送</button>
        </div>
      </div>
    </div>-->

    <!-- ============================================== -->
    <!-- 企业微信客服 1 产品咨询 -->
    <!-- ============================================== -->
    <div class="chat-group wecom-group">
      <div class="mini-chat wecom-mini" :class="{ blink: wecomBlink }" v-show="minimizeWecom" @click="restoreWecom">
        <img src="/images/chat/chatLogo.png" alt="企微头像" class="mini-avatar" />
        <span class="mini-title">产品咨询</span>
        <button class="mini-close" @click.stop="closeMiniWecom">×</button>
      </div>

      <button class="chat-toggle wecom" @click="handleOpenWecom">
        {{ openWecom ? "关闭产品咨询" : "产品咨询" }}
      </button>

      <div class="chat-panel wecom-panel" v-show="openWecom && !minimizeWecom">
        <div class="chat-header wecom-header">
          <span class="header-title">产品咨询</span>
          <span class="header-status">客服在线</span>
          <div class="window-controls">
            <button class="control-btn minimize-btn" @click="minimizeWecom = true">
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="2" rx="1" fill="white" />
              </svg>
            </button>
            <button class="control-btn close-btn" @click="handleCloseWecom">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div class="chat-body" ref="wecomBodyRef">
          <div class="msg-item admin" v-if="openWecom">
            <img src="/images/chat/chatLogo.png" alt="企微客服头像" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">
                您好！产品咨询专属客服为您服务，请问有什么可以帮助您的？
              </div>
              <div class="msg-time">{{ getCurrentTime() }}</div>
            </div>
          </div>
          <div v-for="item in wecomMsgList" :key="item.id" class="msg-item" :class="item.sender">
            <img :src="item.sender === 'visitor'
              ? '/images/chat/wecom.png'
              : '/images/chat/chatLogo.png'
              " alt="头像" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">{{ item.content }}</div>
              <div class="msg-time">
                {{ formatTime(item.create_time || new Date()) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-footer">
          <input v-model="wecomInputText" @keyup.enter="sendWecomMsg" placeholder="产品咨询..." class="msg-input" />
          <button @click="sendWecomMsg" class="send-btn wecom-btn">发送</button>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 企业微信客服 2 维保咨询 -->
    <!-- ============================================== -->
    <div class="chat-group wecom-group">
      <div class="mini-chat wecom-mini" :class="{ blink: wecomBlink2 }" v-show="minimizeWecom2" @click="restoreWecom2">
        <img src="/images/chat/chatLogo.png" alt="企微头像" class="mini-avatar" />
        <span class="mini-title">维保咨询</span>
        <button class="mini-close" @click.stop="closeMiniWecom2">×</button>
      </div>

      <button class="chat-toggle wecom" @click="handleOpenWecom2">
        {{ openWecom2 ? "关闭维保咨询" : "维保咨询" }}
      </button>

      <div class="chat-panel wecom-panel" v-show="openWecom2 && !minimizeWecom2">
        <div class="chat-header wecom-header">
          <span class="header-title">维保咨询</span>
          <span class="header-status">客服在线</span>
          <div class="window-controls">
            <button class="control-btn minimize-btn" @click="minimizeWecom2 = true">
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="2" rx="1" fill="white" />
              </svg>
            </button>
            <button class="control-btn close-btn" @click="handleCloseWecom2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div class="chat-body" ref="wecomBodyRef2">
          <div class="msg-item admin" v-if="openWecom2">
            <img src="/images/chat/chatLogo.png" alt="企微客服头像" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">
                您好！维保专属客服为您服务，请问有什么可以帮助您的？
              </div>
              <div class="msg-time">{{ getCurrentTime() }}</div>
            </div>
          </div>
          <div v-for="item in wecomMsgList2" :key="item.id" class="msg-item" :class="item.sender">
            <img :src="item.sender === 'visitor'
              ? '/images/chat/wecom.png'
              : '/images/chat/chatLogo.png'
              " alt="头像" class="msg-avatar" />
            <div class="msg-content">
              <div class="msg-text">{{ item.content }}</div>
              <div class="msg-time">
                {{ formatTime(item.create_time || new Date()) }}
              </div>
            </div>
          </div>
        </div>
        <div class="chat-footer">
          <input v-model="wecomInputText2" @keyup.enter="sendWecomMsg2" placeholder="维保咨询..." class="msg-input" />
          <button @click="sendWecomMsg2" class="send-btn wecom-btn">
            发送
          </button>
        </div>
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

// 公众号
const open = ref(false);
const minimizeChat = ref(false);
const chatBlink = ref(false);
const inputText = ref("");
const msgList = ref([]);
const bodyRef = ref(null);
const visitor_id = computed(() => getVisitorId());
const lastMsgId = ref(0);
const isPolling = ref(false);

// ==================== 产品咨询 ====================
// 产品咨询接收人ID
// const WECOM_TOUSER_1 = "b52369d4a0b2a0d1ee2376d224a6cf74"
const WECOM_TOUSER_1 = "LiuCheng";
const openWecom = ref(false);
const wecomBlink = ref(false);
const minimizeWecom = ref(false);
const wecomInputText = ref("");
const wecomMsgList = ref([]);
const wecomBodyRef = ref(null);
const wecomVisitorId = computed(() => getWecomVisitorId());
const wecomLastMsgId = ref(0);
const isWecomPolling = ref(false);

// ==================== 维保咨询 ====================
// 维保咨询接收人ID
const WECOM_TOUSER_2 = "XiaoNanGua";
const openWecom2 = ref(false);
const minimizeWecom2 = ref(false);
const wecomBlink2 = ref(false);
const wecomInputText2 = ref("");
const wecomMsgList2 = ref([]);
const wecomBodyRef2 = ref(null);
const wecomVisitorId2 = computed(() => getWecomVisitorId2());
const wecomLastMsgId2 = ref(0);
const isWecomPolling2 = ref(false);

const getVisitorId = () => {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = "v_" + Date.now() + Math.random().toString(36).slice(2, 6);
    localStorage.setItem("visitor_id", id);
  }
  return id;
};

const getWecomVisitorId = () => {
  let id = localStorage.getItem("wecom_visitor_id");
  if (!id) {
    id = "wecom_" + Date.now() + Math.random().toString(36).slice(2, 6);
    localStorage.setItem("wecom_visitor_id", id);
  }
  return id;
};

const getWecomVisitorId2 = () => {
  let id = localStorage.getItem("wecom_visitor_id2");
  if (!id) {
    id = "wecom2_" + Date.now() + Math.random().toString(36).slice(2, 6);
    localStorage.setItem("wecom_visitor_id2", id);
  }
  return id;
};

// 公众号客服逻辑
const startLongPoll = async () => {
  if (isPolling.value) return;
  if (!open.value && !minimizeChat.value) {
    setTimeout(startLongPoll, 2000);
    return;
  }
  isPolling.value = true;
  try {
    const res = await chatPullMessageLongPoll(
      visitor_id.value,
      lastMsgId.value,
    );
    if (res?.code === 200 && res.data?.length > 0) {
      msgList.value.push(...res.data);
      lastMsgId.value = res.data.at(-1).id;

      if (minimizeChat.value) {
        chatBlink.value = true;
      }
      nextTick(() => {
        if (bodyRef.value && open.value && !minimizeChat.value) {
          bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
        }
      });
    }
  } catch (e) {
    console.error("公众号轮询错误:", e);
    await new Promise((r) => setTimeout(r, 3000));
  } finally {
    isPolling.value = false;
    setTimeout(startLongPoll, 100);
  }
};

const sendMsg = async () => {
  if (!inputText.value.trim()) return;
  try {
    await chatSendMessage({
      visitor_id: visitor_id.value,
      sender: "visitor",
      content: inputText.value,
    });
    inputText.value = "";
    // const res = await chatPullMessageLongPoll(visitor_id.value, lastMsgId.value)
    // if (res.code === 200 && res.data?.length > 0) {
    //   msgList.value.push(...res.data)
    //   lastMsgId.value = res.data.at(-1).id
    //   nextTick(() => {
    //     if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    //   })
    // }
  } catch (e) {
    console.error("发送消息错误:", e);
  }
};

// ==================== 产品咨询 ====================
const startWecomLongPoll = async () => {
  if (isWecomPolling.value) return;
  if (!openWecom.value && !minimizeWecom.value) {
    setTimeout(startWecomLongPoll, 2000);
    return;
  }
  isWecomPolling.value = true;
  try {
    const res = await chatPullMessageLongPoll(
      wecomVisitorId.value,
      wecomLastMsgId.value,
    );
    if (res?.code === 200 && res.data?.length > 0) {
      wecomMsgList.value.push(...res.data);
      wecomLastMsgId.value = res.data.at(-1).id;

      //  最小化  闪烁
      if (minimizeWecom.value) {
        wecomBlink.value = true;
      }
      nextTick(() => {
        if (wecomBodyRef.value && openWecom.value && !minimizeWecom.value) {
          wecomBodyRef.value.scrollTop = wecomBodyRef.value.scrollHeight;
        }
      });
    }
  } catch (e) {
    console.error("企微轮询错误:", e);
    await new Promise((r) => setTimeout(r, 3000));
  } finally {
    isWecomPolling.value = false;
    setTimeout(startWecomLongPoll, 100);
  }
};

const sendWecomMsg = async () => {
  if (!wecomInputText.value.trim()) return;
  try {
    await chatSendToWeCom({
      visitor_id: wecomVisitorId.value,
      sender: "visitor",
      content: wecomInputText.value,
      touser: WECOM_TOUSER_1,
    });
    wecomInputText.value = "";
  } catch (e) {
    console.error("企微发送错误:", e);
  }
};

// ==================== 维保咨询 ====================
const startWecomLongPoll2 = async () => {
  if (isWecomPolling2.value) return;
  if (!openWecom2.value && !minimizeWecom2.value) {
    setTimeout(startWecomLongPoll2, 2000);
    return;
  }
  isWecomPolling2.value = true;
  try {
    const res = await chatPullMessageLongPoll(
      wecomVisitorId2.value,
      wecomLastMsgId2.value,
    );
    if (res?.code === 200 && res.data?.length > 0) {
      wecomMsgList2.value.push(...res.data);
      wecomLastMsgId2.value = res.data.at(-1).id;

      if (minimizeWecom2.value) {
        wecomBlink2.value = true;
      }
      nextTick(() => {
        if (wecomBodyRef2.value && openWecom2.value && !minimizeWecom2.value) {
          wecomBodyRef2.value.scrollTop = wecomBodyRef2.value.scrollHeight;
        }
      });
    }
  } catch (e) {
    console.error("企微2轮询错误:", e);
    await new Promise((r) => setTimeout(r, 3000));
  } finally {
    isWecomPolling2.value = false;
    setTimeout(startWecomLongPoll2, 100);
  }
};

const sendWecomMsg2 = async () => {
  if (!wecomInputText2.value.trim()) return;
  try {
    await chatSendToWeCom({
      visitor_id: wecomVisitorId2.value,
      sender: "visitor",
      content: wecomInputText2.value,
      touser: WECOM_TOUSER_2,
    });
    wecomInputText2.value = "";
    // const res = await chatPullMessageLongPoll(wecomVisitorId2.value, wecomLastMsgId2.value)
    // if (res.code === 200 && res.data?.length > 0) {
    //   wecomMsgList2.value.push(...res.data)
    //   wecomLastMsgId2.value = res.data.at(-1).id
    //   nextTick(() => {
    //     if (wecomBodyRef2.value) wecomBodyRef2.value.scrollTop = wecomBodyRef2.value.scrollHeight
    //   })
    // }
  } catch (e) {
    console.error("企微2发送错误:", e);
  }
};

// 工具方法
const formatTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getCurrentTime = () => {
  return formatTime(new Date());
};

// 窗口控制：公众号
const handleOpenChat = () => {
  open.value = !open.value;
  openWecom.value = false;
  openWecom2.value = false;
  minimizeChat.value = false;
  minimizeWecom.value = false;
  minimizeWecom2.value = false;
  nextTick(() => {
    if (open.value && bodyRef.value)
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
  });
};

const handleCloseChat = () => {
  open.value = false;
  minimizeChat.value = false;
};
const restoreChat = () => {
  minimizeChat.value = false;
  open.value = true;
  chatBlink.value = false
  nextTick(() => bodyRef.value?.scrollTo(0, bodyRef.value.scrollHeight));
};
const closeMiniChat = () => {
  minimizeChat.value = false;
  open.value = false;
};

// 窗口控制：企微1
const handleOpenWecom = () => {
  openWecom.value = !openWecom.value;
  open.value = false;
  openWecom2.value = false;
  minimizeWecom.value = false;
  minimizeWecom2.value = false;
  nextTick(() => {
    if (openWecom.value && wecomBodyRef.value)
      wecomBodyRef.value.scrollTop = wecomBodyRef.value.scrollHeight;
  });
};
const handleCloseWecom = () => {
  openWecom.value = false;
  minimizeWecom.value = false;
};
const restoreWecom = () => {
  minimizeWecom.value = false;
  openWecom.value = true;
  wecomBlink.value = false
  nextTick(() =>
    wecomBodyRef.value?.scrollTo(0, wecomBodyRef.value.scrollHeight),
  );
};
const closeMiniWecom = () => {
  minimizeWecom.value = false;
  openWecom.value = false;
};

// 窗口控制：企微2
const handleOpenWecom2 = () => {
  openWecom2.value = !openWecom2.value;
  open.value = false;
  openWecom.value = false;
  minimizeWecom.value = false;
  minimizeWecom2.value = false;
  nextTick(() => {
    if (openWecom2.value && wecomBodyRef2.value)
      wecomBodyRef2.value.scrollTop = wecomBodyRef2.value.scrollHeight;
  });
};
const handleCloseWecom2 = () => {
  openWecom2.value = false;
  minimizeWecom2.value = false;
};
const restoreWecom2 = () => {
  minimizeWecom2.value = false;
  openWecom2.value = true;
  wecomBlink2.value = false
  nextTick(() =>
    wecomBodyRef2.value?.scrollTo(0, wecomBodyRef2.value.scrollHeight),
  );
};
const closeMiniWecom2 = () => {
  minimizeWecom2.value = false;
  openWecom2.value = false;
};

// 监听
watch([open, minimizeChat], ([val, mini]) => {
  if ((val || mini) && !isPolling.value) startLongPoll();
});
watch([openWecom, minimizeWecom], ([val, mini]) => {
  if ((val || mini) && !isWecomPolling.value) startWecomLongPoll();
});
watch([openWecom2, minimizeWecom2], ([val, mini]) => {
  if ((val || mini) && !isWecomPolling2.value) startWecomLongPoll2();
});

onMounted(() => {
  startLongPoll();
  startWecomLongPoll();
  startWecomLongPoll2();
});
</script>

<style scoped>
.chat-service {
  position: fixed;
  right: 20px;
  bottom: 200px;
  z-index: 9999;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.chat-group {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.chat-toggle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0088ff, #0066cc);
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0, 136, 255, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
}

.chat-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 136, 255, 0.4);
}

.chat-toggle.wecom {
  background: linear-gradient(135deg, #0e777f, #1f9aa3);
}

.chat-toggle.wecom:hover {
  box-shadow: 0 8px 20px rgb(14, 119, 127, 0.4);
}

.mini-chat {
  width: 200px;
  height: 50px;
  background: linear-gradient(135deg, #0088ff, #0066cc);
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 136, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mini-chat:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 136, 255, 0.3);
}

.mini-chat.wecom-mini {
  background: linear-gradient(135deg, #0e777f, #1f9aa3);
}

.mini-chat.wecom-mini:hover {
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.3);
}

.mini-avatar {
  background-color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.mini-title {
  color: white;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}

.mini-close {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.mini-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-panel {
  position: absolute;
  bottom: 70px;

  right: 0;
  width: 380px;
  height: 550px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #f0f2f5;
  transition: all 0.3s ease;
  z-index: 9999;
}

.wecom-group .chat-panel {
  bottom: 70px;
}

.chat-header {
  padding: 16px;
  background: linear-gradient(135deg, #0088ff, #0066cc);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.chat-header.wecom-header {
  background: linear-gradient(135deg, #0e777f, #1f9aa3);
}

.header-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
}

.header-status {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  right: 80px;
  bottom: 8px;
}

.window-controls {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.chat-body {
  flex: 1;
  padding: 20px 16px;
  background: #f7f8fa;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #dcdfe6 #f7f8fa;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: #f7f8fa;
}

.chat-body::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.msg-item {
  display: flex;
  margin-bottom: 16px;
  max-width: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.msg-item.visitor {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 8px;
  flex-shrink: 0;
  border: 1px solid #f0f2f5;
}

.msg-content {
  max-width: 70%;
}

.msg-text {
  padding: 10px 14px;
  border-radius: 12px;
  line-height: 1.5;
  font-size: 14px;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.msg-item.visitor .msg-text {
  background: #fff;
  color: #333;
  border: 1px solid #e5e6eb;
  border-bottom-left-radius: 4px;
}

.msg-item.admin .msg-text {
  background: #fff;
  color: #333;
  border: 1px solid #e5e6eb;
  border-bottom-left-radius: 4px;
}

.msg-time {
  font-size: 11px;
  color: #909399;
  margin-top: 4px;
  text-align: right;
}

.msg-item.admin .msg-time {
  text-align: left;
}

.chat-footer {
  display: flex;
  padding: 12px 16px;
  gap: 10px;
  border-top: 1px solid #f0f2f5;
  background: #fff;
  align-items: center;
}

.msg-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e6eb;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  resize: none;
  height: 48px;
  max-height: 120px;
  min-height: 48px;
}

.msg-input:focus {
  border-color: #0088ff;
  box-shadow: 0 0 0 2px rgba(0, 136, 255, 0.1);
}

.msg-input::placeholder {
  color: #c0c4cc;
}

.send-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #0088ff, #0066cc);
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-btn:hover {
  background: linear-gradient(135deg, #0077ee, #0055bb);
  transform: translateY(-1px);
}

.send-btn:disabled {
  background: #c0c4cc;
  cursor: not-allowed;
  transform: none;
}

.send-btn.wecom-btn {
  background: linear-gradient(135deg, #0e777f, #1f9aa3);
}

.send-btn.wecom-btn:hover {
  background: linear-gradient(135deg, #0e777f, #1f9aa3);
}

@media (max-width: 480px) {
  .chat-panel {
    width: calc(100vw - 40px);
    height: 80vh;
    bottom: 20px;
    right: 0;
  }

  .chat-group {
    width: 100%;
    justify-content: flex-end;
  }

  .mini-chat {
    width: calc(100vw - 140px);
  }
}


@keyframes miniBlink {
  0% {
    background: #0088ff;
  }

  50% {
    background: #ff3333;
  }

  100% {
    background: #0088ff;
  }
}

.mini-chat.blink {
  animation: miniBlink 1s infinite;
}

.mini-chat.wecom-mini.blink {
  animation: miniBlinkWecom 1s infinite;
}

@keyframes miniBlinkWecom {
  0% {
    background: #0e777f;
  }

  50% {
    background: #78ccd2;
  }

  100% {
    background: #0e777f;
  }
}
</style>
