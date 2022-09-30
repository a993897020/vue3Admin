<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 11:43:53
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-27 17:22:43
 * @Description: 登录聊天室
-->
<template>
  <div class="join-form">
    <el-input
      v-model.trim="username"
      input-style="width:200px;"
      placeholder="请输入昵称"
      @keydown.enter="confirmUsername"
    >
      <template #prepend>
        <div style="cursor: pointer; height: 30px">
          <el-button
            v-if="!userAvatar"
            @click="() => (showSelectAvatarDialog = true)"
            >选择头像</el-button
          >
          <el-avatar
            v-else
            :size="30"
            :src="userAvatar"
            @click="() => (showSelectAvatarDialog = true)"
          />
        </div>
      </template>
      <template #append>
        <el-button type="primary" @click="confirmUsername">加入聊天</el-button>
      </template>
    </el-input>
    <el-tooltip content="温馨提示：有50%概率随机中英文昵称" effect="customized">
      <el-button
        type="primary"
        :style="{ marginLeft: '200px' }"
        @click="randomName"
        >随机昵称</el-button
      >
    </el-tooltip>
    <select-avatar-dialog
      :showDialog="showSelectAvatarDialog"
      @closeDialog="() => (showSelectAvatarDialog = false)"
      @confirm="confirmAvatar"
    ></select-avatar-dialog>
  </div>
</template>
<script lang='ts' setup>
import { ref, defineEmits, Ref, onMounted } from "vue";
import { Random } from "mockjs";
import SelectAvatarDialog from "./joinChat/selectAvatarDialog.vue";
import { ElMessage } from "element-plus";
const username: Ref<string> = ref("");
const userAvatar: Ref<string> = ref("");
const showSelectAvatarDialog: Ref<boolean> = ref(false);
interface IChatUser {
  username: string;
  avatar: string;
}
interface IEmit {
  (e: "setUserName", userData: IChatUser): void;
}
const emit = defineEmits<IEmit>();
/**登录用户 */

const confirmUsername = () => {
  if (!username.value) return ElMessage.warning("请输入一个帅气的昵称");
  if (!userAvatar.value) return ElMessage.warning("请选择一个帅气的头像");
  const userData: IChatUser = {
    username: username.value,
    avatar: userAvatar.value,
  };
  emit("setUserName", userData);
};
/**50%随机中文名，50%随机英文名 */
const randomName = () => {
  username.value = Math.random() > 0.5 ? Random.cname() : Random.name();
};
/**选择头像 */
const confirmAvatar = (avatar: Ref<string>) => {
  userAvatar.value = avatar.value;
};
onMounted(() => {});
</script>
<style  lang="scss">
.join-form {
  display: flex;
}
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
  font-size: 16px !important;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>