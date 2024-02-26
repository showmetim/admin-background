<template>
  <VirtualList v-if="listData.length > 0"
     :listData="listData" :itemHeight="50" :scrollHeight="600">
      <template #item="{ item }">
        <div class="list-item">
          {{  item }}
        </div>
      </template>
  </VirtualList>
</template>

<script lang="ts" setup>
import VirtualList from '@/components/VirtualList/index.vue';

import { onMounted, ref } from 'vue';
let listData:any = ref([]);
// 模拟从 API 获取数据
const fetchData = async () => {
  // 这里可以替换成您实际的 API 请求
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      const newData = Array.from({ length: 200 }, (_, index) => `Item ${index}`);
      listData.value = newData;
      resolve();
    }, 500);
  })
}

onMounted(() => {
   fetchData();
});
</script>
<style scoped>
.list-item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
</style>