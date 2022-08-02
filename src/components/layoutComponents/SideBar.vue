<!--
 * @Author: 关振俊
 * @Date: 2022-07-19 16:04:42
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-22 15:32:21
 * @Description: 左菜单
-->
<template>
  <el-aside class="left-menu">
    <div class="left-menu-logo">logo</div>
    <div class="flex-grow" />
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
      <template v-for="(item, i) in routerList" :key="i">
        <el-menu-item :index="item.link" :key="i" v-if="!item.children">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span v-text="item.name"></span>
          </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.link">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item
            v-for="(c, ci) in item.children"
            :index="item.link + c.link"
            :key="i + ci"
            v-text="c.name"
          ></el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script lang='ts' setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  HomeFilled,
  Setting,
  EditPen,
  Grid,
} from "@element-plus/icons-vue";
const routerList = [
  { name: "首页", link: "/dashboard", icon: HomeFilled },
  {
    name: "信息管理",
    link: "/infoManagement",
    icon: Location,
    children: [{ name: "信息列表", link: "/allInfo" }],
  },
  { name: "图片列表", link: "/imgList", icon: HomeFilled },
  { name: "在线签名", link: "/signCanvas", icon: EditPen },
  { name: "合并单元格", link: "/cellMerge", icon: Grid },
];

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
<style scoped lang="scss">
.left-menu {
  width: 200px;
  min-height: 100vh;
  background: #545c64;
  overflow: hidden;
  .left-menu-logo {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-right: solid 1px var(--el-menu-border-color);
  }
}
</style>