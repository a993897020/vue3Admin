/*
 * @Author: 关振俊
 * @Date: 2022-06-17 15:48:17
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-01 16:11:54
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import allInfo from '../page/info/allInfo.vue'
import Infomation from '../page/info/infomation.vue'
import dashboard from '../page/dashboard.vue'
import NotFound from '../page/NotFound.vue'
import Layout from '../components/Layout.vue'
import SignCanvas from '../components/SignCanvas/index.vue'
import imgList from '../page/imgList/Main.vue'
import { App } from 'vue'

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',
			redirect: '/dashboard',
			component: Layout,
			children: [
				{
					path: '/dashboard',
					component: dashboard
				},
				{
					path: '/test',
					component: HelloWorld
				},
				{
					path: '/imgList',
					component: imgList
				},
				{
					path: '/infoManagement',
					component: Infomation,
					children: [
						{ path: '/infoManagement/allInfo', component: allInfo }
					]
				},
			]
		},
		{
			path: '/signCanvas',
			component: SignCanvas
		},
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, },
	]
})

// 删除/重置路由
export function resetRoute(): void {
	router.getRoutes().forEach(route => {
		const { name } = route
		if (name) {
			router.hasRoute(name) && router.removeRoute(name)
		}
	})
}

export function setupRouter(app: App<Element>) {
	app.use(router)
}
export default router
