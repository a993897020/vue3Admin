<!--
 * @Author: 关振俊
 * @Date: 2022-06-21 16:10:57
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-01 16:24:36
 * @Description: 
-->
<template>
  <div id="app">
    <!-- <Layout></Layout> -->
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
// import Layout from "./Layout.vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  // console.log(router);
});
</script>
<style scoped>
.app-container {
  height: 100vh;
  overflow-y: auto;
}
</style>