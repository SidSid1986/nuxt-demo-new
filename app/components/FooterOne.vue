<!--
 * @Author: Sid Li
 * @Date: 2026-03-03 14:37:26
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-04 16:28:09
 * @FilePath: \nuxt-free-new\app\components\FooterOne.vue
 * @Description: 
-->
<template>
  <div class="footer-one-container">

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log("FooterOne组件挂载了");
});
</script>

<style scoped lang="scss">
.footer-one-container {

  // border: 2px solid red;
  box-sizing: border-box;
  height: 40vh;
  background: url("/images/f1.png") no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;


}
</style>
