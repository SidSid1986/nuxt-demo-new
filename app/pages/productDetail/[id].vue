<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="product-bg"><span>{{ seriesName }}</span></div>
    <div class="product-bread">
      <div>
        <span class="breadcrumb-item" @click="toIndex">首页></span>
        <span class="breadcrumb-item" @click="toProduct">产品中心></span>
        <!-- 最终显示的系列名称 -->
        {{ seriesName }}
      </div>
    </div>

    <div class="product-detail-container">
      <div v-if="productData.img" class="ad-img-container">
        <img :src="productData.img" alt="">
      </div>
      <div v-if="productData.images" v-for="img in productData.images" :key="img" class="ad-img-container">
        <img :src="img" alt="">
      </div>
      <div v-else class="no-img-container">
        <span>暂无数据</span>
      </div>
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";
import { productList, productCategoryTree } from "@/server/common";

const router = useRouter();
const categoryId = router.currentRoute.value.params.id;
const productType = ref('');


const seriesName = ref("加载中...");

// 产品数据
const productData = ref({});

// 跳转
const toIndex = () => router.push('/');
const toProduct = () => {

  if (productType.value === 'sport') {
    router.push('/sportProduct')
  }
  else {
    router.push('/product')
  }
};


const findSeriesName = (tree, targetId) => {
  // 先转字符串统一比较
  const target = String(targetId);

  function search(items) {
    for (let item of items) {
      if (String(item.id) === target) {
        return item.label;
      }
      // 有子节点就递归
      if (item.children?.length) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  return search(tree) || "未知系列";
};

const getProductData = async () => {
  const res = await productList({
    category_id: categoryId,
    page: 1,
    page_size: 12
  });

  //  有产品：直接用产品里的名称
  if (res.data && res.data.length > 0) {
    productData.value = res.data[0];
    seriesName.value = productData.value.robotType;
    productType.value = productData.value.productType;
  }
  //   没有产品：去 tree 里查
  else {
    productData.value = {};
    const treeRes = await productCategoryTree();
    console.log(treeRes);
    seriesName.value = findSeriesName(treeRes.data, categoryId);
  }
};

onMounted(() => {
  getProductData();
});
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;

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
      display: inline-block;
      margin-left: 350px;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
      font-family: "SourceHanSansCN-Bold";
    }
  }

  .product-bread {
    height: 5vh;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .breadcrumb-item {
      cursor: pointer;
    }
  }

  .product-detail-container {
    min-height: 60vh;
    width: 80%;
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .ad-img-container {
      // border: 1px solid red;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100vh;
      }
    }

    .img-content {
      height: 33vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .type-name {
        font-size: 20px;
        color: #16418A;
        font-family: "SourceHanSansCN-Bold";
        margin-bottom: 3vh;
      }

      .robot-name {
        font-size: 30px;
        color: #16418A;
        font-family: "SourceHanSansCN-Bold";
      }

      img {
        width: 15vh;
      }
    }

    .detail-tab {
      height: 10vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tab-item {
        height: 10vh;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F6F6F8;

        .tab-item-content {
          .tab-item-text {
            font-size: 20px;
            font-family: "SourceHanSansCN-Bold";
          }

          .tab-item-num {
            font-size: 16px;
            font-family: "SourceHanSansCN-Regular";
          }
        }
      }
    }

    .detail-title-text {
      width: 100%;
      text-align: center;
      font-size: 20px;
      color: #16418A;
      font-family: "SourceHanSansCN-Bold";
      height: 5vh;
      line-height: 5vh;
      margin-top: 2vh;
      background-color: #F6F6F8;
    }

    .table-content {
      min-height: 50vh;
      width: 100%;
      border-left: 1px solid #E8E8E8;
      border-right: 1px solid #E8E8E8;
      border-bottom: 1px solid #E8E8E8;
      margin-bottom: 2vh;
      padding: 3vh;
    }

    .tab-content-area {
      width: 100%;
      display: flex;
      flex-direction: column;

      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      // border: 2px solid yellow;
      min-height: 20vh;
      margin-top: 2vh;
      margin-bottom: 5vh;

      .content-item-container {
        animation: fadeIn 0.3s ease;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        .img-container {
          // border:2px solid red;
          min-height: 50vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            // border:2px solid yellow;
            max-height: 400px;
            margin: 1vh 0;
          }
        }
      }
    }

    .custom-param-tabs {
      --el-tabs-card-border-color: #E8E8E8;
    }

    .detail-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      border: 1px solid #E8E8E8;

      td {
        text-align: center;
        border: 1px solid #E8E8E8;
      }

      // 第一行自动灰色表头
      .header-row {
        background-color: #F6F6F8 !important;
        font-weight: bold;
      }

      // 内容行白色
      .content-row {
        background-color: #fff !important;
      }
    }
  }

  .loading-container {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-container,
  .footer-two {
    width: 100%;
  }
}
</style>