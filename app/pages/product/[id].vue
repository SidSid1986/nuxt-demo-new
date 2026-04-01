<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-01 09:19:01
 * @FilePath: \nuxt-free-new\app\pages\product\[id].vue
 * @Description: 
-->
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

      <div class="table-content">
        <DetailTable :detailPram="productData.detailPram" />
      </div>

      <div class="pruduct-detail-img-title">产品图例</div>
      <div class="pruduct-detail-img-content">
        <img :src="productData.detailPram.detailImg" alt="">
      </div>

    </div>

    <div v-else class="loading-container">产品详情补充中</div>

    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import Navbar from "@/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue"
import DetailTable from "@/components/DetailTable.vue"
const router = useRouter();

import { productDetail } from "@/server/common";


// const productData = ref({
//   typeName: "SCARA系列",
//   robotName: "IER50-1200-SR",
//   detailImg: '/images/productDetail/d1.png',
//   mainParam: [
//     {
//       text: "最大臂展",
//       num: "1200MM",
//       icon: "/images/productDetail/tab1.png",

//     },
//     {
//       text: "最大负载",
//       num: "50KG",
//       icon: "/images/productDetail/tab2.png",

//     },
//     {
//       text: "轴数",
//       num: "4轴",
//       icon: "/images/productDetail/tab3.png",
//     },
//     {
//       text: "本体重量",
//       num: "120KG",
//       icon: "/images/productDetail/tab4.png",
//     }
//   ],
//   detailPram: {
//     robotName: "IER50-1200-SR",
//     switchNum: "4轴",
//     maxWeight: "50KG",
//     maxArmSpan: "1200MM",
//     perprecision: "J1+J2:±0.025mm;J3:±0.015mm;J4:±0.005°",
//     weight: '145kg',
//     IP: 'IP54',
//     insType: '地面',
//     driveType: 'AC伺服电机驱动',
//     insRequire: '温度:0至45°C(不应有过大温度变化);湿度:10至80%(不得结露);电快速瞬变脉冲群抗扰度:2kV或以下;静电抗扰度:13kV或以下;环境:设置在室内，避免阳光照射，远离灰尘、油烟、盐分、铁屑等，远离易燃性、腐蚀性液体与气体，不得与水接触，不传递冲击与振动等，远离电气干扰源。',
//     authSupport: 'CE',
//     remark: '详情请查阅说明书或向我公司咨询',
//     productImg: '/images/productDetail/1.png',
//   }
// });

const productData = ref({
  typeName: "",
  robotName: "",
  detailImg: "",
  mainParam: [],
  detailPram: {}
});
const toIndex = () => {
  router.push('/product');
};

const toProduct = () => {
  router.push('/product');
};

const getProductDetail = async () => {
  const res = await productDetail(router.currentRoute.value.params.id);
  productData.value = formatProductData(res.data);

}
//处理数据结构
const formatProductData = (apiData) => {
  if (!apiData) return;

  return {
    // 顶部基础信息
    typeName: apiData.robot_type || "未知系列",
    robotName: apiData.robot_name || apiData.product_name || "",
    productImg: apiData.main_image_url || "",

    // 主要参数（4个卡片）
    mainParam: [
      {
        text: "最大臂展",
        num: apiData.max_arm_span || "",
        icon: "/images/productDetail/tab1.png",
      },
      {
        text: "最大负载",
        num: apiData.max_weight || "",
        icon: "/images/productDetail/tab2.png",
      },
      {
        text: "轴数",
        num: apiData.switch_num || "",
        icon: "/images/productDetail/tab3.png",
      },
      {
        text: "本体重量",
        num: apiData.weight || "",
        icon: "/images/productDetail/tab4.png",
      }
    ],

    // 详细参数
    detailPram: {
      robotName: apiData.robot_name || "",
      switchNum: apiData.switch_num || "",
      maxWeight: apiData.max_weight || "",
      maxArmSpan: apiData.max_arm_span || "",
      perprecision: apiData.perprecision || "",
      weight: apiData.weight || "",
      IP: apiData.ip_level || "IP54", // 接口是null就给默认值
      insType: apiData.ins_type || "",
      driveType: apiData.drive_type || "",
      insRequire: apiData.ins_require || "",
      authSupport: apiData.auth_support || "",
      remark: apiData.remark || "",
      detailImg: apiData.detail_img || "", // 主图
    }
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
    // padding-left: 350px;
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
    // border: 1px solid red;

    .breadcrumb-item {
      cursor: pointer;
    }


  }

  .product-detail-container {
    min-height: 60vh;
    width: 60%;
    // border: 2px solid green;
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
      // border: 1px solid red;

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
        // border: 1px solid red;
        width: 15vh;
      }
    }

    .detail-tab {
      height: 10vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // border: 1px solid red;

      .tab-item {
        height: 10vh;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F6F6F8;

        .tab-item-content {
          // border: 1px solid red;

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
      // border: 1px solid red;
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

    .pruduct-detail-img-title {
      width: 100%;
      height: 5vh;
      // border: 1px solid red;
      line-height: 5vh;
      text-align: center;
      font-size: 20px;
      // color: #16418A;
      font-family: "SourceHanSansCN-Bold";
    }

    .pruduct-detail-img-content {
      min-height: 60vh;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // border: 1px solid red;
      margin-top: 2vh;
      margin-bottom: 5vh;

      img {
        width: 100%;
        height: 100%;
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
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
