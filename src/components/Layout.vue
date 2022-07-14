<!--
 * @Author: 关振俊
 * @Date: 2022-06-21 15:57:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-07 17:40:37
 * @Description: 
-->
<template>
  <div class="container-box">
    <el-container direction="vertical">
      <!-- 头部 -->
      <el-header class="layout-header">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">LOGO</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-header>

      <el-container class="main-wrap">
        <!-- 左菜单 -->
        <el-aside class="left-menu">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            :router="true"
            active-text-color="#ffd04b"
            default-active="dashboard"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="/dashboard">
              <template #title>
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-sub-menu index="infoManagement">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>信息管理</span>
              </template>
              <el-menu-item index="/infoManagement/allInfo"
                >item one</el-menu-item
              >
              <el-menu-item index="1-2">item one</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/imgList">
              <template #title>
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>图片列表</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
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
import {
  Document,
  Menu as IconMenu,
  Location,
  HomeFilled,
  Setting,
} from "@element-plus/icons-vue";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
@import "../styles/colorMixins.scss";
@import "../styles/mixins.scss";
.container-box {
  height: 100vh;
  overflow-y: scroll;
}
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 16px);
  padding: 0;
  z-index: 2;
}
.main-wrap {
  margin-top: 58px;
}
.flex-grow {
  flex-grow: 1;
}

.el-menu-vertical-demo {
  height: 100%;
}

.left-menu {
  width: 200px;
  height: calc(100vh - 58px);
  position: fixed;
  left: 0;
  top: 58px;
}
.content-wrap {
  margin-left: 200px;
}

.el-menu--horizontal {
  border: 0;
}
</style>