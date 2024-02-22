import { defineStore } from 'pinia'

export const useCounterStore = defineStore('main', {
  state: () => {
    return {
      // 路由信息
      userRouter:[],
      // 路由标签tags
      routerTags:[] as any,
    }
  },
  actions: {
    async setRouter(val:any) {
      this.userRouter = val
    },
    setRouterTags(tags:any) {
      this.routerTags.push(tags)
    },
    setTagActive(path:string) {
      this.routerTags.forEach((item:any) => {
        if (item.path === path) {
          item.active = true
        }else {
          item.active = false
        }
      })
    },
    removeTag(path:string) {
      this.routerTags  = this.routerTags.filter((item:{path:string}) => item.path !== path)
      const active = this.routerTags.some((tag: { active: boolean }) => tag.active)
      if(!active) {
        this.routerTags[this.routerTags.length-1].active = true
      }
      return active
    }
  },
})