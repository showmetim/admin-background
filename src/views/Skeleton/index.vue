<template>
  <el-space direction="vertical" alignment="flex-start">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%"  />
          </div>
        </div>
      </template>
      <template #default>
        <div>显示</div>
      </template>
    </el-skeleton>
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import https from '../../utils/request'
const loading = ref(true)
https.get('http://localhost:3000/skeleton').then(() => {
  loading.value = false
})
</script>
