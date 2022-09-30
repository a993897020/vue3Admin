<!--
 * @Author: 关振俊
 * @Date: 2022-09-19 17:50:51
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-26 11:26:08
 * @Description: 
-->
<template>
  <div></div>
</template>
<script  lang='ts' setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  // console.log(router);
  const route = router.currentRoute.value;
  router.replace({ path: `/${route.params.path}`, query: route.query });
});
</script>
<style scoped>
</style>