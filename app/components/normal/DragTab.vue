<template>
  <div class="product-tab-container scrollable" ref="tabContainerRef" @mousedown="handleDragStart"
    @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" @touchstart="handleDragStart"
    @touchmove="handleDragMove" @touchend="handleDragEnd">
    <div v-for="(item, index) in tabList" :key="item.id" ref="tabItemRefs" class="product-tab"
      :class="{ active: activeIndex === index }" @click="handleTabClick(index, item)">
      {{ item.label }}
    </div>

    <div class="tab-indicator" :style="indicatorStyle"></div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  tabList: {
    type: Array,
    default: () => [],
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['tabChange']);

const tabContainerRef = ref(null);
const tabItemRefs = ref([]);

const indicatorStyle = reactive({
  width: '0px',
  left: '0px',
  opacity: 0,
});

// 拖拽
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const handleDragStart = (e) => {
  if (!tabContainerRef.value) return;
  isDragging = true;
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  startX = clientX - tabContainerRef.value.offsetLeft;
  scrollLeft = tabContainerRef.value.scrollLeft;
  tabContainerRef.value.style.cursor = 'grabbing';
};

const handleDragMove = (e) => {
  if (!isDragging || !tabContainerRef.value) return;
  e.preventDefault();
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const x = clientX - tabContainerRef.value.offsetLeft;
  const walk = (x - startX) * 2;
  tabContainerRef.value.scrollLeft = scrollLeft - walk;
};

const handleDragEnd = () => {
  if (!tabContainerRef.value) return;
  isDragging = false;
  tabContainerRef.value.style.cursor = 'grab';
};

const updateIndicator = async () => {
  await nextTick(() => {
    const currentTab = tabItemRefs.value[props.activeIndex];
    if (currentTab && tabContainerRef.value) {
      const { offsetWidth, offsetLeft } = currentTab;
      indicatorStyle.width = `${offsetWidth}px`;
      indicatorStyle.left = `${offsetLeft}px`;
      indicatorStyle.opacity = 1;
      scrollToActiveTab(currentTab);
    }
  });
};

const scrollToActiveTab = (tabElement) => {
  const container = tabContainerRef.value;
  if (!container) return;
  const containerWidth = container.offsetWidth;
  const tabLeft = tabElement.offsetLeft;
  const tabWidth = tabElement.offsetWidth;
  const currentScroll = container.scrollLeft;

  if (tabLeft < currentScroll) {
    container.scrollTo({ left: tabLeft, behavior: 'smooth' });
  } else if (tabLeft + tabWidth > currentScroll + containerWidth) {
    container.scrollTo({
      left: tabLeft + tabWidth - containerWidth,
      behavior: 'smooth',
    });
  }
};

const handleTabClick = (index, item) => {
  emit('tabChange', index, item);
};

// 监听外部 activeIndex 变化
watch(
  () => props.activeIndex,
  () => {
    updateIndicator();
  },
  { immediate: true }
);

// 监听 tabList  
watch(
  () => props.tabList,
  () => {
    nextTick(() => {
      updateIndicator();
    });
  },
  { deep: true }
);

onMounted(() => {
  if (tabContainerRef.value) {
    tabContainerRef.value.style.cursor = 'grab';
  }
  // updateIndicator();
  window.addEventListener('resize', updateIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator);
});
</script>

<style lang="scss" scoped>
.product-tab-container {
  width: 100%;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  &.scrollable {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
      height: 0;
      width: 0;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .product-tab {
    height: 5vh;
    line-height: 5vh;
    font-size: 20px;
    cursor: pointer;
    min-width: 80px;
    margin-right: 120px;
    box-sizing: border-box;
    font-weight: bold;
    color: #666;
    transition: color 0.3s ease;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    font-family: 'SourceHanSansCN-Regular';

    &.active {
      color: #16418a;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .tab-indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: #16418a;
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    opacity: 0;
  }
}
</style>