<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="product-bg"><span>通用机器人</span></div>

    <div class="product-bread">
      <div><span class="breadcrumb-item" @click="toIndex">首页></span><span class="breadcrumb-item"
          @click="toProduct">产品中心></span>{{ productData.typeName }}</div>
    </div>

    <div v-if="productData.typeName" class="product-detail-container">
      <!-- 产品详情标题 -->
      <div class="img-content">
        <div class="type-name">{{ productData.typeName }}</div>
        <div class="robot-name">{{ productData.robotName }}</div>
        <img :src="productData.productImg" alt="">
      </div>

      <!-- 产品详情tab -->
      <div class="detail-tab">
        <div class="tab-item" v-for="(item, index) in productData.mainParam" :key="index">
          <img :src="item.icon" alt="">
          <div class="tab-item-content">
            <div class="tab-item-text">{{ item.text }}</div>
            <div class="tab-item-num">{{ item.num }}</div>
          </div>
        </div>
      </div>

      <div class="detail-title-text">详细参数</div>


      <DragTab :tabList="tabList" :activeIndex="tabActiveIndex" @tabChange="tabClick" />

      <div class="tab-content-area">
        <transition name="fade" mode="out-in">
          <div :key="`${tabActiveIndex}`" class="content-item-container">
            <table class="detail-table" cellpadding="12" cellspacing="0" border="1">
              <tbody>
                <!-- 第一行自动作为灰色表头行，其余为白色内容行 -->
                <tr v-for="(row, rIdx) in tablesData[tabActiveIndex].rows" :key="rIdx"
                  :class="rIdx === 0 ? 'header-row' : 'content-row'">
                  <td width="50%">{{ row[0] }}</td>
                  <td width="50%">{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>

            <div class="img-container">
              <img v-for="(img, index) in productData.customTables[tabActiveIndex].images" :key="index" :src="img.url"
                alt="">
            </div>

          </div>
        </transition>
      </div>

      <!-- 自定义表格 （无固定表头） -->
      <!-- <div class="table-content">
        <el-tabs v-model="activeTab" class="custom-param-tabs">
          <el-tab-pane v-for="(table, idx) in productData.customTables" :key="idx" :label="table.name"
            :name="idx.toString()">
            <table class="detail-table" cellpadding="12" cellspacing="0" border="1">
              <tbody>
              
                <tr v-for="(row, rIdx) in tables" :key="rIdx" :class="rIdx === 0 ? 'header-row' : 'content-row'">
                  <td width="30%">{{ row[0] }}</td>
                  <td width="70%">{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div> -->

    </div>

    <div v-else class="loading-container">产品详情补充中</div>

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
import { productDetail } from "@/server/common";
import { ElTabs, ElTabPane } from 'element-plus';
import DragTab from "@/components/normal/DragTab.vue";

const router = useRouter();

const productData = ref({
  typeName: "",
  robotName: "",
  productImg: "",
  mainParam: [],
  customTables: []
});

const activeTab = ref("0");
const tabActiveIndex = ref(0);
const tabList = ref([]);
const tablesData = ref([]);
const toIndex = () => {
  router.push('/product');
};

const tabClick = (index, item) => {
  tabActiveIndex.value = index;
  activeTab.value = index.toString();
};

const toProduct = () => {
  router.push('/product');
};

const getProductDetail = async () => {
  const res = await productDetail(
    router.currentRoute.value.params.type,
    router.currentRoute.value.params.id
  );
  productData.value = formatProductData(res.data);

  console.log(productData.value);

  tabList.value = productData.value.customTables.map((item, index) => ({
    id: index,
    label: item.name,
  }));

  console.log(tabList.value);
  tablesData.value = productData.value.customTables.map((item, index) => ({
    rows: item.rows,
  }));

  console.log(tablesData.value);

};

const formatProductData = (apiData) => {
  if (!apiData) return {};

  return {
    typeName: apiData.robot_type || "未知系列",
    robotName: apiData.product_name || "",
    productImg: apiData.main_image_url || "",
    mainParam: [
      { text: "最大臂展", num: apiData.max_arm_span || "", icon: "/images/productDetail/tab1.png" },
      { text: "最大负载", num: apiData.max_weight || "", icon: "/images/productDetail/tab2.png" },
      { text: "轴数", num: apiData.switch_num || "", icon: "/images/productDetail/tab3.png" },
      { text: "本体重量", num: apiData.weight || "", icon: "/images/productDetail/tab4.png" },
    ],
    customTables: apiData.custom_tables || []
  };
};

onMounted(() => {
  getProductDetail();
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
    width: 60%;
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

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
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          img {
            margin: 2vh 0;
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