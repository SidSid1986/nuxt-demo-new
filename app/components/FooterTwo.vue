<!--
 * @Author: Sid Li
 * @Date: 2026-02-28 15:12:20
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-14 15:16:41
 * @FilePath: \nuxt-free-new\app\components\FooterTwo.vue
 * @Description: 
-->
<template>
  <div class="footer-two-container">
    <div class="footer-two-border">
      <div class="footer-two-left">
        <div class="left-line">
          <img src="/images/tel.png" alt="" />
          <div class="left-line-text">
            <span>服务热线</span>
            <span>0535-6666657</span>
          </div>
        </div>
        <div class="left-line">
          <img src="/images/location.png" alt="" />
          <div class="left-line-text">
            <span>企业地址</span>
            <span>山东烟台市高新区航天路77号</span>
          </div>
        </div>
        <div class="left-line">
          <img src="/images/mail.png" alt="" />
          <div class="left-line-text">
            <span>企业邮箱</span>
            <span>YTFREEIE@126.com</span>
          </div>
        </div>
        <div class="left-line-follow">
          <!-- <el-popover placement="right" :width="200" trigger="click"> -->
          <!-- <el-popover placement="right" :width="200">
            <template #reference>
              <div class="left-line-follow-border">
                <span>关注我们</span>
                <span>扫码关注我们不迷路~</span>
              </div>
            </template>
<img src="/images/code.jpg" alt="">
</el-popover> -->

          <div class="left-line-follow-border-code">
            <div class="code-left">
              <span>关注我们</span>
              <span>扫码关注我们不迷路~</span>
            </div>
            <img src="/images/code.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="footer-two-right">
        <div class="right-line">
          <span class="right-line-title">产品中心</span>
          <span class="right-line-item" @click="goSportProduct()">运动控制器</span>
          <span class="right-line-item">伺服驱动器</span>
          <span class="right-line-item " @click="goRobotProduct()">机器人</span>
        </div>

        <div class="right-line">
          <span class="right-line-title">新闻中心</span>
          <span class="right-line-item" @click="goNews()">企业行业新闻</span>
          <!-- <span class="right-line-item">企业新闻</span>
          <span class="right-line-item">行业新闻</span> -->
        </div>

        <div class="right-line">
          <span class="right-line-title">服务支持</span>
          <span class="right-line-item" @click="goDownload()">资料下载</span>
          <!-- <span class="right-line-item">运动控制器</span>
          <span class="right-line-item">IPC控制器</span>
          <span class="right-line-item">运动控制PLC</span>
          <span class="right-line-item">数控系统</span>
          <span class="right-line-item">伺服驱动器</span>
          <span class="right-line-item">伺服电机</span>
          <span class="right-line-item">IO模块</span>
          <span class="right-line-item">HMI</span>
          <span class="right-line-item">变频器</span>
          <span class="right-line-item">工业安全</span> -->
        </div>

        <div class="right-line">
          <span class="right-line-title">解决方案</span>
          <span class="right-line-item" @click="goIndustrySolution()">行业解决方案</span>
          <!-- <span class="right-line-item">运动控制器</span>
          <span class="right-line-item">IPC控制器</span>
          <span class="right-line-item">运动控制PLC</span>
          <span class="right-line-item">数控系统</span>
          <span class="right-line-item">伺服驱动器</span>
          <span class="right-line-item">伺服电机</span>
          <span class="right-line-item">IO模块</span>
          <span class="right-line-item">HMI</span>
          <span class="right-line-item">变频器</span>
          <span class="right-line-item">工业安全</span> -->
        </div>
        <!-- <div class="right-line">
          <span class="right-line-title">资料下载</span>
          <span class="right-line-item">运动控制器</span>
          <span class="right-line-item">IPC控制器</span>
          <span class="right-line-item">运动控制PLC</span>
          <span class="right-line-item">数控系统</span>
          <span class="right-line-item">伺服驱动器</span>
          <span class="right-line-item">伺服电机</span>
          <span class="right-line-item">IO模块</span>
          <span class="right-line-item">HMI</span>
          <span class="right-line-item">变频器</span>
          <span class="right-line-item">工业安全</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";


import { useRouter } from "vue-router";

const router = useRouter();

const goSportProduct = () => {
  router.push('/sportProduct');
};

const goRobotProduct = () => {
  router.push('/product');
};

const goNews = () => {
  router.push('/news');
};

const goDownload = () => {
  router.push('/download');
};

const goIndustrySolution = () => {
  router.push('/solution');
};



onMounted(() => {
  console.log("组件挂载了");
});
</script>

<style scoped lang="scss">
.footer-two-container {
  width: 100%;
  min-height: 50vh;
  // border: 4px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #181818;



  .footer-two-border {
    width: 60%;
    height: 100%;
    // border: 4px solid green;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    color: #fff;

    @media screen and (max-width: 1200px) {
      width: 100%;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 100%;

    }

    @media screen and (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }

    .footer-two-left {
      width: 25%;
      height: 100%;
      // border: 4px solid blue;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding-top: 5vh;

      @media screen and (max-width: 480px) {
        width: 100%;
      }


      .left-line {
        width: 100%;

        // border: 4px solid pink;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 3vh;

        img {
          width: 25px;
          height: 25px;
        }

        .left-line-text {
          margin-left: 10px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          :first-child {
            font-size: 12px;
            font-family: "SourceHanSansCN-Regular";

          }

          :last-child {
            font-size: 16px;
            font-weight: bold;
            font-family: "SourceHanSansCN-Bold";
          }
        }
      }

      .left-line-follow {
        width: 100%;
        // border: 4px solid pink;

        .left-line-follow-border {
          width: 200px;
          height: 80px;
          background-color: #16418a;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 20px;
          cursor: pointer;

          :first-child {
            font-weight: bold;
            font-size: 16px;
          }

          :last-child {
            font-size: 12px;
          }
        }

        .left-line-follow-border:hover {
          background-color: #2e64c2;
        }

        .left-line-follow-border-code {
          width: 260px;
          height: 120px;
          background-color: #16418a;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          padding: 0 20px;

          .code-left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            :first-child {
              font-weight: bold;
              font-size: 16px;
            }

            :last-child {
              font-size: 12px;
            }
          }

          img {
            width: 100px;
            height: 100px;
          }
        }

        .left-line-follow-border-code:hover {
          background-color: #2e64c2;
          scale: 1.3;
        }

      }
    }

    .footer-two-right {
      width: 60%;
      height: 100%;
      // border: 4px solid yellow;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      justify-items: center;
      align-items: flex-start;



      @media screen and (max-width: 768px) {
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: 480px) {
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
      }



      .right-line {
        width: 100%;
        height: 100%;
        // border: 4px solid pink;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: 5vh;



        .right-line-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 3vh;
          font-family: "SourceHanSansCN-Bold";
        }

        .right-line-item {
          font-size: 12px;
          margin-bottom: 1vh;
          cursor: pointer;
          font-family: "SourceHanSansCN-Medium";

        }

        .right-line-item:hover {
          color: #2e64c2;
        }
      }
    }
  }
}
</style>
