import { defineStore } from 'pinia'

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