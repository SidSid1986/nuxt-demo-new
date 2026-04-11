<!--
 * @Author: Sid Li
 * @Date: 2026-03-03 14:37:26
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-11 13:35:16
 * @FilePath: \nuxt-free-new\app\components\FooterOne.vue
 * @Description: 
-->
<template>
  <div class="footer-one-container">

    <div class="footer-one-content-item">
      <img :src="footerOneData.img_url" alt="">
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  footerOneData: {
    type: Object,
    default: () => { },
  },
});



onMounted(() => {
  console.log("FooterOne组件挂载了");
});
</script>

<style scoped lang="scss">
.footer-one-container {

  // border: 2px solid red;
  box-sizing: border-box;
  height: 50vh;
  // background: url("/images/f1.png") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  .footer-one-content-item {
    // border:1px solid red;
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }


}
</style>
