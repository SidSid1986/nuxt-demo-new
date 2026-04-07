<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>
    <div class="carousel-container">
      <IndexSwiper ref="treatSwiperRef" :swiperData="swiperData" :activeIndex="testIndex" />
    </div>

    <div class="main-product">
      <MainProduct :productData="productData" />
    </div>

    <div class="main-select">
      <!-- <MainSelect :selectContentItems="selectContentItems" /> -->

      <MainSelectSwiper :selectContentItems="selectContentItems" />
      <!-- <IndusSwiper :swiperData="selectContentItems" :activeIndex="testIndex" /> -->
    </div>

    <div class="main-top">
      <MainTop :topData="topData" />
    </div>

    <div class="news">
      <News :newsContentItems="newsContentItems" />
    </div>

    <div class="footer-one">
      <FooterOne :footerOneData="footerOneData" />
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>


    <div :class="{ show: isShowBackTop }" class="horizon-container">
      <div class="back-to-top" title="回到顶部" @click="scrollToTop">
        <img alt="回到顶部" src="/images/back-top.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import IndexSwiper from "@/components/IndexSwiper.vue";
import IndusSwiper from "@/components/IndusSwiper.vue";
import MainProduct from "@/components/MainProduct.vue";
import MainSelect from "@/components/MainSelect.vue";
import MainSelectSwiper from "@/components/MainSelectSwiper.vue";
import MainTop from "@/components/MainTop.vue";
import News from "@/components/News.vue";
import FooterOne from "@/components/FooterOne.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import { homeImage, mainProductList, newsList } from "@/server/common";
// 轮播数据

const swiperData = ref([
  // { id: 3, url: "/images/swiper/v3.png" },
  // { id: 1, url: "/images/swiper/v1.png" },
  // { id: 2, url: "/images/swiper/v2.png" },
]);
const testIndex = ref(-1);


// 产品中心
const productData = ref([
  // { id: 1, type: 'SCARA系列', name: "IER50-1200-SR", img: '/images/product/1.png' },
  // { id: 2, type: 'SCARA系列', name: "iER20-1000-SR-UNO", img: '/images/product/1.png' },
  // { id: 3, type: 'SCARA系列', name: "iER20-1000-SR-HI", img: '/images/product/2.png' },
  // { id: 4, type: '中小负载系列', name: "iER70-2100", img: '/images/product/3.png' },
  // { id: 5, type: '中小负载系列', name: "iER50-2700", img: '/images/product/3.png' },
  // { id: 6, type: '中小负载系列', name: "iER50-2100", img: '/images/product/3.png' },
]);

//共同选择
const selectContentItems = ref([
  // {
  //   id: 1,
  //   name: "",
  //   text: "",
  //   img_url: "/images/select/s1.png",
  // },
  // {
  //   id: 2,
  //   name: "光伏行业",
  //   text: "锂电行业",
  //   img_url: "/images/select/s2.png",
  // },
  // {
  //   id: 3,
  //   name: "",
  //   text: "",
  //   img_url: "/images/select/s3.png",
  // },
]);

//行业top
const topData = ref([
  [{
    id: 1,
    img: "/images/top/t1.png",
  },
  {
    id: 2,
    img: "/images/top/t2.png",
  },
  {
    id: 3,
    img: "/images/top/t3.png",
  },
  {
    id: 4,
    img: "/images/top/t4.png",
  },

  {
    id: 5,
    img: "/images/top/t5.png",
  },
  {
    id: 6,
    img: "/images/top/t6.png",
  }],
  [{
    id: 7,
    img: "/images/top/t7.png",
  },
  {
    id: 8,
    img: "/images/top/t8.png",
  },
  {
    id: 9,
    img: "/images/top/t9.png",
  },
  {
    id: 10,
    img: "/images/top/t10.png",
  },
  {
    id: 11,
    img: "/images/top/t11.png",
  },
  {
    id: 12,
    img: "/images/top/t12.png",
  }],
  [{
    id: 13,
    img: "/images/top/t13.png",
  },
  {
    id: 14,
    img: "/images/top/t14.png",
  },
  {
    id: 15,
    img: "/images/top/t15.png",
  },
  {
    id: 16,
    img: "/images/top/t16.png",
  },
  {
    id: 17,
    img: "/images/top/t17.png",
  },
  {
    id: 18,
    img: "/images/top/t18.png",
  }]
])

const footerOneData = ref({});

//新闻
const newsContentItems = ref([
  // {
  //   id: 1,
  //   title: " 阜瑞快讯|埃斯顿机器人全国联保网络正式启动，华北授权网点高效服务保驾护航！",
  //   name:
  //     "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
  //   pic: "/images/news/n1.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 2,
  //   title: " 阜瑞快讯 | 埃斯顿授权阜瑞智能为华北区域指定联保网点",
  //   name:
  //     "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
  //   pic: "/images/news/n1.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 3,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/n1.png",
  //   date: "2025-12-06"
  // },
]);


// 回到顶部按钮
const isShowBackTop = ref(false);
const scrollThreshold = 300;
let scrollHandler = null;

// 滚动监听
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  // console.log("实时滚动距离：", scrollTop);
  isShowBackTop.value = scrollTop > scrollThreshold;
};

// 点击回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  isShowBackTop.value = false;
};




//获取首页图片
const getHomeImage = async () => {
  const res = await homeImage();
  if (res.code === 200) {
    swiperData.value = res.data.banners;
    selectContentItems.value = res.data.cores;
    footerOneData.value = res.data.footer;
    console.log(swiperData.value);
  }
};

//获取产品列表 

const getProductList = async () => {
  const res = await mainProductList(1, 6);
  console.log(res);
  if (res.code === 200) {
    productData.value = res.data
  }
};

//获取新闻列表
const getNewsList = async () => {

  const res = await newsList(1, 3);
  // console.log(res.data.slice(1,4));
  newsContentItems.value = res.data.slice(1, 4)

};



onMounted(async () => {
  await getHomeImage();
  await getProductList();
  await getNewsList();

  scrollHandler = handleScroll;
  window.addEventListener("scroll", scrollHandler, {
    capture: true,
    passive: true,
  });
  handleScroll();
});

onActivated(() => {
  if (!scrollHandler) scrollHandler = handleScroll;
  window.addEventListener("scroll", scrollHandler, { capture: true, passive: true });
});

onDeactivated(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler, { capture: true });
  }
});

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener("scroll", scrollHandler, { capture: true });
    scrollHandler = null;
  }
});
</script>

<style lang="scss" scoped>
.index-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: auto;

  .nav-container {
    width: 100%;
  }

  .carousel-container {
    height: 75vh;
    width: 100%;
    // border: 1px solid red;
    box-sizing: border-box;
  }

  .main-product {
    width: 100%;
    height: 85vh;
  }

  .main-select {
    width: 100%;
    height: 70vh;
  }



  .main-top {
    width: 100%;
    height: 65vh;
    // background-color: red;
  }

  .news {
    width: 100%;
  }

  .footer-one {
    width: 100%;
  }

  .footer-two {
    width: 100%;
  }
}

.horizon-container {
  position: fixed;
  bottom: 100px;
  right: 60px;
  width: 64px;
  height: 64px;
  overflow: hidden;
  z-index: 99999;
  pointer-events: none;
}

.back-to-top {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #2E9DA4;
  color: white;
  // border-radius: 50%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  // box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  // border: 2px solid rgba(255, 255, 255, 0.6);
  pointer-events: auto;

  transform: translateY(100%);
  opacity: 0;

  transition: transform 0.8s ease-out, opacity 0.6s ease-out;

  img {
    width: 100%;
    height: 100%;
  }
}

.horizon-container.show .back-to-top {
  transform: translateY(0);
  opacity: 1;
}

.back-to-top:hover {
  // transform: translateY(0) scale(1.1) !important;
  background: #0e777f;
  // box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}

.back-to-top:active {
  // transform: translateY(0) scale(0.95) !important;
}

.arrow {
  line-height: 1;
  transform: translateY(-2px);
  font-size: 30px;
}
</style>
