import { defineStore } from 'pinia'
import https from '@/utils/request.ts'

export const useCounterStore = defineStore('main', {
  state: () => {
    return {
      userRouter:[]
    }
  },
  actions: {
    async setRouter(val:any) {
      this.userRouter = val
    }
  },
})