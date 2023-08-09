<!--
 * @Author: 关振俊
 * @Date: 2022-06-28 10:53:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-29 11:45:35
 * @Description: 首页
-->
<template>
  <div class="game-container">
    <p :contenteditable="true">home</p>
    <animationText :texts="['花里胡哨文字渐出渐入']"></animationText>
    <test></test>
  </div>
</template>

<script lang='ts' setup>
import animationText from "@/components/animationText.vue";
import test from "@/components/Test.vue";
</script>
<style scoped lang="scss">
.game-container {
  width: 100%;
  height: 100%;
  .player {
    display: inline-block;
  }
}
</style>