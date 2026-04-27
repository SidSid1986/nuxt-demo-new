<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-18 10:47:20
 * @FilePath: \nuxt-free-new\app\pages\sportProduct\[type]\[id].vue
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

    <div v-if="productData.typeName" class="product-detail-container">
      <div class="product-d-title"><span>{{ sportOneItem.product_name }}</span></div>

      <div class="product-d-content">
        <div class="product-d-left">
          <img :src="sportOneItem.main_image_url" alt="">
        </div>
        <div class="product-d-right">
          <div class="line-detail">{{ sportOneItem.detail }}</div>

          <div v-for="(item, index) in sportOneItem.selling_points
" :key="index">
            <div class="line-title">{{ item.title }}</div>
            <div class="line-text">{{ item.content }}</div>
          </div>
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
        <!-- <div>==={{ tabActiveIndex }}</div>
        <div>===={{ tablesData[tabActiveIndex] }}</div>

     
        <div v-if="tablesData[tabActiveIndex]?.rows">
          {{ tablesData[tabActiveIndex].rows }}
        </div> -->
      </div>

      <DragTab :tabList="tabList" :activeIndex="tabActiveIndex" @tabChange="tabClick" />


      <div class="tab-content-area">
        <transition name="fade" mode="out-in">
          <div :key="`${tabActiveIndex}`" class="content-item-container">
            <table class="detail-table" cellpadding="12" cellspacing="0" border="1">
              <tbody>
                <tr v-for="(row, rIdx) in tablesData[tabActiveIndex].rows" :key="rIdx"
                  :class="rIdx === 0 ? 'header-row' : 'content-row'">
                  <td width="50%">{{ row[0] }}</td>
                  <td width="50%">{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>

            <div class="img-container">
              <img v-for="(img, index) in tablesData[tabActiveIndex].images" :key="index" :src="img.url" alt="">
            </div>

          </div>
        </transition>
      </div>

      <!-- <div class="detail-img">
        <img :src="sportOneItem.img" alt="">
      </div> -->
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
import { productDetail } from "@/server/common";
import DragTab from "@/components/normal/DragTab.vue";


const router = useRouter();
const sportOneItem = ref({

})
const productData = ref({
  typeName: "",

});
const tablesData = ref([]);

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
const activeTab = ref("0");
const tabList = ref([]);
const tabActiveIndex = ref(0);

const tabClick = (index, item) => {
  tabActiveIndex.value = index;
  activeTab.value = index.toString();
};

const toIndex = () => {
  router.push("/product");
};

const toProduct = () => {
  router.push("/product");
};



const getProductDetail = async () => {


  const res = await productDetail(router.currentRoute.value.params.type, router.currentRoute.value.params.id);
  sportOneItem.value = res.data;

  console.log(sportOneItem.value);

  productData.value = {
    typeName: sportOneItem.value.robot_type,
  }

  tabList.value = sportOneItem.value.custom_tables.map((item, index) => ({
    id: index,
    label: item.name,
  }));


  tablesData.value = sportOneItem.value.custom_tables.map((item, index) => ({
    rows: item.rows,
    images: item.images,
  }));

  console.log(tablesData.value);
  console.log(tablesData.value[0].rows);

  //  console.log( tablesData.value[tabActiveIndex.value].rows);

}

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
          // width: 400px;`
          height: 100%;
          width: auto;
          object-fit: scale-down;
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
          min-height:50vh;
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

  .first-pram {
    width: 100%;
    margin-top: 2vh;
  }

  .second-pram {
    width: 100%;
    margin-top: 2vh;
  }

  .detail-img {
    height: 50vh;
    margin-top: 2vh;

    display: flex;

    justify-content: center;

    align-items: center;


    img {
      height: 100%;

      width: auto;

      object-fit: scale-down;

    }
  }

  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
