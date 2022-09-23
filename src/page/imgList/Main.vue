<!--
 * @Author: 关振俊
 * @Date: 2022-07-01 15:50:32
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-20 11:45:46
 * @Description: 
-->
<template>
  <div class="imgList-wrap" v-loading="loading">
    <div class="demo-image__lazy">
      <el-image v-for="(url, i) in urls" :key="i" :src="url" lazy />
    </div>
  </div>
</template>
<script  lang='ts' setup >
import Mock, { Random } from "mockjs";
import { onMounted, ref } from "vue";
import { onPending } from "utils/tools";
const urls: any = ref([]);
const loading: any = ref(true);
onMounted(() => {
  onPending(1000).then(() => {
    const imgList = Mock.mock({
      "data|20": [Random.image()],
    });
    console.log(imgList);
    urls.value = [...imgList.data];
    loading.value = false;
  });
});
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
.imgList-wrap {
  width: 100%;
  min-height: 60vh;
}
</style>