<!--
 * @Author: 关振俊
 * @Date: 2022-09-27 16:22:31
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-02 09:22:56
 * @Description: 选择头像弹框
-->
<template>
  <el-dialog
    v-model="showDialog"
    title="选择头像"
    width="30%"
    :before-close="handleClose"
  >
    <el-scrollbar height="300px">
      <div class="img-list">
        <div
          :class="['img-item', selectAvatar === item ? 'active' : '']"
          v-for="(item, index) in avatarList"
          :key="index"
          @click="selectAvatar = item"
        >
          <el-image style="width: 100px; height: 100px" :src="item" />
        </div>
      </div>
    </el-scrollbar>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirmAvatar">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang='ts' setup>
import {
  onMounted,
  Ref,
  ref,
  ComponentInternalInstance,
  getCurrentInstance,
} from "vue";
import { ElMessage } from "element-plus";
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const api = appContext.config.globalProperties.$api;

const avatarList: Ref<any[]> = ref([]);
const selectAvatar: Ref<string> = ref("");
defineProps({
  showDialog: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["closeDialog", "confirm"]);
const handleClose = () => {
  emit("closeDialog");
};
const confirmAvatar = () => {
  if (!selectAvatar.value) return ElMessage.warning("请选择一个帅气的头像");
  emit("confirm", selectAvatar);
  handleClose();
};
const getAvatar = () => {
  api.get("/getAllAvatar").then((res: any) => {
    const imgApi = "http://localhost:3050/picture/";
    const list = res.map((p: string) => imgApi + p);
    avatarList.value = list;
  });
};
onMounted(() => {
  getAvatar();
});
</script>
<style scoped lang="scss">
.img-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;
  .active {
    background: #ecf5ff;
  }
  .img-item {
    width: 100px;
    height: 100px;
    cursor: pointer;
    transition: all 0.5s;
    box-sizing: border-box;
    margin-right: 10px;
    margin-bottom: 10px;
    &:hover {
      background: #ecf5ff;
    }
  }
}
</style>