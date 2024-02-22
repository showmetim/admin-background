import { createRouter, createWebHashHistory } from "vue-router";
import {getRouters} from '@/utils/MenuFetch'
import pinia from '@/store/piniaInstance';
import {useCounterStore} from '@/store/index'
const useStore = useCounterStore(pinia)
const modules = import.meta.glob('../views/**/**/*.vue')

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/homepage",
    children:[],
    component: modules[`../views/Home.vue`],
  },
  {
    path:'/login',
    name:'Login',
    component: modules[`../views/Login/index.vue`],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function addPath(routers:any) {
  routers.forEach((item: any) => {
    if(item.component !== 'Layout') {
      router.addRoute('Home', { path: item.path, component:modules[`../views/${item.component}.vue`]})
    }
    if(item.children?.length) {
      addPath(item.children)
    }
  })
}

const setupRouterHooks = async()  => {
	// 首先调用接口获取菜单列表并处理成需要的路由数组
	const routerData = await getRouters()
  useStore.setRouter(routerData)
  await addPath(routerData)
	router.beforeEach(async(_to, _from, next) => {
    next()
	})
}

export const setupRouter = async (app:any) => {
  // 路由钩子函数
  await setupRouterHooks()
  app.use(router)
}
