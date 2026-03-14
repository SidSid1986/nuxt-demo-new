<template>
  <div class="table-container">
    <table class="data-table">
      <tbody>
        <!-- 第 1 行 (奇数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner "><span class="num table-title">参数</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner "><span class="num table-title">参数值</span> </div>
          </td>
        </tr>

        <!-- 第 2 行 (偶数 - 背景色 #F6F6F8) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">型号</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.robotName }}</span> </div>
          </td>
        </tr>

        <!-- 第 3 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">轴数</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.switchNum }}</span> </div>
          </td>
        </tr>

        <!-- 第 4 行 (偶数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">最大负载</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.maxWeight }}</span> </div>
          </td>
        </tr>

        <!-- 第 5 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">最大臂展</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.maxArmSpan }}</span> </div>
          </td>
        </tr>

        <!-- 第 6 行 (偶数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">重复定位精度</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.perprecision }}</span> </div>
          </td>
        </tr>

        <!-- 第 7 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">本体重量</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.weight }}</span> </div>
          </td>
        </tr>

        <!-- 第 8 行 (偶数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">防护等级</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.IP }}</span> </div>
          </td>
        </tr>

        <!-- 第 9 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">安装形式</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.insType }}</span> </div>
          </td>
        </tr>

        <!-- 第 10 行 (偶数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">驱动方式</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.driveType }}</span> </div>
          </td>
        </tr>

        <!-- 第 11 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">安装条件</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.insRequire }}</span> </div>
          </td>
        </tr>

        <!-- 第 12 行 (偶数) -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">支持认证</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.authSupport }}</span> </div>
          </td>
        </tr>

        <!-- 第 13 行 -->
        <tr class="table-row">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">备注</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ tableData.remark }}</span> </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

const props = defineProps({
  detailPram: {
    type: Object,
    default: () => ({})
  }
});

const tableData = ref({});


watch(
  () => props.detailPram,
  (newVal) => {

    tableData.value = newVal;
  },
  { immediate: true, deep: true }
);


onMounted(() => {
  console.log('组件挂载了');
});
</script>

<style scoped lang="scss">
.table-container {
  width: 100%;
  height: 100%;
  border: 1px solid #F6F6F8;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.data-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border: 1px solid #E8E8E8;

  .table-row {
    height: 5vh;

    &:nth-child(even) {
      background-color: #F5F5F5;
    }
  }

  .table-cell {
    border: 1px solid #E8E8E8;
    width: 50%;
    padding: 0 10px;
    vertical-align: middle;
    color: #333;
    font-size: 14px;


    .cell-inner {
      display: flex;
      align-items: center;
      gap: 8px;

      .num {
        // font-weight: bold;
        font-family: "SourceHanSansCN-Regular";
        // color: #16418a;
        min-width: 20px;
      }

      .text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.table-title {
  font-family: "SourceHanSansCN-Bold" !important;
}
</style>