<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-04-08 16:05:12
 * @FilePath: \nuxt-free-new\app\pages\about\index.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="about-title-bg">
      <span>关于我们</span>
    </div>

    <div class="about-top">
      <div v-if="isLoaded" class="about-top-border">
        <div class="about-top-left">
          <img :src="aboutTopImg" alt="">
        </div>
        <div class="about-top-right">
          <div class="about-top-right-title">烟台阜瑞智能装备有限公司</div>
          <div v-html="aboutTopText"></div>
        </div>
      </div>
    </div>

    <div class="logo-container">
      <div class="logo-title">使命必达，他们选择了阜瑞智能</div>
      <div class="logo-line-one">
        <div v-for="item in logoDataOne" :key="item.id" class="logo-item">
          <img :src="item.img" alt="">
        </div>
      </div>

      <div class="logo-line-two">
        <div v-for="item in logoDataTwo" :key="item.id" class="logo-item">
          <img :src="item.img" alt="">
        </div>
      </div>

    </div>

    <div class="logo-honor">
      <span>荣誉资质 不断突破</span>
      <!-- <img src="/images/about/honor.png" alt=""> -->
      <AboutSwiper :swiperData="swiperData" :activeIndex="testIndex" />
    </div>

    <div @click="handleClick" class="about-container">
      <span>我们的征程因你而辉煌</span>
      <Step :stepsArrData="stepsArrData" />
    </div>

    <div class="map-container">
      <MapNew />
    </div>

    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue";
import Navbar from "@/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";
import Step from "@/components/normal/Step.vue"
import MapNew from "@/components/normal/MapNew.vue"
 
import { aboutInfo, aboutSwiperList ,aboutStepList} from "@/server/common";
import AboutSwiper from "@/components/AboutSwiper.vue";


const router = useRouter();
const aboutTopImg = ref('')
const isLoaded = ref(false);
const aboutTopText = ref('')
const logoDataOne = ref([{
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
  id: 11,
  img: "/images/top/t11.png",
},
{
  id: 9,
  img: "/images/top/t9.png",
}]
)
const logoDataTwo = ref([{
  id: 5,
  img: "/images/top/t5.png",
},
{
  id: 8,
  img: "/images/top/t8.png",
},
{
  id: 7,
  img: "/images/top/t7.png",
},
{
  id: 12,
  img: "/images/top/t12.png",
},
{
  id: 10,
  img: "/images/top/t10.png",
},
{
  id: 6,
  img: "/images/top/t6.png",
}])

const stepsArrData = ref([])

const testIndex = ref(-1);

const swiperData = ref([
  // { id: 3, img_url: "/images/swiper/v3.png" },
  // { id: 1, img_url: "/images/swiper/v1.png" },
  // { id: 2, img_url: "/images/swiper/v2.png" },
]);

const handleClick = () => {
  // router.push("/product/1");
};

const getAboutSwiperList = async () => {
  const res = await aboutSwiperList();
  if (res.code === 200) {
    swiperData.value = res.data;
  }
}

const getStepList = async () => {
  const res = await aboutStepList();
  if (res.code === 200) {
    stepsArrData.value = res.data;
  }
}

onMounted(async () => {
  await getAboutSwiperList();
  await getStepList();
  // aboutTopText.value = ' <p><span style="color: rgb(47, 46, 63); font-size: 14px;">烟台阜瑞智能装备有限公司成立于2009年，是一家专注于工业机器人、非标智能设备研发与制造，以及运动控制领域硬件开发与高端系统集成服务的高新技术企业。公司汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖人才与专业研发团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。</span></p><p><br></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">凭借卓越的产品性能、突破性的技术应用以及以客户为核心的经营理念，公司已成功交付多个行业标杆项目，包括：</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">汽车制造领域​​：长安铃木汽车车身生产线机span系统、沈阳宝马车身自动线；</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">​​智能制造领域​​：机器人化肥码垛系统、兴民智通智能轮毂打磨工作站​​</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">运动控制与自动化​​：杰瑞数字六自由度驾控平台控制系统、多轴联动专用机械控制系统</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">专用设备开发​​：自研Delta机器人、玻璃修边机械手、智能玻璃磨角机、智能刷油机械手、刹车盘精加工线机器人系统、 反应罐自动给料系统等公司已获得多项行业专利和高新技术成果，为客户创造了显著的经济效益和社会效益。</span></p><p><br></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">2025年战略升级​​，阜瑞智能与埃斯顿机器人达成深度合作，成为埃斯顿机器人全国首家联保网点，为华北地区客户提供​​“安心+高效”双保险服务​​，包括：</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">✅ ​​快速响应​​——及时解决设备问题</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">✅ ​​强大技术支持​​——专业团队全程护航</span></p><p><span style="color: rgb(47, 46, 63); font-size: 14px;">✅ ​​全周期维保​​——涵盖巡检、保养、维修！</span></p><p><br></p>';

  //获取关于我们信息
  const res = await aboutInfo();
  console.log(res);
  if (res.code === 200) {
    aboutTopText.value = res.data.content;
    aboutTopImg.value = res.data.cover_image;
  }

  isLoaded.value = true;

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

  .about-title-bg {
    width: 100%;
    height: 30vh;
    background: url("/images/about/about.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 40px;
      font-family: "SourceHanSansCN-Bold";
    }
  }

  .about-top {
    margin-top: 4vh;
    // border: 1px solid red;
    min-height: 65vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 4vh;

    .about-top-border {
      width: 70%;

      display: flex;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;

      .about-top-left {
        width: 50%;
        min-height: 60vh;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;

        }
      }

      .about-top-right {
        width: 50%;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 20px;
        background-color: #F2F1F1;


        .about-top-right-title {
          font-size: 25px;
          font-family: "SourceHanSansCN-Bold";
          color: #0B44B4;
          margin-bottom: 2vh;
        }


      }
    }
  }

  .logo-container {
    width: 100%;
    height: 40vh;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5vh 0;

    background: url("/images/about/logoBg.png") no-repeat center center;
    background-size: contain;

    .logo-title {
      height: 5vh;
      // border: 1px solid yellow;
      line-height: 5vh;
      ;
      font-size: 30px;
      font-family: "SourceHanSansCN-Bold";
    }


    .logo-line-one {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      // border: 1px solid green;
      padding: 0 280px 0 150px;
      box-sizing: border-box;
    }

    .logo-line-two {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      // border: 1px solid green;
      padding: 0 120px 0 280px;
      box-sizing: border-box;

    }

    .logo-item {
      height: 50px;

      img {
        max-width: 160px;
        height: 50px;
        // border: 1px solid red;
      }
    }
  }

  .logo-honor {
    width: 100%;
    height: 50vh;
    // border: 1px solid green;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 10vh;

    span {
      height: 5vh;
      // border: 1px solid yellow;
      line-height: 5vh;
      font-size: 30px;

      margin-bottom: 2vh;
      font-family: "SourceHanSansCN-Bold";
    }

    img {
      width: 800px;
      height: 300px;
      object-fit: cover;
    }
  }

  .about-container {
    width: 100%;
    height: 50vh;
    // border: 4px solid yellow;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    margin-top: 10vh;


    span {
      height: 5vh;
      // border: 1px solid yellow;
      line-height: 5vh;
      font-size: 30px;

      margin-bottom: 2vh;
      font-family: "SourceHanSansCN-Bold";
    }
  }

  .map-container {
    margin-top: 5vh;
    margin-bottom: 3vh;
    width: 70%;
    height: 60vh;
    // border: 4px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
  }


  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
