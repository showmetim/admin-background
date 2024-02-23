<template>
  <div class="homePage">
    <h1>Beyond limits, shaping the future</h1>
    <h2>{{ nowTime }}</h2>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const nowTime = ref('')
nowTime.value = new Date().toLocaleString()
</script>

<style lang="less" scoped>
.homePage {
  height: 100%;
  width: 100%;
  background: url('@/assets/bg.png');
  h1 {
    font-size: 40px;
    text-align: center;
    padding-top: 15%;
  }
}
</style>