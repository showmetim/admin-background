<template>
  <h1>大文件上传</h1>
  <el-upload
    :auto-upload="false"
    :on-change="handleUpload"
  >
    <el-button type="primary">上传文件</el-button>
  </el-upload>
  <!-- <input type="file" @change="handleUpload"> -->
</template>

<script lang="ts" setup>
import SparkMD5 from 'spark-md5';
import { ref } from 'vue';
import https from '@/utils/request';
import type { UploadFile} from 'element-plus'
const fileName = ref('')
const fileHash = ref('')
const handleUpload = async (uploadFile: UploadFile) => {
  // 读取文件
  const file = uploadFile.raw
  fileName.value = uploadFile.name
  if (!file) return;
  // 文件分片
  const chunks = createChunks(file)
  // 获取文件分片的hash值
  const hash = await calculateHash(chunks)
  fileHash.value = hash as string
  // 上传分片
  uploadChunks(chunks)
  
}
// 分片的每部分大小
const CHUNK_SIZE = 1024 * 1024 * 1; // 1MB
// 文件分片操作
const createChunks = (file: File) => {
  let cur = 0
  // 分片数组
  let chunks = []
  while (cur < file.size) {
    const blob = file.slice(cur, cur + CHUNK_SIZE)
    cur += CHUNK_SIZE
    chunks.push(blob)
  }
  return chunks
}
// 文件HASH值,取分片的第一个和最后一个的全部,剩余切片的前两个,中间两个,后两个字节参与计算
const calculateHash = (fileChunks: Blob[]) => {
  return new Promise((resolve) => {
    // 参与计算的切片
    const chunks: Blob[] = []
    // 计算HASH
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader
    fileChunks.forEach((chunk, index) => {
      if (index === 0 || index === fileChunks.length - 1) {
        chunks.push(chunk)
      } else {
        chunks.push(chunk.slice(0, 2))
        chunks.push(chunk.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        chunks.push(chunk.slice(-2))
      }
    })
    fileReader.readAsArrayBuffer(new Blob(chunks))
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer)
      resolve(spark.end())
    }
  })
}
// 文件分片上传
const uploadChunks = async (chunks: Blob[]) => {
  const data = chunks.map((chunk, index) => {
    return {
      fileHash: fileHash.value,
      chunkHash: fileHash.value + '-' + index,
      chunk
    }
  })
  // 通过formData上传分片
  const formDatas = data.map(item => {
    const formData = new FormData()
    formData.append('fileHash', item.fileHash)
    formData.append('chunkHash', item.chunkHash)
    formData.append('chunk', item.chunk)
    return formData
  })
  // console.log(formDatas);
  const max = 6 //最大并发请求数量
  let index = 0
  const taskPool:any = [] //请求池
  while (index < formDatas.length) {
    const task = https.post('http://localhost:3000/upload', formDatas[index])
    task.then(() => {
      taskPool.splice(taskPool.findIndex((item:any) =>task === item), 1)
    })
    taskPool.push(task)
    if (taskPool.length === max) {
      // 如果到达最大并发请求数量，等待一个请求完成
      await Promise.race(taskPool)
    }
    index++
  }
  await Promise.all(taskPool)
}
</script>