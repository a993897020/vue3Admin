<!--
 * @Author: 关振俊
 * @Date: 2022-06-21 15:57:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-22 15:29:17
 * @Description: 
-->
<template>
  <div class="container-box">
    <el-container direction="vertical">
      <!-- 头部 -->
      <el-container class="main-wrap">
        <SideBar></SideBar>
        <!-- 左菜单 -->
        <el-container class="content-wrap">
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script  lang="ts" setup>
import { ref } from "vue";
import SideBar from "./layoutComponents/SideBar.vue";
// import HelloWorldVue from "./HelloWorld.vue";
</script>
<style lang="scss" scoped>
@import "styles/colorMixins.scss";
@import "styles/mixins.scss";
.container-box {
  height: 100vh;
  overflow-y: scroll;
}
.layout-header {
  position: fixed;
  top: 0;
  left: 200px;
  width: calc(100% - 216px);
  padding: 0;
  z-index: 2;
}
.main-wrap {
  // margin-top: 58px;
}
.flex-grow {
  flex-grow: 1;
}

.el-menu-vertical-demo {
  height: 100%;
}

.el-menu--horizontal {
  border: 0;
}
</style>