<template>
  <div class="about-swiper-main">

    <swiper v-if="treatData.length > 0" class="home-swiper" :modules="modules" :slides-per-view="3" :space-between="10"
      :loop="treatData.length >= 1" :loop-additional-slides="3" :autoplay="autoplayOptions" :speed="800"
      @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide class="page-slide" v-for="(pageData, pageIndex) in treatData" :key="pageIndex">
        <img :src="pageData.img_url" alt="" @error="handleImgError(pageData)" />
      </swiper-slide>
    </swiper>

    <div class="swiper-button-container">
      <span class="custom-swiper-button-prev" @click="goPrev">
        <img src="/images/prev.png" alt="上一页" />
      </span>
      <span class="custom-swiper-button-next" @click="goNext">
        <img src="/images/next.png" alt="下一页" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";

const modules = [Navigation, Autoplay];
const treatData = ref([]);
const swiperInstance = ref(null);

const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};

const props = defineProps({
  swiperData: { type: Array, required: true, default: () => [] },
});

watch(
  () => props.swiperData,
  (newVal) => {
    if (newVal.length === 3) {
      newVal = [...newVal, ...newVal];
    }

    treatData.value = newVal || [];
  },
  { immediate: true, deep: true }
);

const handleImgError = (item) => {
  item.img_url = "/images/default.png";
};

const goPrev = () => {
  if (!swiperInstance.value) return;
  swiperInstance.value.slidePrev();
};

const goNext = () => {
  if (!swiperInstance.value) return;
  swiperInstance.value.slideNext();
};

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;

 
  if (treatData.value.length === 3) {
    setTimeout(() => {
      swiper.loopCreate();
      swiper.update();
    }, 0);
  }
};

const onSlideChange = (swiper) => { };

onUnmounted(() => {
  swiperInstance.value?.destroy(true, true);
  swiperInstance.value = null;
});
</script>

<style scoped lang="scss">
.about-swiper-main {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  // border: 2px solid blue;
}

.home-swiper {
  width: 100%;
  height: 40vh;
  // border: 2px solid red;

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    display: none !important;
  }

  :deep(.swiper-wrapper) {
    height: 100%;
    width: 100%;
    align-items: center;
  }

  :deep(.swiper-slide) {
    width: calc((100% - 20px) / 3) !important;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
    transition: transform 0.3s ease;
    transform: scale(0.8);
  }

  :deep(.swiper-slide-next) {
    transform: scale(1.15);
    z-index: 10;
  }
}

.page-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 2px solid green;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.swiper-button-container {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  width: 50px;
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  span {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:first-child {
      border-bottom: 1px solid #fff;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>