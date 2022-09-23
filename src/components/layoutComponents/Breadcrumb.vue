
<!--
 * @Author: 关振俊
 * @Date: 2022-09-13 17:41:32
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-14 11:00:20
 * @Description: 菜单面包屑
-->
<template>
  <el-breadcrumb separator="/" class="breadcrumb-list">
    <el-breadcrumb-item
      :to="{ path: item.path }"
      v-for="(item, i) in routeInfo.matched"
      :key="i"
    >
      <span v-if="item.name">{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang='ts' setup>
import { watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router: any = useRouter();
const routeInfo: any = ref({});
onMounted(() => {
  routeInfo.value = router.currentRoute.value;
});
watch(
  () => router.currentRoute.value.path,
  () => {
    routeInfo.value = router.currentRoute.value;
  }
);
</script>
<style scoped>
.breadcrumb-list {
  line-height: 50px;
}
</style>