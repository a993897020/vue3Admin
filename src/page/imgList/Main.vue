<!--
 * @Author: 关振俊
 * @Date: 2022-07-01 15:50:32
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-07 16:52:32
 * @Description: 
-->
<template>
  <div class="imgList-wrap">
    <div class="demo-image__lazy">
      <el-image v-for="(url, i) in urls" :key="i" :src="url" lazy />
    </div>
  </div>
</template>
<script lang='ts' setup>
import Mock, { Random } from "mockjs";
const imgList = Mock.mock({
  "data|20": [Random.image()],
});
console.log(imgList);
const urls: any[] = [...imgList.data];
</script>
<style scoped>
.demo-image__lazy {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
  margin-right: 4px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>