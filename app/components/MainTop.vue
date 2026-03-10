<!--
 * @Author: Sid Li
 * @Date: 2026-02-27 14:46:29
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-10 17:12:41
 * @FilePath: \nuxt-free-new\app\components\MainTop.vue
 * @Description: 
-->
<template>
  <div class="top-container">
    <div class="top-title">行业TOP的共同选择</div>
    <div class="top-title-content">
      <div class="top-title-content-border">
        <div v-for="(item, index) in topTitleData" class="top-title-item" :key="item.id">
          <div class="top-title-num">{{ item.num }}</div>
          <div class="top-title-text">{{ item.text }}</div>
        </div>
      </div>
    </div>

    <div class="top-mark-content">
      <div class="top-mark-content-border">
        <div v-for="(item, index) in topData" class="top-img-item-line" :key="item.id">
          <div v-for="(it, idx) in item" :class="idx == 2 || idx == 5 ? 'top-img-item-large' : 'top-img-item'"
            :key="item.id">
            <img :src="it.img" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const topTitleData = ref([
  {
    id: 1,
    num: "50+",
    text: "行业TOP的共同选择",
  },
  {
    id: 2,
    num: "10+",
    text: "覆盖多个行业领域",
  },
  {
    id: 3,
    num: "80%",
    text: "助力整体生产效率提升",
  },
  {
    id: 4,
    num: "100+",
    text: "解决方案应用案例",
  }
  , {
    id: 5,
    num: "40+",
    text: "国家发明专利",
  }
]);

const topArr = ref([]);



const props = defineProps({
  topData: {
    type: Array,
    default: () => [],
  },
});


watch(
  () => props.topData,
  (newVal) => {
    if (!newVal.length) return;
    topArr.value = newVal;
  },
  { immediate: true, deep: true }
);



onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.top-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // border: 2px solid blue;

  .top-title {
    // border: 3px solid yellow;


    font-size: 30px;
    margin: 6vh 0 3vh 0;
    text-align: center;
    font-family: "SourceHanSansCN-Bold";

  }

  .top-title-content {
    height: 15vh;
    // border: 1px solid red;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    .top-title-content-border {
      width: 80%;
      height: 100%;
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .top-title-item {
        height: 100%;
        width: 20%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .top-title-num {

          // border: 1px solid red;

          font-weight: bold;
          font-size: 30px;
          color: #16418A;
          margin-bottom: 2vh;
        }

        .top-title-text {


          font-size: 20px;
          font-family: "SourceHanSansCN-Bold";

        }
      }
    }
  }

  .top-mark-content {
    height: 45vh;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 3vh;


    .top-mark-content-border {
      width: 80%;
      height: 100%;
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .top-img-item-line {
        height: 10vh;
        width: 100%;
        // border: 1px solid blue;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1vh;

        .top-img-item {
          height: 100%;
          width: 12%;
          border: 1px solid #D9D9D9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            width: 60%;
            height: 60%;
          }
        }

        .top-img-item-large {
          height: 100%;
          width: 24.5%;
          border: 1px solid #D9D9D9;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            width: 60%;
            height: 60%;
          }
        }
      }

    }


  }
}
</style>
