/*
 * @Author: 关振俊
 * @Date: 2022-06-17 15:33:07
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 15:34:48
 * @Description: 
 */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import type { App } from 'vue'
import { resolve } from 'path'

// InjectionKey 将store安装到Vue应用程序时提供类型,将类型传递InjectionKey给useStore方法
// 手动声明 state 类型
export interface State {
	count: number,
	routerList:any[]
}

// 定义注入类型
const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
	state() {
		return {
			count: 0,
			routerList:[
				{
					name:'首页',
					path:'/',
					fullPath:'/'
				}
			],
		}
	},
	mutations: {
		increment(state: State) {
			state.count++
		},
		SET_ROUTERLIST(state:State,data){
			if(data.name==='首页') return
			state.routerList.push(data)
		},
		DEL_ROUTER_ITEM(state:State,data){
			state.routerList=state.routerList.filter(p=>!(p.name===data.name))
		}
	},
	actions:{
		setRouterList({commit,state},data){
			 new Promise((resolve)=>{
				commit('SET_ROUTERLIST',data)
				resolve(data)
			})
		},
		delRouterItem({commit,state},data){
			new Promise((resolve)=>{
				commit('DEL_ROUTER_ITEM',data)
				resolve(data)
			}) 
		}
	}
})

// 将类型注入useStore，似乎无效
export function useStore() {
	return baseUseStore(key)
}

export function setupStore(app: App<Element>) {
	app.use(store, key)
}

export default store
