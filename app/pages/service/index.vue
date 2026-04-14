<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 09:12:28
 * @FilePath: \nuxt-free-new\app\pages\service\index.vue
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
    <div class="service-container">
      <div class="service-text rich-text-content" v-html="serviceText"></div>
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
import { serviceContent } from "@/server/common";




const serviceText = ref("");

const getServiceContent = async () => {

  const res = await serviceContent();
  if (res.code === 200) {
    serviceText.value = res.data.content;
  }

};



onMounted(() => {

  getServiceContent();
  // serviceText.value = '<p style="text-align: center;"><span style="font-size: 24px;">埃斯顿机器人官方联保方案</span></p><p style="text-align: center;"><img src="https://s41.ax1x.com/2026/03/13/peARwex.png" alt="" data-href="" style="width: 402.00px;height: 61.23px;"> </p><p><span style="font-size: 16px;">阜瑞智能与埃斯顿机器人达成深度合作，成为埃斯顿机器人全国首家联保点，为华北地区客户提供“安心+高效”双保险服务，包括:</span></p><p><span style="color: rgb(47, 46, 63); font-size: 16px;">✅ ​​</span><span style="font-size: 16px;">快速响应--及时解决设备问题</span></p><p><span style="color: rgb(47, 46, 63); font-size: 16px;">✅</span><span style="font-size: 16px;">强大技术支持--专业团队全程护航</span></p><p><span style="color: rgb(47, 46, 63); font-size: 16px;">✅</span><span style="font-size: 16px;">全周期维保--涵盖巡检、保养、维修!</span></p><p><br></p><p><span style="font-size: 16px;">在设备维护检修方面，不仅提供机器人设备的日常巡检、保养及故障诊断维修，严技照标准化流程执行维护作业，及时处理设备运行中的突发问题，保</span></p><p><span style="font-size: 16px;">障机器人稳定运行。在技术支持响应方面，可依据客户需求和设备运行状况，提供及时有效的现场技术支持服务快速定位并解决机器人设备在运行过程中出现的机械、电气及程序等方面问题。</span></p><p style="text-align: center;"><img src="https://s41.ax1x.com/2026/03/13/peAR0w6.png" alt="" data-href="" style="width: 671.00px;height: 447.33px;"></p><p><br></p>'


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
  // background-color: #F2F1F1;
  // border:1px solid red;

  .service-title-bg {

    // border: 1px solid red;
    width: 100%;
    height: 30vh;
    background: url("/images/service/serviceBg.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 40px;
      font-family: "SourceHanSansCN-Bold";
      color: #16418a;
    }
  }

  .service-container {
    width: 100%;
    height: auto;
    min-height: 70vh;
    // border: 1px solid red;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .service-text {
      // border: 2px solid red;
      padding: 0 20vh;
    }

  }



  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
