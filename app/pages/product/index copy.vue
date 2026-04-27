<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-18 14:54:54
 * @FilePath: \nuxt-free-new\app\pages\product\index.vue
 * @Description: 增加 Tab 横向拖拽滚动功能 + 列表分页功能
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="product-container">
      <div class="product-bg"><span>通用机器人</span></div>

      <div class="product-list-container">

        <!--  Tab   -->
        <DragTab :tabList="tabList" :activeIndex="tabActiveIndex" @tabChange="tabClick" />

        <!--  内容区域  -->
        <div class="tab-content-area">
          <transition name="fade" mode="out-in">
            <!-- key 绑定当前页码， 有过渡效果  -->
            <div :key="`${tabActiveIndex}-${currentPage}`" class="content-item-container">

              <!-- 遍历当前页的数据 currentPageData  -->
              <div @click="handleClick(item)" v-for="(item, index) in currentPageData" :key="item.id"
                class="product-item">
                <div class="product-item-info">
                  <div class="product-item-type">{{ item.robotType }}</div>
                  <div class="product-item-name">{{ item.productName }}</div>
                  <div class="more">了解更多</div>
                </div>
                <div class="product-item-img">
                  <img :src="item.mainImageUrl" alt="">
                </div>
              </div>

              <!-- 空状态提示 -->
              <div v-if="currentPageData.length === 0" class="empty-state">
                暂无相关产品
              </div>
            </div>
          </transition>

          <!--   分页控件 总页数 > 1   -->
          <Pagination v-if="total > 1" class="pagination-wrapper" :totalPages="totalPages" :currentPage="currentPage"
            @changePage="changePage" />
        </div>
      </div>
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive, onBeforeUnmount, computed } from "vue";
import Navbar from "@/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue";

import { productCategoryTree, productList } from "@/server/common";
import DragTab from "@/components/normal/DragTab.vue";

import { useRouter } from "vue-router";
const router = useRouter();


const tabActiveIndex = ref(0);

const tabList = ref([
  // { id: 1, name: "SCARA系列", type: 1 },
  // { id: 2, name: "MINI系列", type: 2 },
  // { id: 3, name: "中小负载系列", type: 3 },
  // { id: 4, name: "大负载系列", type: 4 },
  // { id: 5, name: "超大负载系列", type: 5 },
]);

const tabListFid = ref(-1)


//  分页与数据相关变量 
const currentPage = ref(1);             // 当前页码
const pageSize = ref(12);
const total = ref(0);
const tabSelectedId = ref(-1);              // 每页 12 条



// 获取当前页展示的数据
const currentPageData = ref([]);

// 获取当前类型的总页数
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});


const tabClick = (index, item) => {
  tabActiveIndex.value = index;
  tabSelectedId.value = item.id;
  getProductList();

  //  切换 Tab 时，重置页码为 1，并重新处理数据
  currentPage.value = 1;
  // makeProductList(item.type);


};



//  分页切换函数  
const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;
  getProductList();
  nextTick(() => {
    setTimeout(() => {
      const contentArea = document.querySelector('.product-list-container');
      if (contentArea) {
        // 使用 scrollIntoView 滚动到该区域顶部
        contentArea.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500);
  });
};

const handleClick = (item) => {
  console.log(item);
  router.push(`/product/${item.productType}/${item.id}`);
};

const getTabList = async () => {
  const res = await productCategoryTree();

  const robotTabs = res.data.filter(item => item.category_type === 'robot');
  console.log(robotTabs);

  tabList.value = robotTabs[0].children;
  tabListFid.value = robotTabs[0].id;
  tabSelectedId.value = robotTabs[0].children[0].id;

  getProductList();
};

const getProductList = async () => {
  const params = {
    page: currentPage.value,
    page_size: pageSize.value,
    keyword: undefined,
    model_number: undefined,
    category_id: tabSelectedId.value,
    parent_category_id: tabListFid.value
  };
  const res = await productList(params);
  total.value = res.total;
  currentPageData.value = res.data;
};


onMounted(async () => {

  await getTabList();

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
      box-sizing: border-box;


      span {
        // border: 1px solid red;
        font-size: 40px;
        color: #fff;
        font-weight: bold;
        font-family: "SourceHanSansCN-Bold";
        margin-left: 350px;
      }
    }

    .product-list-container {
      margin-top: 2vh;
      // border: 4px solid red;
      width: 60%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .tab-content-area {
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        // border: 2px solid yellow;
        min-height: 60vh;
        margin-top: 2vh;

        .content-item-container {
          animation: fadeIn 0.3s ease;
          height: 100%;
          width: 100%;

          display: grid;

          //  定义列：3 列，每列自动平分 (1fr)
          grid-template-columns: repeat(3, 1fr);


          gap: 1.3vh;

          align-items: center;
          justify-content: center;
          box-sizing: border-box;

          // 平板：2 列
          @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
          }

          // 手机：1 列
          @media (max-width: 768px) {
            grid-template-columns: 1fr;

            .product-item {
              height: 40vh;
            }
          }

          .empty-state {
            grid-column: 1 / -1;
            width: 100%;
            text-align: center;
            padding: 50px 0;
            color: #999;
          }

          .product-item {
            // border: 2px solid green;
            width: 100%;
            height: 30vh;

            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            background-color: #F6F6F8;
            cursor: pointer;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .product-item-info {
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              align-items: center;

              .product-item-name {
                text-align: center;
                // border: 1px solid red;
                font-size: 16px;
                margin-bottom: 1vh;
                font-family: "SourceHanSansCN-Bold";
              }

              .product-item-type {
                text-align: center;
                // border: 1px solid red;
                font-size: 16px;
                font-family: "SourceHanSansCN-Bold";
              }

              .more {
                width: 80px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                background-color: #16418A;
                color: #fff;
                border-radius: 20px;
                margin-bottom: 1vh;
                font-size: 12px;
                font-family: "SourceHanSansCN-Regular";
              }
            }

            .product-item-img {
              width: 200px;
              height: 18vh;
              // border: 1px solid red;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain
              }
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>