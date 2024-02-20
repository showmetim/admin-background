import { createRouter, createWebHashHistory } from "vue-router";
import {getRouters} from '@/utils/MenuFetch'
const _import = (path:string) => () => import(`@/views/${path}.vue`)

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/homepage",
    component: _import('Home'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function addPath(routers:any) {
  routers.forEach((item: any) => {
    if(item.component !== 'Layout') {
      router.addRoute('Home', { path: item.path, component: _import(item.component) })
    }
    if(item.children?.length) {
      addPath(item.children)
    }
  })
}

const setupRouterHooks = async()  => {
	// 首先调用接口获取菜单列表并处理成需要的路由数组
	const routerData = await getRouters()
  addPath(routerData)
	router.beforeEach(async(_to, _from, next) => {
    next()
	})
}

export const setupRouter = async (app:any) => {
  // 路由钩子函数
  await setupRouterHooks()
  app.use(router)
}
