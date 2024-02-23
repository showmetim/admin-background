import https from '@/utils/request'
import { ref } from 'vue'

export function useTable(url:string,params?:any) {
  const tableData = ref([])
  const loadData = async () => {
    const rext = await https.get(url,params)
    tableData.value = rext.data.data 
  }  
  // 初始加载数据  
  loadData()
  return {  
    tableData,
    loadData, // 可以选择是否暴露这个方法来手动重新获取数据  
  }  
}
  
