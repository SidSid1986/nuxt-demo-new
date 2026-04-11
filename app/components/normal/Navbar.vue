<!-- app/components/Navbar.vue -->
<template>
  <div class="nav-container">
    <div class="nav-logo">
      <img @click="backToHome" src="/logo.png" alt="logo" class="nav-logo-img">
    </div>

    <div class="link-text-content">
      <div v-for="(item, index) in tabList" :key="item.name" class="nav-item-wrapper"
        :class="{ 'has-dropdown': item.name === '产品中心' }">

        <!-- 主菜单项 -->

        <div class="link-text" @click="handleClick(index, item)">
          <span :class="{ active: activeIndex === index }">{{ item.name }}</span>
        </div>

        <!--  产品中心 下拉菜单 -->
        <div v-if="item.name === '产品中心'" class="dropdown-menu">
          <div class="dropdown-item" @click="handleSubClick('/product')">机器人</div>
          <div class="dropdown-item" @click="handleSubClick('/sportProduct')">运动控制器</div>
          <!-- <div class="dropdown-item" @click="handleSubClick('/product')">伺服驱动器</div> -->

        </div>
      </div>
    </div>

    <div class="nav-empty"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();  

const tabList = [
  { name: "首页", link: "/" },
  { name: "产品中心", link: "/product" },
  { name: "新闻中心", link: "/news" },
  { name: "服务支持", link: "/service" },
  { name: "解决方案", link: "/solution" },
  { name: "资料下载", link: "/download" },
  { name: "关于我们", link: "/about" },
];

const activeIndex = ref(-1);

// 回首页
const backToHome = () => {
  router.push("/");
};

// 点击主菜单
const handleClick = (index, item) => {
  activeIndex.value = index;
  router.push(item.link);
};

// 点击子菜单
const handleSubClick = (path) => {
  const productIndex = tabList.findIndex(i => i.name === '产品中心');
  activeIndex.value = productIndex;
  router.push(path);
};

const setActiveIndex = () => {
  const path = route.path.toLowerCase()
  tabList.forEach((item, index) => {
    if (path.includes(item.link.toLowerCase())) {
      activeIndex.value = index
    }
  })
}

onMounted(() => {
  setActiveIndex();
});


watch(
  () => route.path,
  () => {
    setActiveIndex();
  }
);
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #3C4045;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-height: 6vh;
  position: relative;

  .nav-logo {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .nav-logo-img {
      width: 100px;
      height: 35px;
      cursor: pointer;
    }
  }

  .link-text-content {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .nav-item-wrapper {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;


      &:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }

      .link-text {
        cursor: pointer;
        color: #FFFFFF;
        font-size: 16px;
        font-family: "SourceHanSansCN-Bold";
        white-space: nowrap;
        padding: 0 5px;
        user-select: none;

        box-sizing: border-box;

        height: auto;
        line-height: normal;
      }

      .dropdown-menu {
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%) translateY(-5px);

        background-color: #3C4045;
        min-width: 140px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 4px 4px;
        padding: 8px 0;
        z-index: 1000;

        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);


        &::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          width: 100%;
          height: 10px;
          background: transparent;

        }

        //  三角 
        &::after {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid #3C4045;
          z-index: 1001;
        }

        .dropdown-item {
          padding: 10px 16px;
          color: #FFFFFF;
          font-size: 14px;
          font-family: "SourceHanSansCN-Regular", sans-serif;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
          white-space: nowrap;
          text-align: center;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #2E9DA4;
          }
        }
      }
    }
  }

  .nav-empty {
    width: 30%;
    height: 100%;
  }
}

.active {
  color: #2E9DA4;
}
</style>