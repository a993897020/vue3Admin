/*
 * @Author: 关振俊
 * @Date: 2022-06-17 15:50:47
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-27 15:30:00
 * @Description: 
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import router, { resetRoute } from '../router'

function getSession(key: string): string {
	let json: any = window.sessionStorage.getItem(key)
	return JSON.parse(json)
}

export const PATH_URL: string = import.meta.env.VITE_API_URL

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: PATH_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' }
})

// 添加请求拦截器
service.interceptors.request.use(
	(config: any) => {
		if (getSession('token')) {
			config.headers.common['Authorization'] = getSession('token')
		}
		return config
	},
	(error: AxiosError) => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		const res = response.data
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001) {
				window.sessionStorage.clear() // 清除浏览器全部临时缓存
				router.push('/login') // 去登录页面
				resetRoute() // 删除/重置路由
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => { })
					.catch(() => { })
			}
			return Promise.reject(service.interceptors.response)
		} else {
			return response.data
		}
	},
	(error: AxiosError) => {
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时')
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误')
		} else {
			ElMessage.error(error.message)
		}
		return Promise.reject(error)
	}
)

export default service
