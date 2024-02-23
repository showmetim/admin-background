<template>
  <div class="btns">
    <h1>自定义按钮权限</h1>
    <el-button type="primary" v-has-show="'user:create'">创建</el-button>
    <el-button type="primary" v-has-show="'user:edit'">编辑</el-button>
    <el-button type="primary" v-has-show="'user:delete'">删除</el-button>
   </div>
</template>

<script lang="ts" setup>
import { vHasShow} from '@/utils/permission'
</script>