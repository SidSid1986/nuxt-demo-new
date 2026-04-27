<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-24 16:36:00
 * @FilePath: \nuxt-free-new\app\pages\sportProduct\index.vue
 * @Description: 运动控制器页面  
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="sport-product-container">
      <div class="sport-product-bg"><span>运动控制器</span></div>

      <div class="sport-product-list-container">

        <!-- 简介区域 -->
        <div class="product-intro">
          TRIO 运动控制器支持多达 128 轴带数字 I/O 的伺服或步进及扩展模块，如单个主站控制的 HMI。控制器可与独立程序搭配使用，或从外部计算机发送指令。
        </div>

        <!-- 顶部 Tab：运动控制器下的子分类 -->
        <DragTab :tabList="parentTabList" :activeIndex="tabActiveIndex" @tabChange="tabClick" />

        <!-- 内容区域：显示当前分类下的【所有系列】 -->
        <div class="tab-content-area">
          <div class="content-item-container">
            <div v-for="item in currentSeriesList" :key="item.id" class="product-item" @click="goToSeriesDetail(item)">
              <div class="product-item-info">
                <div class="product-item-name">{{ item.label }}</div>
                <div class="product-item-img"><img :src="item.img" alt="" /></div>
                <div class="more">查看系列</div>
              </div>
            </div>

            <div v-if="currentSeriesList.length === 0" class="empty-state">
              暂无系列
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>

    <!-- 聊天服务 -->
    <div class="chat-service">
      <ChatService />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import DragTab from "@/components/normal/DragTab.vue";
import { productCategoryTree } from "@/server/common";
import ChatService from "@/components/ChatService.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 顶部 Tab：运动控制器下的子分类
const parentTabList = ref([]);
const tabActiveIndex = ref(0);

// 所有运动控制器数据
const sportRoot = ref(null);

// 当前选中的分类下的【系列】
const currentSeriesList = ref([]);

// 切换 Tab
const tabClick = (index, item) => {
  tabActiveIndex.value = index;
  currentSeriesList.value = item.children || [];
};

// 跳转到系列详情页
const goToSeriesDetail = (item) => {
  router.push(`/productDetail/${item.id}`);
};

// 获取分类树，只取运动控制器（sport）部分
const getTree = async () => {
  const res = await productCategoryTree();
  const sport = res.data.find((x) => x.category_type === "sport");
  sportRoot.value = sport;
  console.log(sport);
  parentTabList.value = sport.children;
  currentSeriesList.value = sport.children[0]?.children || [];
};

onMounted(async () => {
  await getTree();
});
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;

  .sport-product-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .sport-product-bg {
      width: 100%;
      height: 35vh;
      background: url("/images/sportProduct/sportBg.png") no-repeat center center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        font-size: 40px;
        color: #fff;
        font-weight: bold;
        font-family: "SourceHanSansCN-Bold";
      }
    }


    .sport-product-list-container {
      margin: 2vh 0;
      width: 60%;

      .product-intro {
        width: 100%;
        font-size: 16px;
        color: #666;
        margin-bottom: 3vh;
        line-height: 1.6;
        font-family: "SourceHanSansCN-Regular";
      }

      .tab-content-area {
        width: 100%;
        margin-top: 2vh;

        .content-item-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          justify-content: start;

          .product-item {
            height: 25vh;
            background: #f6f6f8;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            cursor: pointer;

            &:hover {
              background: #eef1ff;
            }

            .product-item-name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              text-align: center;
            }

            .product-item-img {
              img {
                width: 100px;
                height: 100px;
                margin-bottom: 10px;
              }
            }

            .product-item-info {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            .more {
              width: 100px;
              height: 30px;
              line-height: 30px;
              background: #16418a;
              color: #fff;
              border-radius: 15px;
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .nav-container,
  .footer-two {
    width: 100%;
  }
}
</style>