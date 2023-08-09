<!--
 * @Author: 关振俊
 * @Date: 2022-09-22 15:06:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2023-02-07 14:16:12
 * @Description: 聊天界面
-->
<template>
  <div class="chat-wrap">
    <div class="userList-wrap">
      <UserList
        :allUserList="allUserList"
        :selectUser="selectUser"
        @on-select="
          (user) => ((selectUser = user), (user.hasNewMessage = false))
        "
      ></UserList>
    </div>
    <div class="chatContent-wrap">
      <ChatContent
        ref="chatContent"
        :chatUser="chatUser"
        :selectUser="selectUser"
        @send-msg="sendPrivateMessage"
        v-if="selectUser"
      ></ChatContent>
    </div>
  </div>
</template>
<script lang='ts' setup>
import socket from "@/page/chatroom/socket";
import { onMounted, Ref, ref } from "vue";
import ChatContent from "./charInterface/chatContent.vue";
import UserList from "./charInterface/userList.vue";
import { ElMessage } from "element-plus";
import { onPending } from "@/utils/tools";
const allUserList: Ref<any[]> = ref([]);
const selectUser: Ref<any> = ref(null);
const chatContent: Ref = ref(null);
const chatUser: Ref<any> = ref(null);
onMounted(() => {
  socket.on("connect", () => {
    console.log("连接成功！");
  });
  socket.debug;
  socket.on("users", (users: any[]) => {
    console.log({ users });
    users.forEach((user) => {
      user.messages.forEach((msg: any) => {
        /**判断改消息是否当前用户发送 */
        msg.fromSelf = msg.from === socket.userId;
      });
      /**判断服务里面是否含有该用户，有该用户更新最新数据 */
      if (allUserList.value.length > 0) {
        for (let i = 0; i < allUserList.value.length; i++) {
          const existingUser = allUserList.value[i];
          if (existingUser.userId === user.userId) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          }
        }
      }
      /**没有该用户，进行添加 */
      user.self = user.userId === socket.userId;
      if (user.self) {
        chatUser.value = user;
      }
      const lastMsg = user.messages.length > 0 ? user.messages.at(-1) : "";
      user.lastMsg = lastMsg ? lastMsg.content : "";
      user.lastTime = lastMsg ? lastMsg.lastTime : "";
      user.hasNewMessage = false;
      allUserList.value.push(user);
    });
    allUserList.value.sort((a, b) => (a.self ? -1 : 0));
    selectUser.value = allUserList.value[0];
    console.log(allUserList);
  });
  socket.on("user connect", (user: any) => {
    user.hasNewMessage = false;
    console.log("connect", user);
    const userIndex = allUserList.value.findIndex(
      (p) => p.userId === user.userId
    );
    if (userIndex != -1) {
      allUserList.value[userIndex] = user;
    } else {
      allUserList.value.push(user);
    }
  });
  socket.on(
    "private message",
    ({ to, from, avatar, content, lastTime }: any) => {
      console.log({ to, from, avatar, content });
      for (let i = 0; i < allUserList.value.length; i++) {
        const user = allUserList.value[i];
        const fromSelf = user.userId === from; //判断是否当前用户发送
        if (!user.self && user.userId === (fromSelf ? from : to)) {
          user.messages.push({ fromSelf: !fromSelf, content, avatar });
          user.lastMsg = content;
          user.lastTime = lastTime;
          if (selectUser.value.userId !== user.userId) {
            user.hasNewMessage = true;
          }
        }
      }
    }
  );
  /**用户上线提示 */
  socket.on("online", (username: string) => {
    if (username) {
      ElMessage.success(`欢迎${username}上线！！`);
    }
  });

  socket.on("user disconnected", (id: string) => {
    console.log("offline", id);
    for (let i = 0; i < allUserList.value.length; i++) {
      const user = allUserList.value[i];
      console.log({ userId: user.userId, id });
      if (user.userId === id) {
        user.connected = false;
        break;
      }
    }
    console.log(allUserList.value);
  });
  socket.on("disconnect", () => {
    allUserList.value.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });
  });
});
const sendPrivateMessage = async ({ content, avatar, lastTime }: any) => {
  socket.emit("private message", {
    to: selectUser.value.userId,
    content,
    avatar,
    lastTime,
  });
  selectUser.value.messages.push({
    content,
    fromSelf: true,
    avatar,
    lastTime,
  });
  selectUser.value.lastMsg = content;
  selectUser.value.lastTime = lastTime;
  /**滚动到底部。 */
  await onPending(100);
  chatContent.value.scrollBottom();
};
</script>
<style scoped lang="scss">
.chat-wrap {
  display: flex;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  height: 80vh;
  .userList-wrap {
    width: 300px;
    flex: 0.2;
  }
  .chatContent-wrap {
    flex: 0.8;
    flex-shrink: 0;
  }
}
</style>