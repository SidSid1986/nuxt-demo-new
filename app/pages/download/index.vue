<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-31 09:02:28
 * @FilePath: \nuxt-free-new\app\pages\download\index.vue
 * @Description: 增加列表分页功能 (每组 15 个) + 搜索过滤
-->
<template>
  <div class="index-container">
    <div class="nav-container">
      <Navbar />
    </div>

    <div class="down-container">
      <div class="down-bg"><span>资料下载</span></div>

      <div class="down-file-content-border">
        <div class="down-file-content">

          <el-input v-model="searchText" class="responsive-input" placeholder="请输入文件名搜索...">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input>

          <!-- 文件列表区域 -->
          <div class="file-border" ref="fileListRef">

            <!-- 现在直接遍历 fileData -->
            <div v-for="item in fileData" :key="item.id" class="file-item" @click="handleDownload(item)">
              <div class="file-item-content">
                <img :src="item.url" alt="file" class="file-item-img" />
                <div class="file-item-name">{{ item.original_name }}</div>
              </div>
            </div>

            <!-- 空状态  -->
            <div v-if="fileData.length === 0" class="empty-state">暂无相关文件</div>
          </div>

          <div class="pagination-wrapper">
            <Pagination :totalPages="totalPages" :currentPage="currentPage" @changePage="changePage" />
          </div>
        </div>
      </div>
    </div>

    <div class="footer-two">
      <FooterTwo />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue"; // 1. 引入 computed
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue";
import { Search } from "@element-plus/icons-vue";
import { fileListApi } from "@/server/common";
import fileIcon from "/images/down/file.png";

const searchText = ref("");
const fileData = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const total = ref(0); // 存储后端返回的总记录数

// 2. 计算总页数
const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize);
});

// 监听搜索框变化
watch(searchText, () => {
  currentPage.value = 1;
  fetchFileData();
});

// 分页切换
const changePage = (newPageNum) => {
  // 增加边界检查，防止越界
  if (newPageNum >= 1 && newPageNum <= totalPages.value) {
    currentPage.value = newPageNum;
    fetchFileData();
  }
};

// 获取数据
const fetchFileData = async () => {

  const res = await fileListApi(currentPage.value, pageSize);

  if (res.code === 200) {

    // 处理文件图标
    res.data.forEach(item => {
      item.url = item.url || fileIcon;
    });
    fileData.value = res.data;
    total.value = res.total || 0;

    console.log("当前页数据:", fileData.value);
    console.log("总条数:", total.value, "总页数:", totalPages.value);
  };
};

const handleDownload = (fileItem) => {
  const link = document.createElement('a');
  link.href = fileItem.file_path;
  link.download = fileItem.original_name || 'downloaded_file';
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  await fetchFileData();
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

  .down-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .down-bg {
      width: 100%;
      height: 35vh;
      background: url("/images/down/downBg.png") no-repeat center center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        font-size: 40px;
        color: #fff;
        font-weight: bold;
        font-family: "SourceHanSansCN-Bold";
      }
    }

    .down-file-content-border {
      width: 70%;

      min-height: 60vh;
      // border: 1px solid red;
      padding: 4vh;
      box-sizing: border-box;

      .down-file-content {
        width: 100%;
        min-height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #f2f1f1;
        padding: 2vh 4vh 4vh 4vh;
        box-sizing: border-box;

        .file-border {
          width: 100%;
          min-height: 40vh;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-gap: 20px;
          margin-bottom: 2vh;

          // 响应式调整列数
          @media (max-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
          }

          @media (max-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
          }

          @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
          }

          @media (max-width: 400px) {
            grid-template-columns: 1fr;
          }

          .file-item {
            width: 100%;
            height: 20vh;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 16px;
            padding: 2vh;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            }

            .file-item-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
            }

            .file-item-img {
              width: 50px;
              height: 50px;
              margin-bottom: 10px;
              object-fit: contain;
            }

            .file-item-name {
              font-size: 14px;
              color: #333;
              text-align: center;
              font-family: "SourceHanSansCN-Regular";
              word-break: break-all;
              line-height: 1.4;
            }
          }

          .empty-state {
            grid-column: 1 / -1;
            width: 100%;
            text-align: center;
            padding: 50px 0;
            color: #999;
            font-size: 16px;
          }
        }

        .pagination-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 2vh;
        }
      }
    }
  }

  .nav-container,
  .footer-two {
    width: 100%;
  }
}

.responsive-input {
  width: 300px;
  margin-bottom: 2vh;
  --el-input-focus-border-color: #16418a;
  --el-input-border-color: #16418a;

  :deep(.el-input__inner:hover) {
    color: #16418a;
  }

  :deep(.el-input__inner:focus) {
    color: #16418a;
  }

  :deep(.el-input__inner::placeholder) {
    color: #16418a;
  }

  :deep(.el-input__inner) {
    height: 30px;
    color: #16418a;
    font-size: 16px;
  }

  :deep(.el-input__wrapper) {
    background-color: transparent;
    border-radius: 16px !important;
    box-shadow: 0 0 0 1px #16418a inset;

  }
}
</style>
