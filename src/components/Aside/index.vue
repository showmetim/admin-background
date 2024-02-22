<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="/homepage"
    text-color="#fff"
    :router="true"
  >
    <template v-for="item in routers" :key="item.name">
      <el-sub-menu v-if="item.children?.length" :index="item.path">
        <template #title>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="son in item.children" :key="son.name" :index="son.path">
          <span>{{ son.name }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.path">
        <span>{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/store';
import {reactive} from 'vue'
const useStore = useCounterStore()
// 获取路由信息
let routers:any = reactive([])
useStore.userRouter.forEach(item => {
  routers.push(item)
})
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
</style>
