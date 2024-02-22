<template>
  <div class="tagMain">
    <el-tag @click="tagClick(item.path)" @close="closeTag(item.path)" effect="dark" v-for="item in store.routerTags" :key="item.path" closable :type="item.active ? 'success' : 'primary'"  >
      <span >{{ item.pathName }}</span>
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import {useCounterStore} from '@/store'
import {useRouter} from 'vue-router'
const store = useCounterStore()
const router = useRouter()
const tagClick = (path: string) => {
  store.setTagActive(path)
  router.push(path)
}
const closeTag = (path: string) =>{
  const active = store.removeTag(path)
  if(!active) {
    router.push(store.routerTags[store.routerTags.length - 1].path)
  }
}
</script>

<style lang="less" scoped>
.tagMain{
  width: 100%;
  border-bottom: 1px solid #eee;
}
  .el-tag{
    margin: 5px;
    cursor: pointer;
  }
</style>