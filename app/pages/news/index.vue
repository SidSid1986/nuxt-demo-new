<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-07 16:52:43
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
            <span class="news-top-right-name">{{ topNews.name }}</span>
            <span class="news-top-right-date"><span>发布时间：</span>{{ topNews.date }}</span>
          </div>
        </div>
      </div>


      <div v-if="isLoaded" class="news-list-container">
        <div class="news-item-card">

          <div class="news-item-border" v-for="item in currentPageData" :key="item.id">
            <div class="news-item" @click="toDetail(item.id)">
              <img :src="item.pic" alt="" class="news-item-img">
              <span class="news-item-title">{{ item.title }}</span>
              <span class="news-item-name">{{ item.name }}</span>
              <span class="news-item-date"><span>了解更多></span>{{ item.date }}</span>
            </div>
          </div>
        </div>

        <!-- 分页控件  -->
        <div class="pagination" v-if="totalPages > 1">
          <button class="page-btn" @click="changePage(1)" :disabled="currentPage === 1">
            首页
          </button>
          <button class="page-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            上一页
          </button>

          <span class="page-info">
            <!-- {{ currentPage }} / {{ totalPages }} -->
            <span class="page-number" v-for="page in totalPages" :key="page" @click="changePage(page)"
              :class="{ 'active': page === currentPage }">
              {{ page }}
            </span>
          </span>

          <button class="page-btn" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            下一页
          </button>
          <button class="page-btn" @click="changePage(totalPages)" :disabled="currentPage === totalPages">
            尾页
          </button>
        </div>
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


const router = useRouter();

const isLoaded = ref(false);

const newsContentItems = ref([
  {
    id: 1,
    title: " 阜瑞快讯|埃斯顿机器人全国联保网络正式启动，华北授权网点高效服务保驾护航！",
    name:
      "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  },
  {
    id: 2,
    title: " 阜瑞快讯 | 埃斯顿授权阜瑞智能为华北区域指定联保网点",
    name:
      "华北区域唯一授权联保网点烟台阜瑞智能装备有限公司|以山东为枢纽，辐射京津冀、晋蒙及东三省。阜瑞智能作为深耕工业机器人研发与高端系统集成的高新技术企业汇聚了来自机械制造、数控技术、运动伺服控制及自动化领域的顶尖技术团队，具备行业领先的自主研发能力和深度定制的行业解决方案设计实力，致力于为客户解决各类自动化应用技术难题。2025年战略升级后，其推出“安心+高效”双保险服务——30分钟极速响应、全...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  },
  {
    id: 3,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  },
  {
    id: 4,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  },
  {
    id: 5,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  },
  {

    id: 6,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  }, {
    id: 7,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  }, {
    id: 8,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  }, {
    id: 9,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  }, {
    id: 10,
    title: " 方案速递|储能柜门板打磨解决方案",
    name:
      "针对储能柜门板的打磨方案，通过“机器人+智能感知+工艺集成”的模式，解决了传统人工打磨效率低、质量不稳定的痛点，同时兼顾了灵活性与可靠性，是新能源储能装备制造领域升级的关键赋能技术。未来，随着储能柜向大型化、轻量化发展，该方案还可进一步融合AI自主学习，实现更智能的“无人化”打磨。一、打磨前VS打磨后二、打磨工艺要求01精度控制力控精度：实时感知并精准调节打磨压力，确保不过切或欠切。平面度要...",
    pic: "/images/news/news-demo.png",
    date: "2025-12-06"
  }

]);

// 核心分页变量
const newsContentArr = ref([]); // 二维数组（每组8条）
const currentPage = ref(1);    // 当前页码
const pageSize = 8;            // 每页8条

// 头条新闻 
const topNews = ref({});

const toDetail = (id) => {
  router.push(`/news/${id}`);
}

//  当前页展示的数据 
const currentPageData = computed(() => {
  // 页码从1开始，数组索引从0开始，减1
  return newsContentArr.value[currentPage.value - 1] || [];
});

//  总页数
const totalPages = computed(() => {
  return newsContentArr.value.length;
});

// 切换页码方法
const changePage = (pageNum) => {
  //  页码不能小于1，不能大于总页数
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;
};

onMounted(() => {
  //   设置头条新闻（取第一条）
  topNews.value = newsContentItems.value[0] || {};

  //   处理二维数组（每组8条，排除头条避免重复）
  // 排除第一条数据：slice(1)
  const listWithoutTop = newsContentItems.value.slice(1);
  newsContentArr.value = [];

  //  每8条一组
  for (let i = 0; i < listWithoutTop.length; i += pageSize) {
    const group = listWithoutTop.slice(i, i + pageSize);
    newsContentArr.value.push(group);
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
  background-color: #F2F1F1;



  .news-title-bg {
    width: 100%;
    height: 30vh;
    background: url("/images/news/news-title.png") no-repeat center center;
    background-size: 100% auto;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 40px;
      font-weight: bold;
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
          object-fit: cover;
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

        .news-top-right-title {
          font-size: 25px;
          font-weight: bold;
          color: #0B44B4;
          margin-bottom: 2vh;
        }

        .news-top-right-name {
          font-size: 16px;
          color: #0B44B4;
          margin-bottom: 2vh;
          line-height: 1.5; // 增加行高提升可读性
        }

        .news-top-right-date {
          font-size: 16px;
          // color: #0B44B4;
          color: #666;

        }
      }
    }
  }

  // 新闻列表容器 
  .news-list-container {
    margin-top: 4vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    // border: 2px solid red;
    margin-bottom: 5vh;
    box-sizing: border-box;

    .news-item-card {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      // border: 2px solid green;
      box-sizing: border-box;


      .news-item-border {
        width: 24%;
        margin-bottom: 2vh;
        background-color: #fff;
        border-radius: 8px;  
        overflow: hidden;
        // padding: 10px;
        height: 34vh;
        // border: 1px solid green;
        cursor: pointer;
        box-sizing: border-box;


        .news-item {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          cursor: pointer;


          .news-item-img {
            width: 100%;
            height: 18vh;
            border-radius: 4px;
            margin-bottom: 8px;
            // border: 1px solid red;
          }

          .news-item-title {
            font-size: 16px;
            font-weight: bold;
            color: #0B44B4;
            height: 5vh;
            // border: 1px solid red;
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
            // border: 1px solid red;
            margin-top: 8px;
            padding: 0 10px;

          }

          .news-item-date {
            font-size: 14px;
            margin-top: 8px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            // border: 1px solid red;
            padding: 0 10px;
            margin-top: 15px;

          }
        }
      }
    }

    // 分页控件样式
    .pagination {
      display: flex;
      align-items: center;
      margin-top: 2vh;
      // border: 2px solid green;

      .page-btn {
        width: 60px;
        height: 30px;
        border: 1px solid #0B44B4;
        background-color: #fff;
        color: #0B44B4;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        margin: 0 5px;

        &:hover:not(:disabled) {
          background-color: #0B44B4;
          color: #fff;
        }

        &:disabled {
          color: #ccc;
          border-color: #ccc;
          cursor: not-allowed;
        }
      }

      .page-info {

        color: #333;
        display: flex;
        align-items: center;

        .page-number {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid #0B44B4;
          background-color: #fff;
          color: #0B44B4;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          margin: 0 5px;
          font-size: 14px;

          &:hover {
            background-color: #618de5;
            color: #fff;
          }

          &.active {
            background-color: #0B44B4;
            color: #fff;
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
