<!--
 * @Author: 关振俊
 * @Date: 2022-07-22 16:05:47
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-22 16:10:59
 * @Description: 滑动加载
-->
<template>
  <div class="box">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted } from "vue";
onMounted(() => {
  window.addEventListener("scroll", handleScroll, true);
});

let timer: any = null;
let flag = false;
function handleScroll() {
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollHeight - clientHeight - scrollTop < 20) {
    if (!flag) {
      debounce(() => {
        console.log({ scrollTop, scrollHeight, clientHeight });
        flag = true;
        setTimeout(() => {
          const div = document.createElement("div");
          div.className = "item";
          const box: any = document.querySelector(".box");
          box.append(div);
          flag = false;
        }, 300);
      }, 500)();
    }
  }
}
function debounce(fn: () => void, delay: number) {
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
</script>
<style scoped>
.box {
  width: 200px;
  height: 500px;
}
.item {
  width: 100%;
  height: 200px;
  background: #ccc;
  margin-bottom: 10px;
}
</style>