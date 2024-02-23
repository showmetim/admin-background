<template>
  <div>
    {{ moneyFormat }}
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
const props = defineProps({
  money:{
    type:Number,
    default:0
  }
})
const moneyFormat = computed(()=>formatPrice(props.money))
function formatPrice(price:number) {
  if (isNaN(price) || !price) {
    return '0.00'
  }
  const prec = !isFinite(+2) ? 0 : Math.abs(2) // 保留的位数一定是有限位数的正整数
  const s = price.toString().replace(/,/g, '') // 字符串，将，变成'';
  const p = parseFloat(s) // 解析一个字符串，并返回一个浮点数
  const n = isNaN(p) ? 1 : p
  const formatNum = n.toFixed(prec).toString().replace(/(\d)(?=(\d{3})+\.)/g, function (_$0, $1) {
    return $1 + ','
  })
  return price ? formatNum : ''
}


</script>