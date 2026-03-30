<!--
 * @Author: Sid Li
 * @Date: 2026-02-27 14:46:29
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-30 14:21:17
 * @FilePath: \nuxt-free-new\app\components\MainSelect.vue
 * @Description: 
-->
<template>
  <div class="select-container">
    <div class="select-content-container">
      <div class="select-title">各行业TOP的共同选择</div>
      <div class="select-text">应用范围广泛</div>
    </div>
    <div class="select-img-container">
      <div :class="index == 1 ? 'select-img-item-center' : 'select-img-item'" v-for="(item, index) in selectArr"
        :key="item.id">
        <div class="select-img-item-content">
          <img alt="选择图片" :src="item.img_url" />
          <div class="select-img-item-text-container">
            <div class="select-img-item-name">{{ item.name }}</div>
            <div class="select-img-item-text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const selectArr = ref([]);


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
    selectArr.value = newVal;
  },
  { immediate: true, deep: true }
);


onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.select-container {
  width: 100%;
  height: 100%;
  // border: 2px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .select-content-container {
    width: 100%;
    height: 15vh;
    // border: 2px solid green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4vh;
    box-sizing: border-box;

    .select-title {

      // border: 1px solid red;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 5px;
      font-family: "SourceHanSansCN-Bold";
    }

    .select-text {
      // border: 1px solid red;
      font-size: 16px;
      font-family: "SourceHanSansCN-Regular";
    }
  }



  .select-img-container {
    width: 100%;
    height: 55vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .select-img-item {
      width: 26.5%;
      height: 100%;
      // border: 1px solid red;
    }

    .select-img-item-center {
      width: 45%;
      height: 100%;
      // border: 1px solid red;
    }

    .select-img-item-content {
      height: 100%;
      position: relative;

      // border: 3px solid green;
      img {
        width: 100%;
        height: 100%;
      }

      .select-img-item-text-container {
        width: 100%;
        height: 100%;
        // border: 2px solid yellow;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 0;
        padding-top: 2vh;
        background: linear-gradient(to bottom, rgba(46, 157, 164, 0.4) 0%, rgba(46, 157, 164, 0) 100%);

        .select-img-item-name {
          font-weight: bold;
          font-size: 20px;
          color: #ffffff;
        }

        .select-img-item-text {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }

}
</style>
