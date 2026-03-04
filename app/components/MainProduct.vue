<!--
 * @Author: Sid Li
 * @Date: 2026-02-27 14:46:29
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-04 15:41:26
 * @FilePath: \nuxt-free-new\app\components\MainProduct.vue
 * @Description: 
-->
<template>
  <div class="product-container">
    <div class="product-item-border">
      <div class="product-item" v-for="item in productArr" :key="item.id">
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







onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.product-container {
  width: 100%;
  height: 100%;
  border: 2px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;


  .product-item-border {
    width: 80%;
    height: 100%;
    border: 2px solid yellow;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .product-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 33%;
      height: 49%;
      border: 2px solid red;
      box-sizing: border-box;
      background-color: #F6F6F8;
      cursor: pointer;

      .product-info {
        width: 100%;
        height: 20%;
        border: 2px solid green;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 10vh;

        .product-type {
         
          font-weight: bold;
          font-size: 16px;
        }

        .product-name {
        
          font-weight: bold;
          font-size: 16px;
        }

        .product-more {
          
          font-size: 14px;
          width: 80px;
          text-align: center;
          border-radius: 12px;
          background-color: #16418A;
          color: #fff;
          margin-top: 1vh;
        }
      }

      .product-img {
        width: 50%;
        height: 30vh;
        background-color: pink;
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
