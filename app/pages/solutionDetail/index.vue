<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-09 15:08:35
 * @FilePath: \nuxt-free-new\app\pages\solutionDetail\index.vue
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
          @click="toSolution">解决方案></span>{{ detailData.industry_name }}</div>
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
import { solutionDetail } from "@/server/common";

const router = useRouter();
const detailId = ref("");
const detailData = ref({
  
});

const breadcrumb = ref([
  // {
  //   id: 1,
  //   name: "汽车行业",
  //   icon1: "/images/solution/car1.png",
  //   icon2: "/images/solution/car2.png",
  // },
  // {
  //   id: 2,
  //   name: "电子行业",
  //   icon1: "/images/solution/ele1.png",
  //   icon2: "/images/solution/ele2.png",
  // },
  // {
  //   id: 3,
  //   name: "锂电行业",
  //   icon1: "/images/solution/battery1.png",
  //   icon2: "/images/solution/battery2.png",
  // },
  // {
  //   id: 4,
  //   name: "光伏行业",
  //   icon1: "/images/solution/sun1.png",
  //   icon2: "/images/solution/sun2.png",
  // },
  // {
  //   id: 5,
  //   name: "金属加工",
  //   icon1: "/images/solution/metal1.png",
  //   icon2: "/images/solution/metal2.png",
  // },
  // {
  //   id: 6,
  //   name: "建材加工",
  //   icon1: "/images/solution/build1.png",
  //   icon2: "/images/solution/build2.png",
  // },
  // {
  //   id: 7,
  //   name: "包装物流",
  //   icon1: "/images/solution/box1.png",
  //   icon2: "/images/solution/box2.png",
  // },
  // {
  //   id: 8,
  //   name: "一般工业",
  //   icon1: "/images/solution/nor1.png",
  //   icon2: "/images/solution/nor2.png",
  // },
  // {
  //   id: 9,
  //   name: "钢铁行业",
  //   icon1: "/images/solution/st1.png",
  //   icon2: "/images/solution/st2.png",
  // },
  // {
  //   id: 10,
  //   name: "家电行业",
  //   icon1: "/images/solution/app1.png",
  //   icon2: "/images/solution/app2.png",
  // },
  // {
  //   id: 11,
  //   name: "食品烟酒",
  //   icon1: "/images/solution/smoke1.png",
  //   icon2: "/images/solution/smoke2.png",
  // },
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





onMounted(() => {
  const query = router.currentRoute.value.query;

  detailId.value = query.id;

  solutionDetail(detailId.value).then((res) => {
    detailData.value = res.data;
  });
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
