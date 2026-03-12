<!--
 * @Author: Sid Li
 * @Date: 2026-03-11 17:28:25
 * @LastEditors: Sid Li
 * @LastEditTime: 2026-03-12 09:34:28
 * @FilePath: \nuxt-free-new\app\components\normal\Pagination.vue
 * @Description: 
-->
<template>
  <div class="container">
    <!-- 分页控件   -->
    <div class="pagination">
      <button class="page-btn" @click="changePage(1)" :disabled="currentPage === 1">
        首页
      </button>
      <button class="page-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        上一页
      </button>

      <span class="page-numbers">
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
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, onUpdated, onBeforeUpdate, onUnmounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue';

// 分页组件
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['changePage']);

const changePage = (page) => {
  emit('changePage', page);
};



onMounted(() => {
  console.log('组件挂载了');
});

</script>

<style scoped lang="scss">
// 分页样式
.pagination {
  display: flex;
  align-items: center;
  margin-top: 4vh;
  margin-bottom: 4vh;

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
    font-size: 14px;

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

  .page-numbers {
    display: flex;
    align-items: center;

    .page-number {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: #fff;
      color: #0B44B4;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      margin: 0 5px;
      font-size: 14px;

      &:hover {
        background-color: #eef4ff;
      }

      &.active {
        background-color: #0B44B4;
        color: #fff;
      }
    }
  }
}
</style>
