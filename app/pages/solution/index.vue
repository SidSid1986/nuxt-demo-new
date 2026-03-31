<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 15:21:01
 * @FilePath: \nuxt-free-new\app\pages\solution\index.vue
 * @Description: 
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="solution-title-bg">
      <span> 解决方案</span>
    </div>

    <div class="solution-title">行业解决方案</div>

    <div class="solution-group">

      <div v-for="(item, index) in groupData" :key="item.id" class="solution-item" @click="selectItem(item, index)"
        :class="{ 'active-item': index == solutionIndex }">
        <img :src="index == solutionIndex ? item.icon2 : item.icon1" alt="" />
        <span :class="{ 'active-text': index == solutionIndex }">{{ item.name }}</span>
      </div>
    </div>

    <div class="solution-title">工艺应用解决方案</div>
    <div class="solution-img-group">
      <div v-for="(item, index) in groupImgData" @click="selectPic(item, index)" :key="item.id"
        class="solution-img-item" :class="{ 'active-img': index == imgIndex }">
        <div class="solution-img">
          <img :src="index == imgIndex ? item.cover1 : item.cover2" alt="" />
          <span class="img-text">
            {{ item.industry_name }}
          </span>
          <div class="name-line"></div>
        </div>
      </div>
    </div>
    <Pagination :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />

    <div class="footer-two">
      <FooterTwo />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import { useRouter } from "vue-router";
import FooterTwo from "@/components/FooterTwo.vue";
import { industriesList, solutionList } from "@/server/common";
import Pagination from "@/components/normal/Pagination.vue";

const router = useRouter();

const solutionIndex = ref(0);

const imgIndex = ref(0);


const currentPage = ref(1);
const pageSize = ref(6);
const total = ref(0);
 

const fid = ref(0);
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

const groupData = ref([
  // {
  //   id: 1,
  //   name: "汽车行业",
  //   icon1: "/images/solution/car1.png",
  //   icon2: "/images/solution/car2.png",
  // },
  // {
  //   id: 2,
  //   name: "电子行业",
  //   icon1: "/images/solution/ele1.png",
  //   icon2: "/images/solution/ele2.png",
  // },
  // {
  //   id: 3,
  //   name: "锂电行业",
  //   icon1: "/images/solution/battery1.png",
  //   icon2: "/images/solution/battery2.png",
  // },
  // {
  //   id: 4,
  //   name: "光伏行业",
  //   icon1: "/images/solution/sun1.png",
  //   icon2: "/images/solution/sun2.png",
  // },
  // {
  //   id: 5,
  //   name: "金属加工",
  //   icon1: "/images/solution/metal1.png",
  //   icon2: "/images/solution/metal2.png",
  // },
  // {
  //   id: 6,
  //   name: "建材加工",
  //   icon1: "/images/solution/build1.png",
  //   icon2: "/images/solution/build2.png",
  // },
  // {
  //   id: 7,
  //   name: "包装物流",
  //   icon1: "/images/solution/box1.png",
  //   icon2: "/images/solution/box2.png",
  // },
  // {
  //   id: 8,
  //   name: "一般工业",
  //   icon1: "/images/solution/nor1.png",
  //   icon2: "/images/solution/nor2.png",
  // },
  // {
  //   id: 9,
  //   name: "钢铁行业",
  //   icon1: "/images/solution/st1.png",
  //   icon2: "/images/solution/st2.png",
  // },
  // {
  //   id: 10,
  //   name: "家电行业",
  //   icon1: "/images/solution/app1.png",
  //   icon2: "/images/solution/app2.png",
  // },
  // {
  //   id: 11,
  //   name: "食品烟酒",
  //   icon1: "/images/solution/smoke1.png",
  //   icon2: "/images/solution/smoke2.png",
  // },
]);

const groupImgData = ref([
  // {
  //   id: 11,
  //   name: "折弯解决方案",
  //   img1: "/images/solution/zhewan1.png",
  //   img2: "/images/solution/zhewan2.png",
  //   fid: 1,
  // },
  // {
  //   id: 22,
  //   name: "张力控制解决方案",
  //   img1: "/images/solution/zhangli1.png",
  //   img2: "/images/solution/zhangli2.png",
  //   fid: 1,
  // },
  // {
  //   id: 33,
  //   name: "压铸解决方案",
  //   img1: "/images/solution/yazhu1.png",
  //   img2: "/images/solution/yazhu2.png",
  //   fid: 1,
  // },
  // {
  //   id: 44,
  //   name: "码垛解决方案",
  //   img1: "/images/solution/maduo1.png",
  //   img2: "/images/solution/maduo2.png",
  //   fid: 1,
  // },
  // {
  //   id: 55,
  //   name: "焊接解决方案",
  //   img1: "/images/solution/hanjie1.png",
  //   img2: "/images/solution/hanjie2.png",
  //   fid: 1,
  // },
  // {
  //   id: 66,
  //   name: "打磨解决方案",
  //   img1: "/images/solution/damo1.png",
  //   img2: "/images/solution/damo2.png",
  //   fid: 1,
  // },

]);

const selectItem = (item, index) => {
  solutionIndex.value = index;
  fid.value = item.id;
  getSolutionList();
};

const selectPic = (item, index) => {
  imgIndex.value = index;
  console.log(item);
  router.push(`/solution/solutionDetail?fid=${item.fid}&id=${item.id}`);
};

const getIndustriesList = async () => {
  const res = await industriesList();

  groupData.value = res.data || [];
  console.log(groupData.value);
  fid.value = res.data[0].id;

};

const getSolutionList = async () => {
  const params = {
    page: currentPage.value,
    page_size: pageSize.value,
    fid: fid.value || undefined,
    keyword: '',
    only_active: false // 是否只查启用的，根据需求调整
  };

  const res = await solutionList(params);
  total.value = res.total || 0;
  console.log(totalPages.value);

  groupImgData.value = res.data  || [];
  console.log(groupImgData.value);

   console.log("总条数:", total.value, "总页数:", totalPages.value);
};

const changePage = (newPageNum) => {
  // 增加边界检查，防止越界
  if (newPageNum >= 1 && newPageNum <= totalPages.value) {
    currentPage.value = newPageNum;
    getSolutionList();
  }
};



onMounted(async () => {
  await getIndustriesList();
  await getSolutionList();
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

  .solution-title-bg {
    width: 100%;
    height: 30vh;
    background: url("/images/solution/solutionBg.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      font-size: 40px;
      color: #16418a;
      font-family: "SourceHanSansCN-Bold";
      margin-left: 20%;
    }
  }

  .solution-title {
    // border: 1px solid red;
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-family: "SourceHanSansCN-Regular";
    margin: 6vh 0 1vh 0;
  }

  .solution-group {
    width: 70%;
    height: 100%;
    // border: 2px solid yellow;
    padding: 2vh 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    justify-items: center;
    align-items: flex-start;

    @media screen and (max-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
    }


    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .solution-item {
      cursor: pointer;
      height: 12vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f8;
      box-sizing: border-box;
      border: 2px solid transparent;

      img {
        width: auto;
        height: 35px;
        margin-right: 10px;
      }

      span {
        // border: 1px solid red;
        display: inline-block;
        font-size: 22px;
        font-family: "SourceHanSansCN-Medium";
      }

      .active-text {
        color: #16418a;
      }
    }

    .active-item {
      border: 2px solid #16418a;
    }
  }

  .solution-img-group {
    width: 70%;
    height: 100%;

    // border: 2px solid yellow;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    justify-items: center;
    align-items: center;
    // margin-bottom: 6vh;

    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }



    .solution-img-item {
      cursor: pointer;
      height: 40vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f8;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .solution-img {
        // border: 2px solid yellow;
        height: 100%;
        width: 100%;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          margin-right: 10px;
        }

        .img-text {
          width: 100%;
          position: absolute;
          top: 40px;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          color: #fff;
          font-size: 22px;
          font-family: "SourceHanSansCN-Bold";
          text-align: center;
          line-height: 20px;
        }

        .name-line {
          position: absolute;
          width: 60px;
          height: 15px;
          border-radius: 20px;
          background-color: #fff;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
        }


      }



    }

    .active-item {
      border: 2px solid #16418a;
    }
  }



  .nav-container,
  .footer-one,
  .footer-two {
    width: 100%;
  }


}
</style>
