<template>
  <div class="step-progress-wrapper">
    <!-- 左右滚动按钮 -->
    <button class="scroll-btn left-btn" @click="scrollStep('left')" :disabled="scrollOffset >= -paddingPx">
      ←
    </button>

    <!-- 滚动容器：只显示visibleCount个节点宽度 -->
    <div class="scroll-container" ref="scrollContainer">
      <div class="custom-step-progress"
        :style="{ transform: `translateX(${scrollOffset}px)`, width: totalWidth + 'px' }">
        <!-- 外层容器：加左右padding，让节点不顶边 -->
        <div class="progress-bar-container" :style="{ width: totalWidth + 'px' }">
          <div class="progress-bar-bg">
            <!-- 核心：只减节点一半宽度的百分比 -->
            <div class="progress-bar-inner" :style="{ width: progressWidth - halfNodeWidthPercent + '%' }"></div>
          </div>
        </div>

        <div v-for="(item, index) in steps" :key="index" class="step-item" :class="{
          'step-done': index < active,
          'step-active': index === active,
          'step-wait': index > active
        }" :style="{ left: getNodeLeft(index) + '%', width: nodeWidth + 'px' }" @click="handleNodeClick(index)">
          <div class="step-node"></div>
          <div class="step-label">{{ item }}</div>
        </div>
      </div>
    </div>

    <!-- 右滚动按钮 -->
    <button class="scroll-btn right-btn" @click="scrollStep('right')"
      :disabled="scrollOffset <= -(nodeWidth * (steps.length - visibleCount) + paddingPx)">
      →
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, watchEffect } from 'vue'

// 示例：30天节点（可替换为任意数量）
const steps = ref(Array.from({ length: 30 }, (_, i) => `2023.${i + 1}日`))
const active = ref(5) // 当前激活节点（示例：第6天）
const progressWidth = ref(0)
const halfNodeWidthPercent = ref(0)
const paddingPercent = ref(5) // 左右留白的百分比
const paddingPx = 20 // 左右padding的像素值，和CSS中一致

// 滚动相关配置（可灵活调整）
const scrollContainer = ref(null) // 滚动容器ref
const scrollOffset = ref(-paddingPx) // 初始偏移：向左移动paddingPx，隐藏左边空白
const visibleCount = ref(6) // 一屏显示的节点数量（可改）
const nodeWidth = ref(0) // 单个节点宽度（动态计算）
const totalWidth = ref(0) // 所有节点的总宽度（动态计算）

// 计算进度和节点占比
const calculateProgress = () => {
  if (steps.value.length === 0) return // 空节点保护
  // 1. 获取进度条容器宽度（px）
  const containerWidth = document.querySelector('.progress-bar-container')?.offsetWidth || totalWidth.value
  // 2. 保留你调试好的29补偿值（转百分比）
  halfNodeWidthPercent.value = (29 / containerWidth) * 100
  // 3. 基础进度宽度（扣除左右留白）
  const baseProgress = (active.value / (steps.value.length - 1)) * 100
  progressWidth.value = paddingPercent.value + baseProgress * (100 - 2 * paddingPercent.value) / 100
}

// 计算节点左侧定位（适配留白）
const getNodeLeft = (index) => {
  if (steps.value.length === 0) return 0
  return paddingPercent.value + (index / (steps.value.length - 1)) * (100 - 2 * paddingPercent.value)
}

// 点击节点切换active
const handleNodeClick = (index) => {
  active.value = index
  // 自动滚动到当前节点可见区域
  autoScrollToActive(index)
}

// 滚动步骤
const scrollStep = (direction) => {
  if (steps.value.length <= visibleCount.value) return // 节点数≤显示数，不滚动
  const step = nodeWidth.value // 每次滚动一个节点宽度
  if (direction === 'left') {
    // 左滚：偏移量增加（往回走），最大不超过 -paddingPx（刚好隐藏左边空白）
    scrollOffset.value = Math.min(scrollOffset.value + step, -paddingPx)
  } else {
    // 右滚：偏移量减少（往前走），最小不低于 -(总可滚动距离 + paddingPx)，刚好露出右边进度条末端
    const maxOffset = -(steps.value.length - visibleCount.value) * nodeWidth.value - paddingPx
    scrollOffset.value = Math.max(scrollOffset.value - step, maxOffset)
  }
}

// 自动滚动到激活节点
const autoScrollToActive = (index) => {
  if (steps.value.length <= visibleCount.value) return
  // 计算当前节点的可视范围
  const minVisibleIndex = Math.abs(Math.round((scrollOffset.value + paddingPx) / nodeWidth.value))
  const maxVisibleIndex = minVisibleIndex + visibleCount.value - 1

  // 如果节点不在可视范围，自动滚动
  if (index < minVisibleIndex) {
    scrollOffset.value = -index * nodeWidth.value - paddingPx
  } else if (index > maxVisibleIndex) {
    scrollOffset.value = -(index - visibleCount.value + 1) * nodeWidth.value - paddingPx
  }
}

// 初始化/更新节点尺寸（核心：适配任意节点数量）
const updateNodeSize = () => {
  if (!scrollContainer.value || steps.value.length === 0) return
  // 1. 单个节点宽度 = 滚动容器宽度 / 显示数量
  nodeWidth.value = Math.floor(scrollContainer.value.offsetWidth / visibleCount.value)
  // 2. 所有节点总宽度 = 节点数量 * 单个节点宽度
  totalWidth.value = steps.value.length * nodeWidth.value
  // 3. 重新计算进度（适配新尺寸）
  calculateProgress()
}

// 监听active变化
watch(active, calculateProgress)
// 监听节点数量/显示数量变化，自动更新尺寸
watchEffect(() => {
  setTimeout(updateNodeSize, 0) // 延迟确保DOM渲染完成
})

// 初始化+响应式适配
onMounted(() => {
  updateNodeSize()
  calculateProgress()
  // 窗口大小变化时更新尺寸
  window.addEventListener('resize', updateNodeSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNodeSize)
})
</script>

<style scoped>
/* 外层包裹容器 */
.step-progress-wrapper {
  width: 100%;
  max-width: 800px;
  /* 可根据需求调整整体宽度 */
  margin: 20px auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 滚动按钮 */
.scroll-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.scroll-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.scroll-btn:not(:disabled):hover {
  background-color: #f3f4f6;
  border-color: #6366f1;
}

/* 滚动容器：限制宽度，溢出隐藏 */
.scroll-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 100px;
  /* 进度条高度 */
}

/* 进度条容器：可滚动（宽度动态计算） */
.custom-step-progress {
  padding: 40px 0;
  position: relative;
  transition: transform 0.3s ease;
  /* 移除固定宽度，改为动态赋值 */
}

/* 进度条容器：加左右padding，让节点不顶边 */
.progress-bar-container {
  padding: 0 20px;
  /* 和JS中paddingPx一致 */
  box-sizing: border-box;
  /* 宽度动态赋值 */
}

.progress-bar-bg {
  width: 100%;
  height: 16px;
  background-color: #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  top: 24px;
  left: 20px;
  right: 20px;
  z-index: 1;
}

.progress-bar-inner {
  height: 100%;
  background-color: #6366f1;
  border-radius: 8px;
  transition: width 0.3s ease;
}

/* 步骤节点：垂直居中+适配留白（宽度动态计算） */
.step-item {
  position: absolute;
  top: calc(24px + 16px/2 - 16px/2);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  /* 点击指针 */
  /* 移除固定宽度，改为动态赋值 */
}

.step-node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
}

.step-label {
  margin-top: 24px;
  font-size: 14px;
  color: #9ca3af;
  transition: color 0.3s ease;
  /* 适配小宽度节点：文字换行/缩小 */
  white-space: nowrap;
  font-size: 12px;
}

/* 状态样式 */
.step-done .step-node {
  background-color: #6366f1;
  border-color: #6366f1;
}

.step-done .step-label {
  color: #6366f1;
}

.step-active .step-node {
  background-color: #fff;
  border-color: #6366f1;
}

.step-active .step-label {
  color: #6366f1;
  font-weight: 500;
}

.step-wait .step-node {
  background-color: #fff;
  border-color: #e5e7eb;
}

.step-wait .step-label {
  color: #9ca3af;
}

/* 节点点击hover效果 */
.step-item:hover .step-node {
  transform: scale(1.1);
}
</style>