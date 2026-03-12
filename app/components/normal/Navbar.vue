<!--
 * @Author: Sid Li
 * @Date: 2025-10-24 10:04:15
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-12 15:25:57
 * @FilePath: \nuxt-free-new\app\components\normal\Navbar.vue
 * @Description: 
-->
<!-- app/components/Navbar.vue -->
<template>
  <div class="nav-container">
    <div class="nav-logo">
      <img @click="backToHome" src="/logo.png" alt="logo" class="nav-logo-img">
    </div>

    <div class="link-text-content">
      <NuxtLink v-for="(item, index) in tabList" :key="item.name" :to="item.link" class="link-text"
        @click="handleClick(index, item)">
        <span :class="{ active: activeIndex === index }"> {{ item.name }}</span>
      </NuxtLink>
    </div>

    <div class="nav-empty"></div>
  </div>
</template>
<script setup>

import { ref, onMounted, } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const tabList = [
  {
    name: "首页",
    link: "/",
  },
  {
    name: "产品中心",
    link: "/product",
  },
  {
    name: "新闻中心",
    link: "/news",
  },
  {
    name: "服务支持",
    link: "/service",
  },
  {
    name: "解决方案",
    link: "/solution",
  },
  // {
  //   name: "联系我们",
  //   link: "/contact",
  // },
  {
    name: "资料下载",
    link: "/download",
  },
  {
    name: "关于我们",
    link: "/about",
  },
];

const activeIndex = ref(-1);



const backToHome = () => {
  router.push("/");
};



const handleClick = (index, item) => {
  activeIndex.value = index;
  console.log(item.name);
};

onMounted(() => {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  tabList.forEach((item, index) => {
    if (item.link === currentPath) {
      activeIndex.value = index;
    }
  });
});
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #3C4045;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-height: 6vh;

  .nav-logo {
    width: 30%;
    height: 100%;
    // border: 2px solid green;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .nav-logo-img {
      width: 100px;
      height: 35px;
      cursor: pointer;
      // border: 1px solid red;
    }
  }

  .link-text-content {
    height: 100%;
    width: 40%;
    // border: 2px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .link-text {
      color: #FFFFFF;
      font-size: 16px;
      font-family: "SourceHanSansCN-Bold";
    }
  }

  .nav-empty {
    width: 30%;
    height: 100%;
    // border: 2px solid blue;

  }

  @media screen and (max-width: 768px) {
    width: 100%;

    .nav-logo {
      width: 20%;
    }

    .link-text-content {
      width: 80%;
    }

    .nav-empty {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    .nav-logo {
      width: 20%;
    }

    .link-text-content {
      width: 80%;
    }

    .nav-empty {
      display: none;
    }
  }

  @media screen and (max-width: 408px) {
    width: 100%;

    // border: 1px solid red;

    .nav-logo {
      display: none;
    }

    .link-text-content {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .nav-empty {
      display: none;
    }
  }
}

.active {
  color: #2E9DA4;
}
</style>
