<!--
 * @Author: Sid Li
 * @Date: 2026-02-27 14:46:29
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-12 16:35:06
 * @FilePath: \nuxt-free-new\app\components\MainProduct.vue
 * @Description: 
-->
<template>
  <div class="product-container">
    <div class="product-item-border">
      <div @click="handleClick(item)" class="product-item" v-for="item in productArr" :key="item.id">
        <div class="product-info">
          <div class="product-type">{{ item.type }}</div>
          <div class="product-name">{{ item.name }}</div>
          <div class="product-more">了解更多</div>
        </div>
        <div class="product-img">
          <img :src="item.img" alt="">
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const productArr = ref([]);


const props = defineProps({
  productData: {
    type: Array,
    default: () => [],
  },
});


watch(
  () => props.productData,
  (newVal) => {
    if (!newVal.length) return;
    productArr.value = newVal;
  },
  { immediate: true, deep: true }
);

const handleClick = (item) => {
  console.log(item);
  router.push(`/product/${item.id}`);
};







onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.product-container {
  margin-top: 2vh;
  width: 100%;
  height: 100%;
  // border: 2px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;


  .product-item-border {
    width: 80%;
    height: 100%;
    // border: 2px solid yellow;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1vh;

    .product-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      // border: 2px solid red;
      box-sizing: border-box;
      background-color: #F6F6F8;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
      }

      .product-info {
        width: 100%;
        height: 20%;
        // border: 2px solid green;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 10vh;

        .product-type {

          font-weight: bold;
          font-size: 16px;
          font-family: "SourceHanSansCN-Bold";
        }

        .product-name {

          font-weight: bold;
          font-size: 16px;
          font-family: "SourceHanSansCN-Bold";
        }

        .product-more {

          font-size: 14px;
          width: 80px;
          text-align: center;
          border-radius: 12px;
          background-color: #16418A;
          color: #fff;
          margin-top: 1vh;
          font-family: "SourceHanSansCN-Regular";
        }
      }

      .product-img {
        width: 50%;
        height: 30vh;
        // background-color: pink;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;

        }
      }
    }
  }


}
</style>
