<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-07 09:02:33
 * @FilePath: \nuxt-free-new\app\pages\download\index.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div @click="handleClick" class="product-container">
      资料下载
    </div>



    <div class="footer-two">
     
        <FooterTwo />
     
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";


const router = useRouter();

const handleClick = () => {
  router.push("/download/1");
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



  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
