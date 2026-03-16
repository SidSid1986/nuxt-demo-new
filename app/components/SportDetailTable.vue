<template>
  <div class="table-container">
    <table class="data-table">
      <tbody>
        <!-- 第 2 行  -->
        <tr class="table-row" v-for="(item, index) in sportPramArr" :key="item.id">
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ item.lineName }}</span> </div>
          </td>
          <td class="table-cell">
            <div class="cell-inner"><span class="num">{{ item.lineValue }}</span> </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

const sportPramArr = ref([]);

const props = defineProps({
  sportPram: {
    type: Object,
    default: () => ({})
  }
});

const tableData = ref({});


watch(
  () => props.sportPram,
  (newVal) => {

    sportPramArr.value = newVal;
    console.log(sportPramArr.value);
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

    &:first-child {
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
      justify-content: center;
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