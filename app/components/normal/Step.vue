<template>
  <div class="step-progress-wrapper">

    <div class="year-image-wrapper">
      <img v-if="currentImage" :src="currentImage" :alt="currentYear" class="year-image">
    </div>

    <div class="scroll-container-border">
      <!--  左右滚动按钮 -->
      <button class="scroll-btn left-btn" @click="scrollStep('left')" :disabled="scrollOffset >= -paddingPx">
        <el-icon :size="20" style="color: #1969B4;">
          <Back />
        </el-icon>
      </button>

      <!--  滚动容器 -->
      <div class="scroll-container" ref="scrollContainer">
        <div class="custom-step-progress"
          :style="{ transform: `translateX(${scrollOffset}px)`, width: totalWidth + 'px' }">
          <div class="progress-bar-container" :style="{ width: totalWidth + 'px' }">
            <div class="progress-bar-bg">
              <div class="progress-bar-inner" :style="{ width: progressWidth - halfNodeWidthPercent + '%' }"></div>
            </div>
          </div>

          <!--  显示年份标题 -->
          <div v-for="(item, index) in stepsArr" :key="item.id" class="step-item" :class="{
            'step-done': index < active,
            'step-active': index === active,
            'step-wait': index > active
          }" :style="{ left: getNodeLeft(index) + '%', width: nodeWidth + 'px' }" @click="handleNodeClick(index)">
            <div class="step-node"></div>
            <div class="step-label">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <!--  右滚动按钮 -->
      <button class="scroll-btn right-btn" @click="scrollStep('right')"
        :disabled="scrollOffset <= -(nodeWidth * (stepsArr.length - visibleCount) + paddingPx)">
        <el-icon :size="20" style="color: #1969B4;">
          <Right />
        </el-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, watchEffect } from 'vue'

import { Back, Right } from '@element-plus/icons-vue'


const stepsArr = [
  { id: 1, title: "2009", img: "/images/about/2009.png" },
  { id: 2, title: "2013", img: "/images/about/2013.png" },
  { id: 3, title: "2014", img: "/images/about/2014.png" },
  { id: 4, title: "2015", img: "/images/about/2015.png" },
  { id: 5, title: "2016", img: "/images/about/2016.png" },
  { id: 6, title: "2017", img: "/images/about/2017.png" },
  { id: 7, title: "2018", img: "/images/about/2018.png" },
  { id: 8, title: "2019", img: "/images/about/2019.png" },
  { id: 9, title: "2020", img: "/images/about/2020.png" },
  { id: 10, title: "2021", img: "/images/about/2021.png" },
  { id: 11, title: "2022", img: "/images/about/2022.png" },
  { id: 12, title: "2023", img: "/images/about/2023.png" },
  { id: 13, title: "2024", img: "/images/about/2024.png" },
  { id: 14, title: "2025", img: "/images/about/2025.png" },
]

// 当前显示的图片和年份 
const currentImage = ref(stepsArr[0].img)
const currentYear = ref(stepsArr[0].title)


//  active默认值改为0（ 2009）
const active = ref(0)
const progressWidth = ref(0)
const halfNodeWidthPercent = ref(0)
const paddingPercent = ref(5)
const paddingPx = 20


const scrollContainer = ref(null)
const scrollOffset = ref(-paddingPx)
const visibleCount = ref(7)
const nodeWidth = ref(0)
const totalWidth = ref(0)


const calculateProgress = () => {
  if (stepsArr.length === 0) return
  const containerWidth = document.querySelector('.progress-bar-container')?.offsetWidth || totalWidth.value
  halfNodeWidthPercent.value = (29 / containerWidth) * 100
  const baseProgress = (active.value / (stepsArr.length - 1)) * 100
  progressWidth.value = paddingPercent.value + baseProgress * (100 - 2 * paddingPercent.value) / 100
}


const getNodeLeft = (index) => {
  if (stepsArr.length === 0) return 0
  return paddingPercent.value + (index / (stepsArr.length - 1)) * (100 - 2 * paddingPercent.value)
}


const handleNodeClick = (index) => {
  active.value = index
  // 当前图片和年份
  currentImage.value = stepsArr[index].img
  currentYear.value = stepsArr[index].title
  autoScrollToActive(index)
}


const scrollStep = (direction) => {
  if (stepsArr.length <= visibleCount.value) return
  const step = nodeWidth.value
  if (direction === 'left') {
    scrollOffset.value = Math.min(scrollOffset.value + step, -paddingPx)
  } else {
    const maxOffset = -(stepsArr.length - visibleCount.value) * nodeWidth.value - paddingPx
    scrollOffset.value = Math.max(scrollOffset.value - step, maxOffset)
  }
}


const autoScrollToActive = (index) => {
  if (stepsArr.length <= visibleCount.value) return
  const minVisibleIndex = Math.abs(Math.round((scrollOffset.value + paddingPx) / nodeWidth.value))
  const maxVisibleIndex = minVisibleIndex + visibleCount.value - 1

  if (index < minVisibleIndex) {
    scrollOffset.value = -index * nodeWidth.value - paddingPx
  } else if (index > maxVisibleIndex) {
    scrollOffset.value = -(index - visibleCount.value + 1) * nodeWidth.value - paddingPx
  }
}


const updateNodeSize = () => {
  if (!scrollContainer.value || stepsArr.length === 0) return
  nodeWidth.value = Math.floor(scrollContainer.value.offsetWidth / visibleCount.value)
  totalWidth.value = stepsArr.length * nodeWidth.value
  calculateProgress()
}


watch(active, calculateProgress)
watchEffect(() => {
  setTimeout(updateNodeSize, 0)
})

onMounted(() => {
  updateNodeSize()
  calculateProgress()
  window.addEventListener('resize', updateNodeSize)

  //自动切换图片和年份
  setInterval(() => {
    active.value = (active.value + 1) % stepsArr.length
    handleNodeClick(active.value)
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateNodeSize)
})
</script>

<style scoped lang="scss">
.step-progress-wrapper {
  // border: 2px solid green;
  width: 70%;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;



  .scroll-container-border {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    // border: 3px solid green;
    width: 100%;

    .scroll-container {
      width: 90%;
      overflow: hidden;
      position: relative;
      height: 100px;
      // border: 3px solid red;
    }

    .scroll-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #EBEBED;
      background-color: #EBEBED;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      margin-bottom: 80px;

      &:disabled {
        cursor: not-allowed !important;
        opacity: 0.5;
        background-color: #f5f5f5 !important;
        border-color: #d9d9d9 !important;
      }
    }


  }

  .year-image-wrapper {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 220px;
    overflow: hidden;
    z-index: 10;
    // border: 3px solid yellow;
  }

  .year-image {
    width: 100%;
    height: 100%;
    // object-fit: contain;
    transition: all 0.3s ease;
  }
}


.scroll-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.scroll-btn:not(:disabled):hover {
  background-color: #f3f4f6;
  border-color: #1969B4;
}


.custom-step-progress {
  padding: 40px 0;
  position: relative;
  transition: transform 0.3s ease;
}

.progress-bar-container {
  padding: 0 20px;
  box-sizing: border-box;
}

.progress-bar-bg {
  width: 100%;
  height: 12px;
  background-color: #E0EDFD;
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
  background-color: #1969B4;
  border-radius: 8px;
  transition: width 0.3s ease;
}

.step-item {
  position: absolute;
  // top: calc(进度条top值 + 进度条高度/2 - 节点高度/2);
  top: calc(24px + 12px/2 - 16px/2);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  cursor: pointer;
}

.step-node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #1969B4;
  transition: all 0.3s ease;
  // box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
}

.step-label {
  margin-top: 24px;
  color: #9ca3af;
  transition: color 0.3s ease;
  white-space: nowrap;
  font-size: 16px;
}

.step-done .step-node {
  background-color: #FFFFFF;
  border-color: #1969B4;
}

.step-done .step-label {
  color: #1969B4;
}

.step-active .step-node {
  background-color: #fff;
  border-color: #1969B4;
}

.step-active .step-label {
  color: #1969B4;
  font-weight: 500;
}

.step-wait .step-node {
  background-color: #fff;
  border-color: #1969B4;
}

.step-wait .step-label {
  color: #9ca3af;
}

.step-item:hover .step-node {
  transform: scale(1.1);
}
</style>