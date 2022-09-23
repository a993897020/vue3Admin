<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 15:06:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-23 11:47:22
 * @Description: 聊天界面
-->
<template>
  <div class="chat-wrap">
    <div class="userList-wrap">
      <UserList></UserList>
    </div>
    <div class="chatContent-wrap">
      <ChatContent></ChatContent>
    </div>
  </div>
</template>
<script lang='ts' setup>
import socket from "@/page/chatroom/socket";
import { onMounted } from "vue";
import ChatContent from "./charInterface/chatContent.vue";
import UserList from "./charInterface/userList.vue";
onMounted(() => {
  console.log({ socket });
  socket.on("connect", () => {
    console.log("连接成功！");
  });
});
</script>
<style scoped lang="scss">
.chat-wrap {
  display: flex;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  height: 86vh;
  .userList-wrap {
    width: 200px;
    flex: 0.2;
  }
  .chatContent-wrap {
    flex: 0.8;
    flex-shrink: 0;
  }
}
</style>