/*
 * @Author: 关振俊
 * @Date: 2022-06-17 15:48:17
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 11:47:31
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from 'comps/HelloWorld.vue'
import allInfo from '@/page/info/allInfo.vue'
import Infomation from '@/page/info/infomation.vue'
import dashboard from '@/page/dashboard.vue'
import NotFound from '@/page/NotFound.vue'
import Layout from 'comps/Layout.vue'
import SignCanvas from 'comps/SignCanvas/index.vue'
import imgList from '@/page/imgList/Main.vue'
import chatroom from '@/page/chatroom/NewMain.vue'
import tree from '@/page/tree/Main.vue'
import redirect from 'comps/Redirect.vue'
import { App } from 'vue'

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path:'/redirect',
			component:Layout,
			children:[
				{
					path: "/redirect/:path(.*)",
					component: redirect
				  }
			]
		},
		{
			name:"首页",
			path: '/',
			redirect: '/dashboard',
			component: Layout,
			children: [
				{
					name:"首页",
					path: '/dashboard',
					component: dashboard,
				},
				{
					name:"测试",
					path: '/test',
					component: HelloWorld
				},
				{
					name:"图片列表",
					path: '/imgList',
					component: imgList
				},
				{
					name:"信息管理",
					path: '/infoManagement',
					component: Infomation,
					redirect:'/infoManagement/allInfo',
					children: [
						{ name:'信息列表',path: '/infoManagement/allInfo', component: allInfo }
					]
				},
				{
					name:'在线签名',
					path: '/signCanvas',
					component: SignCanvas
				},
				{
					name:'合并单元格',
					path: '/cellMerge',
					component: ()=>import('@/components/CellMerge.vue')
				},
				{
					name:'聊天室',
					path:'/chatRoom',
					component:chatroom
				},
				{
					name:'流程图',
					path:'/tree',
					component:tree
				}
			]
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
