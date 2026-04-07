<template>
  <div class="main-select-swiper-container">
    <div class="select-content-container">
      <div class="select-title">各行业TOP的共同选择</div>
      <div class="select-text">应用范围广泛</div>
    </div>

    <div class="swiper-container">
      <IndusSwiper :swiperData="swiperData" :activeIndex="testIndex" />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import IndusSwiper from '@/components/IndusSwiper.vue';

const swiperData = ref([]);
const testIndex = ref(-1);


const props = defineProps({
  selectContentItems: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.selectContentItems,
  (newVal) => {
    if (!newVal.length) return;
    swiperData.value = newVal;
  },
  { immediate: true, deep: true }
);



onMounted(() => {
  console.log('组件挂载了');
});

</script>

<style scoped lang="scss">
.main-select-swiper-container {

  border: 2px solid red;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .select-content-container {
    width: 100%;
    height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4vh;
    box-sizing: border-box;

    .select-title {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 5px;
      font-family: "SourceHanSansCN-Bold";
    }

    .select-text {
      font-size: 16px;
      font-family: "SourceHanSansCN-Regular";
    }
  }
}
</style>
