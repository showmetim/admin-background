<template>
  <div class="tableBox">
    <el-table
    :data="tableData"
    border
    row-key="id"
    @selection-change="handleSelectionChange"
    :reserve-selection="true"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="70" />
      <el-table-column prop="userName" label="姓名" min-width="90" />
      <el-table-column prop="telphone" label="联系方式" min-width="190" />
      <el-table-column prop="orderNumber" label="订单号" min-width="190" />
      <el-table-column label="订单金额" min-width="90">
        <template #default="{row}">
          <Money :money="row.orderAmount"></Money>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" min-width="90">
        <template #default="{row}">
          <el-tag :type="row.orderStatus ? 'primary' : 'warning'">{{ row.orderStatusText }}</el-tag>
        </template>
        </el-table-column>
      <el-table-column prop="orderTime" label="订单时间" min-width="190" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {useTable} from '@/hooks/useTable'
import Money from '@/components/Money/index.vue'
const { tableData } = useTable('http://localhost:3000/orderlist')
const multipleSelection = ref<[]>([])
const handleSelectionChange = (val:[]) => {
  multipleSelection.value = val
  console.log(multipleSelection.value);
  
}
</script>

<style lang="less" scoped>
.tableBox {
  width: 100%;
}
</style>