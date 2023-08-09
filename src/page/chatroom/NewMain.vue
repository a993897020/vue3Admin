<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 11:11:22
 * @LastEditors: 关振俊
 * @LastEditTime: 2023-02-07 11:51:28
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
import { onMounted, onUnmounted, Ref, ref } from "vue";
import socket from "./socket";
const alreadyHasUsername: Ref<boolean> = ref(false);
interface IChatUser {
  username: string;
  avatar: string;
}
const setUserName = ({ username, avatar }: IChatUser) => {
  alreadyHasUsername.value = true;
  socket.auth = { username, avatar };
  socket.connect();
  console.log(socket);
};
const checkUserId = () => {
  const userId = sessionStorage.getItem("suid");
  if (userId) {
    socket.auth = { userId };
    socket.userId = userId;
    socket.connect();
    setTimeout(() => {
      if (!socket.connected) {
        return sessionStorage.removeItem("suid");
      }
    }, 1000);
    alreadyHasUsername.value = true;
  }
};
onMounted(() => {
  checkUserId();
  console.log({ socket });

  socket.on("userId", (userId: string) => {
    console.log("user", { userId });
    socket.userId = userId;
    sessionStorage.setItem("suid", userId);
  });
  socket.on("connect_error", (err: any) => {
    if (err.message === "invalid username") {
      alreadyHasUsername.value = false;
    }
  });
});
onUnmounted(() => {
  console.log("disconnect");
  socket.disconnect();
  socket.off("connect");
  socket.off("disconnect");
  socket.off("users");
  socket.off("user connected");
  socket.off("user disconnected");
  socket.off("private message");
  sessionStorage.removeItem("suid");
});
</script>
<style scoped>
</style>