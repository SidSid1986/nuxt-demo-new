<!--
 * @Author: Sid Li
 * @Date: 2026-03-03 14:37:26
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 13:53:36
 * @FilePath: \nuxt-free-new\app\pages\news\[id].vue
 * @Description: 
-->
<template>
  <div class="news-detail-container">
    <div class="nav-container">
      <Navbar />
    </div>
    <div class="news-detail-content">
      <div class="detail-content-bg"></div>
      <div class="detail-content-text">
        <div class="detail-content-text-back"><span @click="goBack">返回列表</span></div>
        <div class="detail-content-text-title">{{ demoContent.title }}</div>
        <div class="detail-line"><span></span></div>
        <div class="detail-content-text-date"><span>发布时间:{{ demoContent.
          publish_date }}</span></div>

        <div class="detail-content-text-content" v-html="demoContent.content"></div>


      </div>
    </div>
    <div class="footer-two">

      <FooterTwo />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import { useRouter } from 'vue-router';
import { newsDetail } from '@/server/common';
const router = useRouter();


const demoContent = ref({
  // id: 1,
  // title: "阜瑞快讯 | 埃斯顿授权阜瑞智能为华北区域指定联保网点",
  // date: "2026-03-06",
  // content: '<p><span style="font-size: 16px;">埃斯顿自动化正式授权烟台阜瑞智能装备有限公司作为全国首家官方联保服务网点！此次合作标志着双方在智能制造领域的深度协同，旨在为华北区域客户提供更高效、更专业的本地化技术支持与售后服务保障。强强联合，共启新篇。埃斯顿作为中国自动化领域的领军企业，在工业机器人、伺服系统及智能制造领域拥有深厚积累。</span></p><p style="text-align: center;"><img src="https://fs-mix.oss-cn-beijing.aliyuncs.com/1/material/c4aa996b-a9ca-4ef6-b26f-907b00d0578c.png" alt="2.png" data-href="" style="width: 30%;"></p><p><br></p><p><span style="font-size: 16px;">埃斯顿自动化正式授权烟台阜瑞只能装备有限公司作为全国首家官方联保服务网点！此次合作标志着双方在智能制造领域的深度协同，旨在为华北区域客户提供更高效、更专业的本地化技术支持与售后服务保障。强强联合，共启新篇。埃斯顿作为中国自动化领域的领军企业，在工业机器人、伺服系统及智能制造领域拥有深厚积累。烟台阜瑞智能作为高新技术企业，深耕智能装备研发与行业解决方案，具备丰富的产业实践经验。而此次合作在设备维护检修方面，不仅提供机器人设备的日常巡检、保养及故障诊断维修，严格按照标准化流程执行维护作业，及时处理设备运行中的突发问题，保障机器人稳定运行。在技术支持响应方面，可依据客户需求和设备运行状况，提供及时有效的现场技术支持服务快速定位并解决机器人设备在运行过程中出现的机械、电器及程序等方面问题。双方将携手为客户提供更智能、更高效的自动化解决方案，共同推动行业高质量发展。</span></p><p><br></p>'

})
const goBack = () => {
  router.push('/news');
};

const getNewsDetail = async (id) => {
  const res = await newsDetail(id);
  if (res.code === 200) {
    demoContent.value = res.data;
  }
}




onMounted(() => {
  getNewsDetail(router.currentRoute.value.params.id);
});


</script>

<style lang="scss" scoped>
.news-detail-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #F2F1F1;

  .news-detail-content {
    min-height: 90vh;
    width: 100%;
    // border: 4px solid red;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5vh;


    .detail-content-bg {
      height: 40%;
      width: 100%;
      // border: 3px solid blue;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      background: url("/images/news/news-detail.png") no-repeat;
      background-size: 100% 100%;


    }

    .detail-content-text {
      margin: 5vh 0 0 0;
      height: auto;
      width: 75%;
      // border: 1px solid green;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #FFFFFF;
      z-index: 999;
      padding: 40px 40px;
      box-sizing: border-box;

      .detail-content-text-back {
        height: 30px;
        width: 100%;
        // border: 1px solid pink;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        color: #3C4045;
        font-family: "SourceHanSansCN-Bold";


        span {
          font-size: 14px;
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .detail-content-text-title {
        min-height: 50px;
        width: 100%;
        // border: 1px solid pink;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 24px;
        color: #3C4045;
        font-weight: bold;
        margin: 20px 0 0px 0px;
        padding: 0 40px;
        // border: 2px solid #0B44B4;
      }

      .detail-line {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 40px;
        box-sizing: border-box;
        // border:1px solid red;

        span {
          height: 4px;
          width: 60px;
          background-color: #0B44B4;
          margin-bottom: 20px;
        }

      }

      .detail-content-text-date {
        height: 30px;
        width: 100%;
        // border: 1px solid pink;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        color: #666565;
        margin-bottom: 5vh;
        padding: 0 80px;
        font-family: "SourceHanSansCN-Regular";
        box-sizing: border-box;
      }

      .detail-content-text-content {
        padding: 0 40px;
        box-sizing: border-box;
        // border: 1px solid red;

      }
    }
  }



  .nav-container,

  .footer-two {
    width: 100%;
  }
}
</style>
