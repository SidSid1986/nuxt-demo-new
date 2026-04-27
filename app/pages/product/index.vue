<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="product-container">
      <div class="product-bg">
        <span>机器人</span>
      </div>

      <div class="product-list-container">
        <!-- 顶部 Tab：通用机器人 / 专用机器人 / 协作机器人 -->
        <DragTab :tabList="parentTabList" :activeIndex="tabActiveIndex" @tabChange="tabClick" />

        <!-- 内容区域：显示当前父分类下的【所有系列】 -->
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
import Navbar from "@/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import DragTab from "@/components/normal/DragTab.vue";
import { productCategoryTree } from "@/server/common";
import ChatService from "@/components/ChatService.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 顶部 Tab：二级分类（通用、专用、协作）
const parentTabList = ref([]);
const tabActiveIndex = ref(0);

// 所有机器人数据
const robotRoot = ref(null);

// 当前选中的二级分类下的【三级分类 = 系列】
const currentSeriesList = ref([]);

// 切换 Tab
const tabClick = (index, item) => {
  tabActiveIndex.value = index;
  // 显示该二级分类下的所有系列
  currentSeriesList.value = item.children || [];
};

// 跳转到系列详情页
const goToSeriesDetail = (item) => {
  router.push(`/productDetail/${item.id}`);
};

// 获取分类树，只取机器人部分
const getTree = async () => {
  const res = await productCategoryTree();
  const robot = res.data.find((x) => x.category_type === "robot");
  robotRoot.value = robot;
  console.log(robot);
  parentTabList.value = robot.children;
  currentSeriesList.value = robot.children[0]?.children || [];
};

onMounted(async () => {
  await getTree();
});
</script>

<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100%;

  .product-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .product-bg {
      width: 100%;
      height: 35vh;
      background: url("/images/product/productBg.png") no-repeat center center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding-left: 350px;
      box-sizing: border-box;

      span {
        font-size: 40px;
        color: #fff;
        font-weight: bold;
      }
    }

    .product-list-container {
      margin: 2vh 0;
      width: 60%;
    }

    .tab-content-area {
      width: 100%;
      margin-top: 20px;
    }

    .content-item-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;

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

  .nav-container,
  .footer-two {
    width: 100%;
  }
}
</style>