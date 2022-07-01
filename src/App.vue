<!--
 * @Author: 关振俊
 * @Date: 2022-06-17 10:23:42
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-06-28 14:13:55
 * @Description: 
-->
<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
	<!-- <HelloWorld ref="hw" msg="Hello Vue 3 + TypeScript + Vite" />
	<svg-icon iconClass="bug"></svg-icon>
	<button @click="addCount">count is: {{ count }}</button>
	<el-button @click="handleUpdateSonData">按钮</el-button> -->
	<Home></Home>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { useStore } from './store/index'
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'

// console.log('import----', import.meta.env);
export default defineComponent({
	name: 'App',
	components: {
		HelloWorld, Home
	},
	setup() {
		const data = ref('hello world')
		const store = useStore()

		const count: any = computed({
			get() {
				return store.state.count
			},
			set(value) {
				store.commit('increment', value)
			}
		})

		function addCount() {
			count.value += 1
		}
		provide('data', data)
		function handleUpdateSonData() {
			// console.log(hw)
		}

		return {
			count,
			addCount,
			handleUpdateSonData
		}
	}
})
</script>

<style>
@import "./styles/index.scss";

* {
	margin: 0;
	padding: 0;
}
</style>

