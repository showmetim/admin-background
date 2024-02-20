<template>
  <div>
    <header>
      <Header></Header>
    </header>
    <div class="main">
      <aside>
        <Aside></Aside>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import Aside from '@/components/Aside/index.vue'

</script>

<style lang="less" scoped>
  header {
    height: 60px;
  }
  .main {
    display: flex;
    height: calc(100vh - 60px);
    aside {
      width: 200px;
    }
  }
</style>