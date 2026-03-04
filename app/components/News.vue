<!--
 * @Author: Sid Li
 * @Date: 2026-02-27 14:46:29
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-04 16:28:36
 * @FilePath: \nuxt-free-new\app\components\News.vue
 * @Description: 
-->
<template>
  <div class="news-container">
    <div class="news-container-border">
      <div class="news-title">
        <span class="title-zh">新闻中心</span>
        <span class="title-en">阜瑞的最新动态</span>
      </div>
      <div class="news-content">
        <div class="news-content-item" v-for="item in newsArr" :key="item.id">
          <img :src="item.pic" alt="" />
          <div class="news-content-item-text">
            <div class="news-title-zh">{{ item.title }}</div>
            <div class="news-name-zh">{{ item.name }}</div>
          </div>

          <div class="more-date">
            <div>了解更多>></div>
            <div class="news-content-item-date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const newsArr = ref([]);



const props = defineProps({
  newsContentItems: {
    type: Array,
    default: () => [],
  },
});


watch(
  () => props.newsContentItems,
  (newVal) => {
    if (!newVal.length) return;
    newsArr.value = newVal;
  },
  { immediate: true, deep: true }
);



onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.news-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  // border: 2px solid blue;
  box-sizing: border-box;
  background-color: #F2F3F5;
  padding-bottom: 10vh;

  .news-container-border {
    width: 60%;
    height: 100%;
    // border: 2px solid red;
    box-sizing: border-box;

    .news-title {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin: 6vh 0 2vh 0;
      width: 100%;
      height: 10vh;
      // border: 2px solid red;
      box-sizing: border-box;

      .title-zh {
        font-size: 30px;
        font-weight: bold;
      }

      .title-en {
        font-size: 16px;
        // color: #999999;
      }
    }

    .news-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: auto;
      // border: 2px solid red;
      box-sizing: border-box;

      .news-content-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: start;
        width: 30%;
        height: 100%;
        // border: 2px solid red;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;

        img {
          width: 100%;
          height: 25vh;
          // border: 3px solid green;
          box-sizing: border-box;
          // object-fit: cover;
          // object-position: center;
        }

        .news-content-item-text {
          padding: 10px;
          width: 100%;
          height: 30%;
          // border: 3px solid green;
          box-sizing: border-box;

          .news-title-zh {
            color: #333;
            // 超出部分省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            margin: 10px 0 10px 0;
            font-size: 18px;
          }

          .news-name-zh {
            font-size: 16px;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .more-date {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          box-sizing: border-box;
          padding: 10px;

          div {
            font-size: 12px;
            // color: #999999;
          }
        }
      }
    }
  }



}
</style>
