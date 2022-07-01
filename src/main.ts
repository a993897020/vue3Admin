/*
 * @Author: 关振俊
 * @Date: 2022-06-17 10:23:42
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-06-17 16:34:13
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store' // 状态管理
import router, { setupRouter } from './router' // 路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SvgIcon from './components/SvgIcon/index.vue'


const app = createApp(App)

app.component('svg-icon', SvgIcon)

app.use(ElementPlus)

setupRouter(app) // 引入路由

setupStore(app) // 引入状态管理

router.isReady().then(() => {
	app.mount('#app')
})