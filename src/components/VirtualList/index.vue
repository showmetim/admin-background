<template>
  <div class="scroll-box" ref="scrollBox" @scroll="handleScroll"
  :style="{ height: scrollHeight + 'px' }">
      <div class="virtual-list" :style="{ paddingTop: paddingTop + 'px', paddingBottom: paddingBottom + 'px' }">
          <div v-for="(item, index) in visibleItems" :key="index" :style="{ height: itemHeight + 'px' }">
              <slot name="item" :item="item" :index="index"></slot>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed,onMounted,onUnmounted } from 'vue'
const props = defineProps({
  listData: { type: Array, default: () => [] },
  itemHeight: { type: Number, default: 50 },
  scrollHeight: { type: Number, default: 300 },
})


const visibleCount = Math.ceil(props.scrollHeight / props.itemHeight) + 1   // 可见区域的行数
const start = ref(0)
const end = computed(() => Math.min(start.value + 2 * visibleCount - 1,renderData.value.length))
const paddingTop = computed(() => start.value * props.itemHeight)
const renderData = ref([...props.listData])
const paddingBottom = computed(() => (renderData.value.length - end.value) * props.itemHeight)
const visibleItems = computed(() => renderData.value.slice(start.value, end.value))
const scrollBox:any = ref(null);
let lastIndex = start.value;

const handleScroll = rafThrottle(() => {
  onScrolling();
});

const onScrolling = () => {
  const scrollTop = scrollBox.value.scrollTop;    // 滚动高度
  let thisStartIndex = Math.floor(scrollTop / props.itemHeight);
  const isSomeStart = thisStartIndex == lastIndex;
  if (isSomeStart) return;
  const isEndIndexOverListLen = thisStartIndex + 2 * visibleCount - 1 >= renderData.value.length;
  if (isEndIndexOverListLen) {
      thisStartIndex = renderData.value.length - (2 * visibleCount - 1);
  }
  lastIndex = thisStartIndex;
  start.value = thisStartIndex;
}

function rafThrottle(fn: { (): void; apply?: any; }) {
  let lock = false;
  return function (...args: any) {
      if (lock) return;
      lock = true;
      window.requestAnimationFrame(() => {
          fn.apply(args);
          lock = false;
      });
  };
}

onMounted(() => {
  scrollBox.value.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  scrollBox.value.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
.virtual-list {
  position: relative;
}
.scroll-box {
  overflow-y: auto;
}
</style>