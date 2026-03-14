<!--
 * @Author: Sid Li
 * @Date: 2026-03-05 15:11:36
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-14 16:41:43
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
          <!-- 搜索框 -->
          <el-input v-model="searchText" class="responsive-input" placeholder="请输入文件名搜索...">
            <template #prefix>
              <el-icon class="el-input__icon">
                <search />
              </el-icon>
            </template>
          </el-input>

          <!-- 文件列表区域 -->
          <div class="file-border" ref="fileListRef">
            <!-- 遍历当前页的数据 displayData -->
            <div v-for="item in displayData" :key="item.id" class="file-item" @click="handleDownload(item)">
              <div class="file-item-content">
                <img :src="item.url" alt="file" class="file-item-img" />
                <div class="file-item-name">{{ item.name }}</div>
              </div>
            </div>

            <!-- 空状态提示 -->
            <div v-if="displayData.length === 0" class="empty-state">暂无相关文件</div>
          </div>

          <!-- 分页控件：仅当总页数大于 1 时显示 -->
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
import { ref, onMounted, computed, nextTick, watch } from "vue";
import Navbar from "~/components/normal/Navbar.vue";
import FooterTwo from "@/components/FooterTwo.vue";
import Pagination from "@/components/normal/Pagination.vue"; // 确保路径正确
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const fileListRef = ref(null);

const searchText = ref("");
const fileData = ref([]); // 原始所有数据
const groupedFileData = ref([]); // 处理后的二维数组：[ [第 1 页 15 条], [第 2 页...] ]
const currentPage = ref(1); // 当前页码
const pageSize = 15; // 每页 15 条

// 获取过滤后的原始数据 (支持搜索)
const filteredData = computed(() => {
  if (!searchText.value) {
    return fileData.value;
  }
  return fileData.value.filter((item) =>
    item.name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

// 核心逻辑：根据搜索后的数据重新分组
const processGroups = () => {
  const list = filteredData.value;
  const groups = [];
  for (let i = 0; i < list.length; i += pageSize) {
    groups.push(list.slice(i, i + pageSize));
  }
  groupedFileData.value = groups;

  // 如果切换搜索导致页数变少，且当前页码超出范围，则重置为第 1 页
  if (currentPage.value > groups.length && groups.length > 0) {
    currentPage.value = 1;
  } else if (groups.length === 0) {
    currentPage.value = 1;
  }
};

// 获取当前页展示的数据
const displayData = computed(() => {
  return groupedFileData.value[currentPage.value - 1] || [];
});

// 获取总页数
const totalPages = computed(() => {
  return groupedFileData.value.length;
});

// 监听搜索框变化，自动重置分组和页码
watch(searchText, () => {
  currentPage.value = 1; // 搜索时重置到第一页
  processGroups();
});

// 分页切换函数
const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > totalPages.value) return;
  currentPage.value = pageNum;

  // 翻页后平滑滚动到列表顶部
  nextTick(() => {
    setTimeout(() => {
      const fileListRef = document.querySelector('.down-file-content-border');
      if (fileListRef) {
        fileListRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  });
};

const handleDownload = (item) => {
  console.log("Download:", item);
  // 这里可以添加下载逻辑或跳转
  if (item.urlFile) {
    window.open(item.urlFile, "_blank");
  } else {
    alert(`正在下载：${item.name}`);
  }
};

onMounted(() => {
  // 初始化模拟数据
  fileData.value = [
    { id: 1, name: "Free 1.0.0", url: "/images/down/file.png", urlFile: "" },
    { id: 2, name: "Free 1.0.1", url: "/images/down/file.png", urlFile: "" },
    { id: 3, name: "Free 1.0.2", url: "/images/down/file.png", urlFile: "" },
    { id: 4, name: "Free 1.0.3", url: "/images/down/file.png", urlFile: "" },
    { id: 5, name: "Free 1.0.4", url: "/images/down/file.png", urlFile: "" },
    { id: 6, name: "Free 1.0.5", url: "/images/down/file.png", urlFile: "" },
    { id: 7, name: "Free 1.0.6", url: "/images/down/file.png", urlFile: "" },
    { id: 8, name: "Free 1.0.7", url: "/images/down/file.png", urlFile: "" },
    { id: 9, name: "Free 1.0.8", url: "/images/down/file.png", urlFile: "" },
    { id: 10, name: "Free 1.0.9", url: "/images/down/file.png", urlFile: "" },
    { id: 11, name: "Free 1.0.10", url: "/images/down/file.png", urlFile: "" },
    { id: 12, name: "Free 1.0.11", url: "/images/down/file.png", urlFile: "" },
    { id: 13, name: "Free 1.0.12", url: "/images/down/file.png", urlFile: "" },
    { id: 14, name: "Free 1.0.13", url: "/images/down/file.png", urlFile: "" },
    { id: 15, name: "Free 1.0.14", url: "/images/down/file.png", urlFile: "" },
    { id: 16, name: "Free 1.0.15", url: "/images/down/file.png", urlFile: "" },
    { id: 17, name: "Free 1.0.16", url: "/images/down/file.png", urlFile: "" },
    { id: 18, name: "Free 1.0.17", url: "/images/down/file.png", urlFile: "" },
    { id: 19, name: "Free 1.0.18", url: "/images/down/file.png", urlFile: "" },
    { id: 20, name: "Free 1.0.19", url: "/images/down/file.png", urlFile: "" },
    { id: 21, name: "Free 1.0.20", url: "/images/down/file.png", urlFile: "" },
    { id: 22, name: "Free 1.0.21", url: "/images/down/file.png", urlFile: "" },
    { id: 23, name: "Free 1.0.22", url: "/images/down/file.png", urlFile: "" },
    { id: 24, name: "Free 1.0.23", url: "/images/down/file.png", urlFile: "" },
    { id: 25, name: "Free 1.0.24", url: "/images/down/file.png", urlFile: "" },
    { id: 26, name: "Free 1.0.25", url: "/images/down/file.png", urlFile: "" },
    { id: 27, name: "Free 1.0.26", url: "/images/down/file.png", urlFile: "" },
    { id: 28, name: "Free 1.0.27", url: "/images/down/file.png", urlFile: "" },
    { id: 29, name: "Free 1.0.28", url: "/images/down/file.png", urlFile: "" },
    { id: 30, name: "Free 1.0.29", url: "/images/down/file.png", urlFile: "" },
    { id: 31, name: "Free 1.0.30", url: "/images/down/file.png", urlFile: "" },
  ];

  // 初始化处理
  processGroups();
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
      // height: 100%; // 移除固定高度，让内容自适应
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
        padding: 2vh 4vh 4vh 4vh; // 调整 padding
        box-sizing: border-box;

        .file-border {
          width: 100%;
          min-height: 40vh; // 给一个最小高度防止抖动
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
    /* 模拟边框 */
  }
}
</style>
