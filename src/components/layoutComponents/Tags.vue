<!--
 * @Author: 关振俊
 * @Date: 2022-09-14 11:02:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 15:33:52
 * @Description: 多标签页
-->
<template>
  <div class="tags-wrap">
    <div class="tags-list">
      <div
        :class="[
          'tags-item',
          item.name === activeRoute.name ? 'tag-item-active' : '',
        ]"
        v-for="(item, index) in routerList"
        :key="index"
        @click="changeTags(item)"
      >
        <span>{{ item.name }}</span>
        <el-icon @click.stop="delTags(item, index)" v-if="item.name !== '首页'">
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, Ref, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { Close } from "@element-plus/icons-vue";
const route = useRouter();
const store = useStore();
const routerList: Ref<any[]> = ref([]);
const activeRoute: Ref<any> = ref(null);
onMounted(() => {
  setTagData();
});
watch(
  () => route.currentRoute.value,
  () => {
    setTagData();
  }
);
const setTagData = () => {
  if (!route.currentRoute.value.name) return;
  if (routerList.value.some((p) => p.name === route.currentRoute.value.name)) {
    activeRoute.value = route.currentRoute.value;
  } else {
    store.dispatch("setRouterList", route.currentRoute.value).then(() => {
      routerList.value = store.state.routerList || [];
      activeRoute.value = route.currentRoute.value;
    });
  }
};
const changeTags = (item: any) => {
  if (item.name === activeRoute.value.name) return;
  route.replace(`/redirect${item.fullPath}`);
};
const delTags = (item: any, index: number) => {
  store.dispatch("delRouterItem", item).then(() => {
    if (item.name === activeRoute.value.name) {
      changeTags(routerList.value[index - 1]);
    }
    routerList.value = store.state.routerList;
  });
};
</script>
<style scoped lang="scss">
.tags-wrap {
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  .tags-list {
    display: flex;
    .tags-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 120px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #ccc;
      margin-right: 10px;
      padding: 0 10px;
      border-radius: 6px;
      .el-icon {
        &:hover {
          background: #000;
          color: #fff;
          border-radius: 50%;
          padding: 3px;
        }
      }
    }
    .tag-item-active {
      background: #000;
      color: #fff;
      .el-icon {
        &:hover {
          background: #fff;
          color: #000;
        }
      }
    }
  }
}
</style>