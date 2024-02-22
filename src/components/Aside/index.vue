<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    :default-active="defaultActive"
    text-color="#fff"
    :router="true"
    @select="handleSelect"
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
import { useRouter } from 'vue-router';
import {reactive,ref,watch} from 'vue'
const useStore = useCounterStore()
// 获取路由信息
let routers:any = reactive([])
useStore.userRouter.forEach(item => {
  routers.push(item)
})
const router = useRouter()
const defaultActive = ref(router.currentRoute.value.path)

watch(() => router.currentRoute.value.path,(newValue) => {
  defaultActive.value = newValue
})

const handleSelect = (path: string) => {
  const pathName = matchPath(path,routers)
  const obj = {path,pathName}

  if(useStore.routerTags.find((item: { path: string; }) => item.path === path)) {
    useStore.setTagActive(path)
  }else {
    useStore.setRouterTags(obj)
    useStore.setTagActive(path)
  }
}

// 匹配路由名称
const matchPath = (path:string,arr:any[]) => {
  for(const item of arr) {
    if(item.children?.length) {
      const foundName = matchPath(path,item.children) as string
      if(foundName) {
        return foundName
      }
    }else if(item.path === path) {
      return item.name
    }
  }
}
handleSelect(router.currentRoute.value.path)
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  width: 100%;
}
</style>
