<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 11:11:22
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-22 17:25:13
 * @Description: 
-->
<template>
  <div>
    <JoinChat @setUserName="setUserName" v-if="!alreadyHasUsername"></JoinChat>
    <ChatInterfact v-else></ChatInterfact>
  </div>
</template>
<script lang='ts' setup>
import JoinChat from "@/components/chatroom/joinChat.vue";
import ChatInterfact from "@/components/chatroom/chatInterfact.vue";
import { Ref, ref } from "vue";
import socket from "./socket";
const alreadyHasUsername: Ref<boolean> = ref(false);
const setUserName = (username: String) => {
  alreadyHasUsername.value = true;
  socket.auth = { username };
  socket.connect();
  console.log(socket);
};
</script>
<style scoped>
</style>