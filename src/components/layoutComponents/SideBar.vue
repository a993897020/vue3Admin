<!--
 * @Author: 关振俊
 * @Date: 2022-07-19 16:04:42
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-02 09:23:00
 * @Description: 左菜单
-->
<template>
  <el-aside
    class="left-menu"
    :style="{ width: props.isCollapse ? '63px' : '200px' }"
  >
    <div class="left-menu-logo">
      <el-icon color="#409eff" @click="() => router.push('/')" :size="36"
        ><ElemeFilled
      /></el-icon>
    </div>
    <div class="flex-grow" />
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b"
      :default-active="router.currentRoute.value.path"
      class="el-menu-vertical-demo"
      :collapse="props.isCollapse"
      :default-openeds="routerList.map((p) => p.link)"
    >
      <template v-for="(item, i) in routerList" :key="i">
        <el-menu-item :index="item.link" :key="i" v-if="!item.children">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>
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
  Location,
  HomeFilled,
  EditPen,
  Grid,
  ChatLineRound,
  Rank,
  ElemeFilled,
  UploadFilled,
  Search,
  WindPower,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const props = defineProps({
  isCollapse: Boolean,
});
const router = useRouter();
const routerList = [
  {
    name: "信息管理",
    link: "/infoManagement",
    icon: Location,
    children: [{ name: "信息列表", link: "/allInfo" }],
  },
  { name: "图片列表", link: "/imgList", icon: HomeFilled },
  { name: "在线签名", link: "/signCanvas", icon: EditPen },
  { name: "合并单元格", link: "/cellMerge", icon: Grid },
  { name: "聊天室", link: "/chatRoom", icon: ChatLineRound },
  { name: "流程图", link: "/tree", icon: Rank },
  { name: "上传文件", link: "/upload", icon: UploadFilled },
  { name: "查找关键字", link: "/searchKeyword", icon: Search },
  { name: "你输我做", link: "/youInputMyDo", icon: WindPower },
];
</script>
<style scoped lang="scss">
.left-menu {
  width: 200px;
  min-height: 100vh;
  background: #545c64;
  overflow: hidden;
  transition: all 0.3s;
  .left-menu-logo {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    .el-icon {
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .el-menu-vertical-demo {
    border: 0;
  }
  .el-menu--collapse {
    width: 100% !important;
  }
}
</style>