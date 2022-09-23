<!--
 * @Author: 关振俊
 * @Date: 2022-06-28 10:53:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-08-30 15:20:55
 * @Description: 首页
-->
<template>
  <div class="game-container">
    <!-- <el-button type="primary" @click="socketShakeHands">握手</el-button> -->
    home
  </div>
</template>

<script lang='ts' setup>
const socketShakeHands = () => {
  console.log("shake handing...");
};
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