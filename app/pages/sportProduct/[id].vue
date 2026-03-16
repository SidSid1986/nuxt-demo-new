<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-16 13:52:42
 * @FilePath: \nuxt-free-new\app\pages\sportProduct\[id].vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="product-bg"><span>运动控制器</span></div>

    <div class="product-bread">
      <div>
        <span class="breadcrumb-item" @click="toIndex">首页></span>
        <span class="breadcrumb-item" @click="toProduct">产品中心></span>
        <span> 运动控制器</span>
      </div>
    </div>

    <div class="product-detail-container">
      <div class="product-d-title"><span>MC404-Z 4轴高性能运动控制器</span></div>

      <div class="product-d-content">
        <div class="product-d-left">
          <img :src="sportOneItem.img" alt="">
        </div>
        <div class="product-d-right">
          <div class="line-detail">{{ sportOneItem.detail }}</div>
          <div class="line-title">编程灵活</div>
          <div class="line-text">{{ sportOneItem.line1 }}</div>
          <div class="line-title">通讯丰富</div>
          <div class="line-text">{{ sportOneItem.line2 }}</div>
          <div class="line-title">认证齐全</div>
          <div class="line-text">{{ sportOneItem.line3 }}</div>
        </div>
      </div>

      <div class="icon-contents">
        <div v-for="item in iconContents" :key="item.id" class="icon-item">
          <img :src="item.img" alt="">
          <div class="icon-name">{{ item.name }}</div>
        </div>
      </div>

      <div class="detail-title">
        <span>详细参数</span>
      </div>

      <div class="first-pram">
        <SportDetailTable :sportPram="sportPram" />
      </div>

      <div class="second-pram">
        <SportDetailTable :sportPram="sportPramTwo" />
      </div>
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import Navbar from "@/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";

import SportDetailTable from "@/components/SportDetailTable.vue";

const router = useRouter();


const sportOneItem = ref({
  id: 1,
  name: "MC404-Z 4轴高性能运动控制器",
  detail: "MC404-Z基于TRIO的高性能ARM CORTEX-M7双精密技术，为步进驱动器或脉冲输入伺服驱动器提供4轴脉冲+方向或正交输出控制。TRI0采用先进的FPGA技术，缩小尺寸，并将脉冲输出和伺服电路安装在紧凑的面板安装封装中。MC404-Z安装在坚固的塑料外壳内，带有集成接地机箱，并集成了工业环境中直接连接外部设备所需的所有隔离电路。包括滤波电源，因此它可以从大多数工业机柜中的24V直流逻辑电源供电。",
  line1: "支持TRIO Basic以及IEC编程语言",
  line2: "内置ETHERNET-IP/MODBUS TCP/ETHERNET接口，支持RS485+RS232,CSNOPEN",
  line3: "ROHS、UL、CE认证齐全",
  img: "/images/sportDetail/oneImg.png",
})

const iconContents = ref([
  {
    id: 1,
    name: "3C",
    img: "/images/sportDetail/icon1.png",
  },
  {
    id: 2,
    name: "半导体",
    img: "/images/sportDetail/icon2.png",
  },
  {
    id: 3,
    name: "精密制造",
    img: "/images/sportDetail/icon3.png",
  }, {
    id: 4,
    name: "电器",
    img: "/images/sportDetail/icon4.png",
  }, {
    id: 5,
    name: "医疗器械",
    img: "/images/sportDetail/icon5.png",
  }, {
    id: 6,
    name: "新能源",
    img: "/images/sportDetail/icon6.png",
  }
])

const sportPram = ref([
  {
    id: 1, lineName: "配件", lineValue: "名称",

  },
  {
    id: 2, lineName: "P317-P327", lineValue: "CAN I/O 模块",

  }, {
    id: 3, lineName: "P750", lineValue: "机器人算法FEC",

  }, {
    id: 4, lineName: "P561-P563", lineValue: "UNIPLAY触摸屏7寸&8寸&15寸",
  }
])

const sportPramTwo = ref([
  {
    id: 1, lineName: "产品选项", lineValue: "P855",
  },

  {

    id: 2, lineName: "轴0", lineValue: "标准",

  }, {
    id: 3, lineName: "轴1", lineValue: "标准",

  }, {
    id: 4, lineName: "轴2", lineValue: "标准",
  }, {
    id: 5, lineName: "轴3", lineValue: "扩展轴",
  }
])

const toIndex = () => {
  router.push("/product");
};

const toProduct = () => {
  router.push("/product");
};

onMounted(() => { });
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
    background: url("/images/sportDetail/sportDBg.png") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;



    span {
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
    width: 80%;
    // border: 2px solid green;
    margin-top: 3vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5vh;

    .product-d-title {
      height: 8vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: #F6F6F8;

      span {
        color: #16418A;
        font-size: 24px;
        font-family: "SourceHanSansCN-Bold";
      }
    }



    .product-d-content {
      min-height: 35vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      // border: 3px solid red;


      .product-d-left {
        height: 35vh;
        width: 40%;
        // border: 2px solid green;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 400px;
          height: 500px;
        }
      }

      .product-d-right {
        height: 35vh;
        width: 60%;
        // border: 2px solid green;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .line-detail {
          // border: 1px solid red;
          height: 14vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: "SourceHanSansCN-Regular";
          margin-bottom: 1vh;
        }

        .line-title {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          font-family: "SourceHanSansCN-Regular";
          color: #16418A;
          margin-top: 1vh;
        }

        .line-text {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 16px;
          font-family: "SourceHanSansCN-Regular";
        }


      }
    }

    .icon-contents {
      margin-top: 8vh;
      height: 12vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // border: 1px solid red;
      padding: 0 100px;
      background-color: #F6F6F8;
      box-sizing: border-box;

      .icon-item {
        height: 12vh;
        width: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // border: 1px solid red;

        img {
          width: 50px;
          height: 50px;
        }
      }
    }

    .detail-title {
      height: 6vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F6F6F8;
      margin-top: 6vh;

      span {
        color: #16418A;
        font-size: 24px;
        font-family: "SourceHanSansCN-Regular";
      }
    }
  }

  .first-pram {
    width: 100%;
    margin-top: 2vh;
  }

  .second-pram {
    width: 100%;
    margin-top: 2vh;
  }

  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
