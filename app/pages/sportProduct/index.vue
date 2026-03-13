<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-13 13:39:15
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
        <!-- 内容区域 -->
        <div class="tab-content-area">
          <transition name="fade" mode="out-in">

            <div :key="currentPage" class="content-item-container">

              <!-- 遍历当前页的数据 (每组 9 个) -->
              <div v-for="(item, index) in currentPageData" :key="item.id" class="product-item"
                :class="getItemLayoutClass(item.itemType)">
                <!-- 布局内容根据 itemType 动态变化 -->

                <!-- 类型 1: 左右排列 (图片左，文字右) -->
                <template v-if="item.itemType === 1">
                  <div class="product-item-img left-img">
                    <img :src="item.icon" :alt="item.name">
                  </div>
                  <div class="product-item-info right-info">
                    <div class="product-item-type">{{ item.type }}</div>
                    <div class="product-item-name">{{ item.name }}</div>
                    <div class="more">了解更多</div>
                  </div>
                </template>

                <!-- 类型 2: 上下排列 (图片上，文字下 - 默认) -->
                <template v-else>
                  <div class="product-item-info bottom-info">
                    <div class="product-item-type">{{ item.type }}</div>
                    <div class="product-item-name">{{ item.name }}</div>
                    <div class="more">了解更多</div>
                  </div>
                  <div class="product-item-img top-img">
                    <img :src="item.icon" :alt="item.name">
                  </div>
                </template>

              </div>

              <!-- 空  -->
              <div v-if="currentPageData.length === 0" class="empty-state">
                暂无相关产品
              </div>
            </div>
          </transition>

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
import { ref, onMounted, nextTick, computed } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue";

//  数据与分页 
const sportImgData = ref([]);       // 原始所有数据
const groupedProductData = ref([]); // 处理后的二维数组：[ [第1页9条], [第2页...] ]
const currentPage = ref(1);         // 当前页码
const pageSize = 9;                 // 【修改】每页显示 9 个

//  数据
const currentPageData = computed(() => {
  return groupedProductData.value[currentPage.value - 1] || [];
});

//  总页数
const totalPages = computed(() => {
  return groupedProductData.value.length;
});

//  布局类名
const getItemLayoutClass = (type) => {
  return type === 1 ? 'layout-type-1' : 'layout-type-2';
};

//  数据处理函数 
const makeProductList = () => {
  const filteredList = sportImgData.value;

  // 分组 (每页 pageSize 条)
  const groups = [];
  for (let i = 0; i < filteredList.length; i += pageSize) {
    groups.push(filteredList.slice(i, i + pageSize));
  }

  groupedProductData.value = groups;
};

// 分页切换函数  
const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;

  // 翻页后平滑滚动到列表顶部
  nextTick(() => {
    setTimeout(() => {
      const contentArea = document.querySelector('.sport-product-list-container');
      if (contentArea) {
        contentArea.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  });
};

onMounted(() => {
  // 初始化数据
  sportImgData.value = [
    //  itemType: 1  左右布局 
    {
      id: 1,
      type: 'ETHERCAT',
      name: 'FLEX-6 NANO',
      icon: "/images/sportProduct/1.png",
      itemType: 1,
    },
    {
      id: 2,
      type: 'ETHERCAT',
      name: 'MC6N-ECAT',
      icon: "/images/sportProduct/2.png",
      itemType: 1,
    },
    {
      id: 3,
      type: 'ETHERCAT,PTEX',
      name: 'MC664',
      icon: "/images/sportProduct/3.png",
      itemType: 1,
    },
    {
      id: 4,
      type: 'PTEX',
      name: 'MC4N-RTEX',
      icon: "/images/sportProduct/4.png",
      itemType: 1,
    },
    //  itemType: 2  上下布局 
    {
      id: 5,
      type: '常规',
      name: 'MC508',
      icon: "/images/sportProduct/5.png",
      itemType: 2,
    },
    {
      id: 6,
      type: '常规',
      name: 'MC405',
      icon: "/images/sportProduct/6.png",
      itemType: 2,
    },
    {
      id: 7,
      type: '常规',
      name: 'MC404-Z',
      icon: "/images/sportProduct/7.png",
      itemType: 2,
    },
    {
      id: 8,
      type: '常规',
      name: 'MC403',
      icon: "/images/sportProduct/8.png",
      itemType: 2,
    },
    {
      id: 9,
      type: '常规',
      name: 'MC402',
      icon: "/images/sportProduct/8.png",
      itemType: 2,
    },
    //  第二页数据示例 (超过 9 个的部分) 
    {
      id: 10,
      type: '常规',
      name: 'MC401',
      icon: "/images/sportProduct/8.png",
      itemType: 2,
    },
    {
      id: 11,
      type: 'ETHERCAT',
      name: 'FLEX-6 PLUS',
      icon: "/images/sportProduct/1.png",
      itemType: 1,
    },
  ];

  // 初始化列表
  makeProductList();
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
      margin-top: 2vh;
      width: 60%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .product-intro {
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #666;
        margin-bottom: 3vh;
        line-height: 1.6;
        font-family: "SourceHanSansCN-Regular";
      }

      .tab-content-area {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        min-height: 50vh;
        margin-top: 2vh;

        .content-item-container {
          animation: fadeIn 0.3s ease;
          width: 100%;
          display: grid;

          //  一行 3 个 
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5vh;
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
          }

          .empty-state {
            grid-column: 1 / -1;
            width: 100%;
            text-align: center;
            padding: 50px 0;
            color: #999;
          }

          //   Item    
          .product-item {
            width: 100%;
            min-height: 25vh;
            background-color: #F6F6F8;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            border-radius: 8px;
            overflow: hidden;
            display: flex;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            //  布局类型 1: 左右排列  
            &.layout-type-1 {
              flex-direction: row;
              padding: 1.5vh;
              align-items: center;
              height: 28vh;
              // border: 2px solid red;

              .left-img {
                width: 45%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-right: 1.5vh;

                img {
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                }
              }

              .right-info {
                width: 55%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                text-align: left;

                .product-item-type {
                  font-size: 14px;
                  color: #16418A;
                  font-weight: bold;
                  margin-bottom: 0.5vh;
                }

                .product-item-name {
                  font-size: 18px;
                  color: #333;
                  font-weight: bold;
                  margin-bottom: 1.5vh;
                  line-height: 1.4;
                }

                .more {
                  padding: 6px 16px;
                  background-color: #16418A;
                  color: #fff;
                  border-radius: 20px;
                  font-size: 12px;
                  align-self: flex-start;
                }
              }
            }

            // --- 布局类型 2: 上下排列   
            &.layout-type-2 {
              flex-direction: column;
              padding: 2vh 1vh;
              align-items: center;
              justify-content: flex-end;
              height: 28vh;
              // border: 2px solid green;


              .top-img {
                width: 80%;
                height: 60%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5vh;

                img {
                  max-width: 100%;
                  max-height: 100%;
                  object-fit: contain;
                }
              }

              .bottom-info {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;

                .product-item-type {
                  font-size: 14px;
                  color: #888;
                  margin-bottom: 0.5vh;
                }

                .product-item-name {
                  font-size: 16px;
                  color: #333;
                  font-weight: bold;
                  margin-bottom: 1vh;
                  line-height: 1.4;
                }

                .more {
                  width: 80px;
                  height: 24px;
                  line-height: 24px;
                  background-color: #16418A;
                  color: #fff;
                  border-radius: 20px;
                  font-size: 12px;
                }
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