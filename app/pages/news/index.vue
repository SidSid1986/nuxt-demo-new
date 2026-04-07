<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 14:07:22
 * @FilePath: \nuxt-free-new\app\pages\news\index.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="news-title-bg">
      <span>新闻中心</span>
    </div>

    <div class="news-isLoad">
      <div v-if="isLoaded" class="news-top">
        <div class="news-top-border" @click="toDetail(topNews.id)">
          <div class="news-top-left">
            <img :src="topNews.pic" alt="" v-if="topNews.pic">
          </div>
          <div class="news-top-right">
            <span class="news-top-right-title">{{ topNews.title }}</span>
            <span class="news-top-right-name">{{ topNews.summary }}</span>
            <span class="news-top-right-date"><span>发布时间：</span>{{ topNews.date }}</span>
          </div>
        </div>
      </div>


      <div v-if="isLoaded" class="news-list-container">
        <div class="news-item-card">

          <div class="news-item-border" v-for="item in newsContentItems" :key="item.id">      
            <div class="news-item" @click="toDetail(item.id)">
              <img :src="item.pic" alt="" class="news-item-img">
              <span class="news-item-title">{{ item.title }}</span>
              <span class="news-item-name">{{ item.summary }}</span>
              <span class="news-item-date"><span>了解更多></span>{{ item.date }}</span>
            </div>
          </div>
        </div>

        <!-- 分页控件  -->
        <Pagination :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />
      </div>
    </div>



    <div class="footer-two">

      <FooterTwo />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue";
import { newsList } from "@/server/common";


const router = useRouter();

const isLoaded = ref(false);

const newsContentItems = ref([
  // {
  //   id: 1,
  //   title: " 阜瑞快讯|埃斯顿机器人全国联保网络正式启动，华北授权网点高效服务保驾护航！",
  //   name:
  //     "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 2,
  //   title: " 阜瑞快讯 | 埃斯顿授权阜瑞智能为华北区域指定联保网点",
  //   name:
  //     "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 3,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 4,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // },
  // {
  //   id: 5,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // },
  // {

  //   id: 6,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // }, {
  //   id: 7,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // }, {
  //   id: 8,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // }, {
  //   id: 9,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // }, {
  //   id: 10,
  //   title: " 方案速递|储能柜门板打磨解决方案",
  //   name:
  //     "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
  //   pic: "/images/news/news-demo.png",
  //   date: "2025-12-06"
  // }

]);

const currentPageData = ref([]);



// 核心分页变量

const currentPage = ref(1);    // 当前页码
const pageSize = ref(8);

const total = ref(0);           // 每页9条

// 头条新闻 
const topNews = ref({});

const toDetail = (id) => {
  router.push(`/news/${id}`);
}



//  总页数
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

// 切换页码方法
const changePage = (newPageNum) => {
  // 增加边界检查，防止越界
  if (newPageNum >= 1 && newPageNum <= totalPages.value) {
    currentPage.value = newPageNum;
    getNewsList();
  }
};

const getNewsList = async () => {
  const res = await newsList(currentPage.value, pageSize.value);
  total.value = res.total;

  newsContentItems.value = res.data;
  //   设置头条新闻（取第一条）
  topNews.value = newsContentItems.value[0] || {};
  currentPageData.value = newsContentItems.value.slice(1);
  isLoaded.value = true;
};

onMounted(async () => {
  await getNewsList();


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
  background-color: #F2F1F1;



  .news-title-bg {
    width: 100%;
    height: 30vh;
    background: url("/images/news/news-title.png") no-repeat center center;
    background-size: 100% 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 40px;

      font-family: "SourceHanSansCN-Bold";
    }
  }

  .news-isLoad {
    min-height: 80vh;
  }

  .news-top {
    margin-top: 4vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .news-top-border {
      width: 70%;
      display: flex;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;

      .news-top-left {
        width: 50%;
        height: 60vh;

        img {
          width: 100%;
          height: 100%;

        }
      }

      .news-top-right {
        width: 50%;
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 20px;
        background-color: #fff;
        box-sizing: border-box;

        .news-top-right-title {
          font-size: 25px;

          color: #0B44B4;
          margin-bottom: 2vh;
          font-family: "SourceHanSansCN-Bold";
        }

        .news-top-right-name {
          font-size: 16px;
          color: #0B44B4;
          margin-bottom: 2vh;
          line-height: 1.5; // 增加行高提升可读性
          font-family: "SourceHanSansCN-Regular";
        }

        .news-top-right-date {
          font-size: 16px;
          // color: #0B44B4;
          color: #666;
          font-family: "SourceHanSansCN-Regular";
        }
      }
    }
  }

  // 新闻列表容器 
  .news-list-container {
    // border: 2px solid red;
    margin: 3vh 0 6vh 0;
    padding-top: 1vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    min-height: 60vh;

    box-sizing: border-box;

    .news-item-card {

      width: 70%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2vh;
      box-sizing: border-box;

      .news-item-border {
        width: 100%;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        height: 34vh;
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .news-item {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          cursor: pointer;
          height: 100%;

          .news-item-img {
            width: 100%;
            height: 18vh;
            border-radius: 4px;
            margin-bottom: 8px;
            // object-fit: cover;
          }

          .news-item-title {
            font-size: 16px;
            font-family: "SourceHanSansCN-Bold";
            color: #0B44B4;
            height: 5vh;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 0 10px;
          }

          .news-item-name {
            font-size: 14px;
            color: #666;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-top: 8px;
            padding: 0 10px;
            font-family: "SourceHanSansCN-Regular";
            flex: 1;
          }

          .news-item-date {
            font-size: 14px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            margin-top: 15px;
            margin-bottom: 10px;
            font-family: "SourceHanSansCN-Regular";
          }
        }
      }
    }



  }

  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }
}
</style>
