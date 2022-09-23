<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 11:43:53
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-23 17:16:53
 * @Description: 登录聊天室
-->
<template>
  <div class="join-form">
    <el-input
      v-model="username"
      input-style="width:200px;"
      placeholder="请输入昵称"
      @keydown.enter="confirmUsername"
    >
      <template #prepend>用户名</template>
      <template #append>
        <el-button type="primary" @click="confirmUsername">加入聊天</el-button>
      </template>
    </el-input>
    <el-tooltip content="温馨提示：有50%概率随机中英文昵称" effect="customized">
      <el-button type="primary" style="margin-left: 200px" @click="randomName"
        >随机昵称</el-button
      >
    </el-tooltip>
  </div>
</template>
<script lang='ts' setup>
import { ref, defineEmits, Ref } from "vue";
import { Random } from "mockjs";
const username: Ref<string> = ref("");
interface IEmit {
  (e: "setUserName", username: string): void;
}
const emit = defineEmits<IEmit>();
const confirmUsername = () => {
  if (!!username.value.trim()) {
    emit("setUserName", username.value);
  }
};
const randomName = () => {
  username.value = Math.random() > 0.5 ? Random.cname() : Random.name();
};
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