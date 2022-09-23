<!--
 * @Author: 关振俊
 * @Date: 2022-06-21 15:57:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-20 11:46:38
 * @Description: 
-->
<template>
  <div class="container-box">
    <el-container direction="vertical">
      <!-- 头部 -->
      <el-container class="main-wrap">
        <!-- 左菜单 -->
        <SideBar :isCollapse="isCollapse"></SideBar>
        <el-container>
          <el-header class="header-wrap">
            <div class="header-left">
              <div class="menu-collapse" @click="handleMenuCollapse">
                <el-icon :size="20">
                  <Fold v-if="isCollapse" />
                  <Expand v-else></Expand>
                </el-icon>
              </div>
              <Breadcrumb></Breadcrumb>
            </div>
            <div class="toolbar">
              <el-dropdown>
                <el-icon style="margin-right: 8px"><setting /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>View</el-dropdown-item>
                    <el-dropdown-item>Add</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <span>Tom</span>
            </div>
          </el-header>
          <Tags></Tags>
          <el-container class="content-wrap">
            <el-main class="content-main">
              <el-scrollbar class="content-scroll">
                <router-view v-slot="{ Component, route }">
                  <keep-alive :include="tags">
                    <component
                      :is="Component"
                      :key="route.fullPath"
                    ></component>
                  </keep-alive>
                </router-view>
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script  lang="ts" setup>
import SideBar from "./layoutComponents/SideBar.vue";
import Breadcrumb from "./layoutComponents/Breadcrumb.vue";
import Tags from "./layoutComponents/Tags.vue";
import { Setting, Fold, Expand } from "@element-plus/icons-vue";
import { computed, Ref, ref, watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const isCollapse: any = ref(false);
const handleMenuCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
// const key = computed(() => router.currentRoute.value.path);
// const tags = computed(() => store.state.routerList);
const tags: Ref<any[]> = ref([]);
watch(
  [() => store.state.routerList, () => router.currentRoute.value],
  ([list, route]) => {
    console.log({ list, route });
    tags.value = store.state.routerList.map((p) => p.name);
    console.log(tags.value);
  }
);
</script>
<style lang="scss" scoped>
@import "styles/colorMixins.scss";
@import "styles/mixins.scss";
.container-box {
  height: 100vh;
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
.container-box .el-header {
  position: relative;
  background-color: #fff;
  // border-bottom: 1px solid #000;
  box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.2);
}
.container-box .el-menu {
  border-right: none;
}
.container-box .el-main {
  padding: 0;
}
.container-box .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  margin-right: 15px;
}
.content-wrap {
  height: calc(100vh - 50px);
  .content-main .content-scroll {
    padding: 20px;
  }
}
.header-wrap {
  height: 50px;
  text-align: right;
  font-size: 12px;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0;
}
.menu-collapse {
  height: 100%;
  padding: 0 15px;
  line-height: 62px;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.header-left {
  display: flex;
  align-items: center;
}
</style>