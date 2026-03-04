<!--
 * @Author: Sid Li
 * @Date: 2026-02-28 15:12:20
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-04 17:26:38
 * @FilePath: \nuxt-free-new\app\components\FooterTwo.vue
 * @Description: 
-->
<template>
  <div class="footer-two-container">

    <div class="footer-two-border">
      <div class="footer-two-left">
        <div>
          <img src="" alt="">
          <div>
            <span>服务热线</span>
            <span>0535-6666657</span>
          </div>
        </div>
        <div>
          <img src="" alt="">
          <div>
            <span>企业地址</span>
            <span>山东烟台市高新区航天路77号</span>
          </div>
        </div>
        <div>
          <img src="" alt="">
          <div>
            <span>企业邮箱</span>
            <span>YTFREEIE@126.com</span>
          </div>
        </div>
        <div>
          <span>关注我们</span>
          <span>扫码关注我们不迷路~</span>

        </div>
      </div>
      <div class="footer-two-right">
        <div>
          <span>产品中心</span>
          <span>运动控制器</span>
          <span>伺服驱动器</span>
          <span>机器人</span>
        </div>

        <div>
          <span>新闻中心</span>
          <span>企业新闻</span>
          <span>行业新闻</span>
        </div>

        <div>
          <span>服务支持</span>
          <span>运动控制器</span>
          <span>IPC控制器</span>
          <span>运动控制PLC</span>
          <span>数控系统</span>
          <span>伺服驱动器</span>
          <span>伺服电机</span>
          <span>IO模块</span>
          <span>HMI</span>
          <span>变频器</span>
          <span>工业安全</span>
        </div>

        <div>
          <span>解决方案</span>
          <span>运动控制器</span>
          <span>IPC控制器</span>
          <span>运动控制PLC</span>
          <span>数控系统</span>
          <span>伺服驱动器</span>
          <span>伺服电机</span>
          <span>IO模块</span>
          <span>HMI</span>
          <span>变频器</span>
          <span>工业安全</span>
        </div>
        <div>
          <span>资料下载</span>
          <span>运动控制器</span>
          <span>IPC控制器</span>
          <span>运动控制PLC</span>
          <span>数控系统</span>
          <span>伺服驱动器</span>
          <span>伺服电机</span>
          <span>IO模块</span>
          <span>HMI</span>
          <span>变频器</span>
          <span>工业安全</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";



onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.footer-two-container {
  width: 100%;
  height: 40vh;
  border: 4px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #181818;

  .footer-two-border {
    width: 60%;
    height: 100%;
    border: 4px solid green;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .footer-two-left {
      width: 40%;
      height: 100%;
      border: 4px solid blue;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .footer-two-right {
      width: 60%;
      height: 100%;
      border: 4px solid yellow;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

  }
}
</style>
