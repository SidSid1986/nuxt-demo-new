<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-07 09:07:11
 * @FilePath: \nuxt-free-new\app\pages\service\[id].vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="service-title-bg">
      <span>服务支持</span>
    </div>

    <div class="footer-two">
    
        <FooterTwo />
     
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";


const router = useRouter();


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

  .service-title-bg {
    border: 1px solid red;
    height: 20vh;
    width: 100%;
  }

  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
