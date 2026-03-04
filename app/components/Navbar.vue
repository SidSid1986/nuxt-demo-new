<!--
 * @Author: Sid Li
 * @Date: 2025-10-24 10:04:15
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-03 16:16:04
 * @FilePath: \nuxt-free-new\app\components\Navbar.vue
 * @Description: 
-->
<!-- app/components/Navbar.vue -->
<template>
  <div class="nav-container">
    <div class="nav-logo">
      <img src="/logo.png" alt="logo" class="nav-logo-img">
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
const tabList = [
  {
    name: "首页",
    link: "/",
  },
  {
    name: "产品中心",
    link: "/",
  },
  {
    name: "新闻中心",
    link: "/",
  },
  {
    name: "服务支持",
    link: "/",
  },
  {
    name: "解决方案",
    link: "/",
  },
  {
    name: "联系我们",
    link: "/",
  },
  {
    name: "资料下载",
    link: "/",
  },
];

const activeIndex = ref(0);

const handleClick = (index, item) => {
  activeIndex.value = index;
  console.log(item.name);
};
</script>

<style lang="scss" scoped>
.nav-container {
  background-color: #3C4045;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 5vh;

  .nav-logo {
    width: 33%;
    height: 100%;
    border: 2px solid green;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .nav-logo-img {
      width: 100px;
      height: 35px;
      border: 1px solid red;
    }
  }

  .link-text-content {
    height: 100%;
    width: 33%;
    border: 2px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .link-text {
      color: #FFFFFF;
      font-size: 14px;
    }
  }

  .nav-empty {
    width: 33%;
    height: 100%;
    border: 2px solid blue;
  }
}

.active {
  color: #2E9DA4;
}
</style>
