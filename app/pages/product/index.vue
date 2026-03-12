<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-12 16:38:53
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
        <div class="product-tab-container scrollable" ref="tabContainerRef" @mousedown="handleDragStart"
          @mousemove="handleDragMove" @mouseup="handleDragEnd" @mouseleave="handleDragEnd" @touchstart="handleDragStart"
          @touchmove="handleDragMove" @touchend="handleDragEnd">

          <div v-for="(item, index) in tabList" :key="item.id" ref="tabItemRefs" class="product-tab"
            :class="{ 'active': tabActiveIndex === index }" @click="tabClick(index, item)">
            {{ item.name }}
          </div>

          <div class="tab-indicator" :style="indicatorStyle"></div>
        </div>

        <!--  内容区域  -->
        <div class="tab-content-area">
          <transition name="fade" mode="out-in">
            <!-- key 绑定当前页码， 有过渡效果  -->
            <div :key="`${tabActiveIndex}-${currentPage}`" class="content-item-container">

              <!-- 遍历当前页的数据 currentPageData  -->
              <div @click="handleClick(item)" v-for="(item, index) in currentPageData" :key="item.id"
                class="product-item">
                <div class="product-item-info">
                  <div class="product-item-type">{{ item.typeName }}</div>
                  <div class="product-item-name">{{ item.name }}</div>
                  <div class="more">了解更多</div>
                </div>
                <div class="product-item-img">
                  <img :src="item.img" alt="">
                </div>
              </div>

              <!-- 空状态提示 -->
              <div v-if="currentPageData.length === 0" class="empty-state">
                暂无相关产品
              </div>
            </div>
          </transition>

          <!--   分页控件 总页数 > 1   -->

          <Pagination :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />
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
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue";
import { useRouter } from "vue-router";
const router = useRouter();


const tabActiveIndex = ref(0);
const tabContainerRef = ref(null);
const tabItemRefs = ref([]);

const indicatorStyle = reactive({
  width: '0px',
  left: '0px',
  opacity: 0
});

const tabList = [
  { id: 1, name: "SCARA系列", type: 1 },
  { id: 2, name: "MINI系列", type: 2 },
  { id: 3, name: "中小负载系列", type: 3 },
  { id: 4, name: "大负载系列", type: 4 },
  { id: 5, name: "超大负载系列", type: 5 },
];

//  拖拽相关变量 
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

//  分页与数据相关变量 
const productContentListMock = ref([]); // 原始所有数据
const groupedProductData = ref([]);     //  处理后的二维数组：[ [第1页12条], [第2页4条]  ]
const currentPage = ref(1);             // 当前页码
const pageSize = 12;                    // 每页 12 条



// 获取当前页展示的数据
const currentPageData = computed(() => {
  return groupedProductData.value[currentPage.value - 1] || [];
});

// 获取当前类型的总页数
const totalPages = computed(() => {
  return groupedProductData.value.length;
});

//  与拖拽逻辑  
const handleDragStart = (e) => {
  if (!tabContainerRef.value) return;
  isDragging = true;
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  startX = clientX - tabContainerRef.value.offsetLeft;
  scrollLeft = tabContainerRef.value.scrollLeft;
  tabContainerRef.value.style.cursor = 'grabbing';
};

const handleDragMove = (e) => {
  if (!isDragging || !tabContainerRef.value) return;
  e.preventDefault();
  const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const x = clientX - tabContainerRef.value.offsetLeft;
  const walk = (x - startX) * 2;
  tabContainerRef.value.scrollLeft = scrollLeft - walk;
};

const handleDragEnd = () => {
  if (!tabContainerRef.value) return;
  isDragging = false;
  tabContainerRef.value.style.cursor = 'grab';
};

const updateIndicator = () => {
  nextTick(() => {
    const currentTab = tabItemRefs.value[tabActiveIndex.value];
    if (currentTab && tabContainerRef.value) {
      const { offsetWidth, offsetLeft } = currentTab;
      indicatorStyle.width = `${offsetWidth}px`;
      indicatorStyle.left = `${offsetLeft}px`;
      indicatorStyle.opacity = 1;
      scrollToActiveTab(currentTab);
    }
  });
};

const scrollToActiveTab = (tabElement) => {
  const container = tabContainerRef.value;
  if (!container) return;
  const containerWidth = container.offsetWidth;
  const tabLeft = tabElement.offsetLeft;
  const tabWidth = tabElement.offsetWidth;
  const currentScroll = container.scrollLeft;

  if (tabLeft < currentScroll) {
    container.scrollTo({ left: tabLeft, behavior: 'smooth' });
  } else if (tabLeft + tabWidth > currentScroll + containerWidth) {
    container.scrollTo({
      left: tabLeft + tabWidth - containerWidth,
      behavior: 'smooth'
    });
  }
};

const tabClick = (index, item) => {
  tabActiveIndex.value = index;

  //  切换 Tab 时，重置页码为 1，并重新处理数据
  currentPage.value = 1;
  makeProductList(item.type);

  updateIndicator();
};

//  据处理函数  
const makeProductList = (type) => {
  //  先过滤出当前类型的所有数据 
  const filteredList = productContentListMock.value.filter(item => item.type === type);

  //  二维数组 (每页 pageSize 条)
  const groups = [];
  for (let i = 0; i < filteredList.length; i += pageSize) {
    groups.push(filteredList.slice(i, i + pageSize));
  }


  groupedProductData.value = groups;
};

//  分页切换函数  
const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;
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
  router.push(`/product/${item.id}`);
};



onMounted(() => {
  // 初始化模拟数据
  productContentListMock.value = [
    { id: 1, type: 1, typeName: "SCARA 系列", name: "IER50-1200-SR", img: "/images/product/11.png" },
    { id: 2, type: 1, typeName: "SCARA 系列", name: "IER20-1000-SR-UNO", img: "/images/product/12.png" },
    { id: 3, type: 1, typeName: "SCARA 系列", name: "IER20-1000-SR-HI", img: "/images/product/13.png" },
    { id: 4, type: 1, typeName: "SCARA 系列", name: "IER20-1000-SR-HI", img: "/images/product/13.png" },
    { id: 5, type: 1, typeName: "SCARA 系列", name: "IER10-800-SR", img: "/images/product/15.png" },
    { id: 6, type: 1, typeName: "SCARA 系列", name: "IER10-700-SR ", img: "/images/product/16.png" },
    { id: 7, type: 1, typeName: "SCARA 系列", name: "IER10-500-SR ", img: "/images/product/16.png" },
    { id: 8, type: 1, typeName: "SCARA 系列", name: "IER6-700-SR ", img: "/images/product/16.png" },
    { id: 9, type: 1, typeName: "SCARA 系列", name: "IER6-600-SR", img: "/images/product/16.png" },
    { id: 10, type: 1, typeName: "SCARA 系列", name: "IER6-500-SR ", img: "/images/product/16.png" },
    { id: 11, type: 1, typeName: "SCARA 系列", name: "IER4-650-SR-U", img: "/images/product/17.png" },
    { id: 12, type: 1, typeName: "SCARA 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 13, type: 1, typeName: "SCARA 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 14, type: 1, typeName: "SCARA 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 15, type: 1, typeName: "SCARA 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 16, type: 1, typeName: "SCARA 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 17, type: 2, typeName: "MINI 系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 18, type: 3, typeName: "中小负载系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 19, type: 4, typeName: "大负载系列", name: "IER4-550-SR-U", img: "/images/product/17.png" },
    { id: 20, type: 5, typeName: "超大负载系列", name: "IER4-550-SR-U", img: "/images/product/17.png" }
  ];

  // 默认加载 SCARA 系列 (type 1)
  //   currentPage 默认为 1
  makeProductList(1);

  updateIndicator();

  if (tabContainerRef.value) {
    tabContainerRef.value.style.cursor = 'grab';
  }

  window.addEventListener('resize', updateIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator);
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

      span {
        font-size: 40px;
        color: #fff;
        font-weight: bold;
        font-family: "SourceHanSansCN-Bold";

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

      .product-tab-container {
        width: 100%;
        height: 5vh;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        position: relative;

        &.scrollable {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            display: none;
            height: 0;
            width: 0;
          }

          scrollbar-width: none;
          -ms-overflow-style: none;

          user-select: none;
          -webkit-user-select: none;
        }

        .product-tab {
          height: 5vh;
          line-height: 5vh;
          font-size: 20px;
          cursor: pointer;
          min-width: 80px;
          margin-right: 120px;
          box-sizing: border-box;
          font-weight: bold;
          color: #666;
          transition: color 0.3s ease;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          font-family: "SourceHanSansCN-Regular";



          &.active {
            color: #16418A;
          }

          &:last-child {
            margin-right: 0;
          }
        }

        .tab-indicator {
          position: absolute;
          bottom: 0;
          height: 3px;
          background-color: #16418A;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
          opacity: 0;

        }
      }

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