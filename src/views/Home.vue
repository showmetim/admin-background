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
        <Tags></Tags>
        <div class="routerBox">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import Aside from '@/components/Aside/index.vue'
import Tags from '@/components/Tags/index.vue'
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
    main{
      width: calc(100vw - 200px);
    }
  }
</style>