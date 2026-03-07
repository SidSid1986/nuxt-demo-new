<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-07 15:01:32
 * @FilePath: \nuxt-free-new\app\pages\product\index.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div @click="handleClick" class="product-container">
      产品页面
      <Step />
    </div>



    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";

import Step from "/components/normal/Step.vue"


const router = useRouter();

const handleClick = () => {
  // router.push("/product/1");
};



onMounted(() => {

});


</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #F2F1F1;

  .product-container {
    width:80%;
    height:80vh;
    border:2px solid red;
  }



  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
