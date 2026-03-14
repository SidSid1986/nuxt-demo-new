<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-14 09:10:10
 * @FilePath: \nuxt-free-new\app\pages\solution\solutionDetail.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="solution-title-bg">
      <span>解决方案</span>
    </div>

    <div class="detail-bread">
      <div><span class="breadcrumb-item" @click="toIndex">首页></span><span class="breadcrumb-item"
          @click="toSolution">解决方案></span>{{ breadcrumb.name }}</div>
    </div>

    <div class="detail-text-container">
      <div class="detail-text-title">{{ detailData.name }}</div>
      <div class="detail-text-content" v-html="detailData.content"> </div>
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

const detailData = ref({
  name: "汽车涂胶工艺解决方案",
  content: '<p><span style="font-size: 19px;"><strong> 方案概述</strong></span></p><p><br></p><p><span style="font-size: 14px;">汽车涂胶工艺智能化解决方案基于工业机器人集成专用涂胶系统，通过涂胶软件包简化集成功能配置及操作，实现对胶型、胶宽、胶高、胶量的精确控制。方案可适配市场主流的涂胶设备（SCA，INTEC等），</span></p><p><span style="font-size: 14px;">并拥有成熟的案例应用。涂胶工艺作为汽车制造中的关键环节，主要用于密封、防锈、隔音等目的，对精度和稳定性要求极高。</span></p><p><br></p><p><span style="font-size: 19px;"><strong>案例特点</strong></span></p><p><br></p><p><span style="color: rgb(66, 144, 247); font-size: 16px;"><strong>1.易用性提升</strong></span></p><p><span style="font-size: 15px;">采用虚拟仿真和离线编程技术，搭配专用涂胶软件包，显著提高了易用性和操作便捷性。</span></p><p><br></p><p><span style="color: rgb(66, 144, 247); font-size: 16px;"><strong>2.高性能表现</strong></span></p><p><span style="font-size: 15px;">机器人节拍满足各大主机厂要求，机器人到位稳定时间短，轨迹精度高。</span></p><p><br></p><p><span style="color: rgb(66, 144, 247); font-size: 16px;"><strong>3.运行稳定性</strong></span></p><p><span style="font-size: 15px;">24小时连续稳定运行无故障，满足汽车生产线高强度连续作业需求，具备MTBF12万小时认证</span></p><p><br></p><p><span style="color: rgb(66, 144, 247); font-size: 16px;"><strong>4.安全性能</strong></span></p><p><span style="font-size: 15px;">支持选配PROFISAFE安全总线、安全协议、集成安全位置、速度、区域监控功能等，提供全方位安全保护。</span></p><p><br></p><p><span style="color: rgb(66, 144, 247); font-size: 16px;"><strong>5.功能完备性</strong></span></p><p><span style="font-size: 15px;">具备断电恢复、示教器热插拔、多机协同等实用功能，满足现代化智能制造需求。</span></p>',
});

const breadcrumb = ref([
  {
    id: 1,
    name: "汽车行业",
    icon1: "/images/solution/car1.png",
    icon2: "/images/solution/car2.png",
  },
  {
    id: 2,
    name: "电子行业",
    icon1: "/images/solution/ele1.png",
    icon2: "/images/solution/ele2.png",
  },
  {
    id: 3,
    name: "锂电行业",
    icon1: "/images/solution/battery1.png",
    icon2: "/images/solution/battery2.png",
  },
  {
    id: 4,
    name: "光伏行业",
    icon1: "/images/solution/sun1.png",
    icon2: "/images/solution/sun2.png",
  },
  {
    id: 5,
    name: "金属加工",
    icon1: "/images/solution/metal1.png",
    icon2: "/images/solution/metal2.png",
  },
  {
    id: 6,
    name: "建材加工",
    icon1: "/images/solution/build1.png",
    icon2: "/images/solution/build2.png",
  },
  {
    id: 7,
    name: "包装物流",
    icon1: "/images/solution/box1.png",
    icon2: "/images/solution/box2.png",
  },
  {
    id: 8,
    name: "一般工业",
    icon1: "/images/solution/nor1.png",
    icon2: "/images/solution/nor2.png",
  },
  {
    id: 9,
    name: "钢铁行业",
    icon1: "/images/solution/st1.png",
    icon2: "/images/solution/st2.png",
  },
  {
    id: 10,
    name: "家电行业",
    icon1: "/images/solution/app1.png",
    icon2: "/images/solution/app2.png",
  },
  {
    id: 11,
    name: "食品烟酒",
    icon1: "/images/solution/smoke1.png",
    icon2: "/images/solution/smoke2.png",
  },
]);

// 点击首页跳转
const toIndex = () => {
  router.push({
    path: "/solution",
  });
};

// 点击解决方案跳转
const toSolution = () => {
  router.push({
    path: "/solution",
  });
};



const detailId = ref("");

onMounted(() => {
  const query = router.currentRoute.value.query;
  console.log(query);
  breadcrumb.value.forEach((item) => {
    if (item.id == query.id) {
      breadcrumb.value = item;
    }
  });
  console.log(query.fid);
  detailId.value = query.fid;
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

  .solution-title-bg {
    // border: 1px solid red;
    width: 100%;
    height: 30vh;
    background: url("/images/solution/solutionBg.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      font-size: 40px;
      color: #16418a;
      font-family: "SourceHanSansCN-Bold";
      margin-left: 20%;
    }
  }

  .detail-bread {
    width: 80%;
    height: 5vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    padding: 20px;

    // border: 1px solid red;
    .breadcrumb-item {
      cursor: pointer;
    }


  }

  .detail-text-container {
    width: 70%;
    height: auto;

    min-height: 50vh;
    margin-bottom: 10vh;


    .detail-text-title {
      font-size: 30px;
      color: #16418a;
      font-family: "SourceHanSansCN-Bold";
      margin-bottom: 20px;
      text-align: center;
    }

    .detail-text-content {
      font-size: 20px;
      color: #000;
      font-family: "SourceHanSansCN-Regular";
      line-height: 40px;
      border: 1px solid #F6F6F8;
      padding: 20px;
    }
  }

  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
