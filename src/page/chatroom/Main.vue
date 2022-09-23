<!--
 * @Author: 关振俊
 * @Date: 2022-08-30 15:03:43
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-21 11:44:50
 * @Description: 
-->
<template>
  <div class="message-wrap">
    <!-- <el-alert :title="welcomeText" type="success" :closable="false" /> -->
    <el-scrollbar height="650px">
      <el-row style="height: 650px">
        <el-col :span="20">
          <ul ref="msgContent" class="message-list">
            <li
              class="message-item"
              v-for="(p, pi) in msgList"
              :key="pi"
              v-text="p"
            ></li>
          </ul>
        </el-col>
        <el-col :span="4">
          <el-table
            :data="userList"
            border
            :style="{ width: '100%', height: '100%' }"
          >
            <el-table-column prop="name" label="用户名"> </el-table-column>
          </el-table>
          <!-- <ul class="user-list">
          <li
            class="user-item"
            v-for="(p, pi) in userList"
            :key="pi"
            v-text="p.name"
          ></li>
        </ul> -->
        </el-col>
      </el-row>
    </el-scrollbar>

    <div class="message-footer">
      <el-input
        v-model="msg"
        placeholder="Please input"
        class="input-with-select"
        @keydown="sendMsg"
      >
        <template #append>
          <el-button :icon="Search" @click="sendMsg" />
        </template>
      </el-input>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { io } from "socket.io-client";
import { onMounted, ref, reactive, onUnmounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
const socket = ref();
const msg = ref();
const msgList: any = ref([]);
const welcomeText = ref("");
const msgContent: any = ref(null);
const userInfo: any = ref(); //当前用户信息
const userList: any = ref(); //聊天室的所有用户
const isConnect: any = ref(false);
onMounted(() => {
  console.log("click");
  socket.value = io("ws://localhost:3050", { autoConnect: true });
  socket.value.on("connect", () => {
    console.log("socket connect");
    isConnect.value = true;
    // 加入聊天室
    addChatRoom();
    // 监听服务端的提示语
    socket.value.on("welcome", (msg: any) => {
      //   console.log("welcome", msg);
      welcomeText.value = msg;
    });
    // 监听服务端的消息
    socket.value.on("send msg", (msg: any) => {
      msgList.value.push(msg);
    });
    // 监听聊天室的用户
    socket.value.on("user list", (list: any[]) => {
      userList.value = list;
    });
    /**断开连接 */
    socket.value.on("disconnect", () => {
      isConnect.value = false;
      console.log("socket disconnect");
    });
  });
  window.addEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.addEventListener("unload", (e) => unloadHandler(e));
});
onUnmounted(() => {
  window.removeEventListener("beforeunload", (e) => beforeunloadHandler(e));
  window.removeEventListener("unload", (e) => unloadHandler(e));
  if (isConnect.value) {
    leaveChatRoom();
  }
});

let _beforeUnload_time: any = "";
let _gap_time: any = "";

const beforeunloadHandler = (e: any) => {
  _beforeUnload_time = new Date().getTime();
  leaveChatRoom();
  console.log("leave");
  // sleep(5000);

  // e.returnValue = "关闭提示"; // 弹窗
};
const unloadHandler = (e: any) => {
  _gap_time = new Date().getTime() - _beforeUnload_time;
  //判断是窗口关闭还是刷新
  if (_gap_time <= 5) {
    // leaveChatRoom();
    console.log("close page");
    // 退出登录
    // xxxxxxxx
    // 通知后台
    // xxxxxxxx
  }
};
const sleep = (numberMillis: number) => {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) return;
  }
};
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const addChatRoom = () => {
  const user = window.sessionStorage.getItem("user");
  //   console.log(user);
  if (user) {
    userInfo.value = JSON.parse(user);
    socket.value.emit("user list");
  } else {
    ElMessageBox.prompt("请给自己起个帅气的名字", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      showCancelButton: false,
      inputPattern: /\S/,
      inputErrorMessage: "请输入用户名",
      showClose: false,
      draggable: true,
    }).then(({ value }) => {
      userInfo.value = {
        id: guid(),
        name: value,
      };
      socket.value.emit("join room", userInfo.value);
      socket.value.on("join room", (welcomeText: any) => {
        ElMessage({
          type: "success",
          message: welcomeText,
        });
        window.sessionStorage.setItem("user", JSON.stringify(userInfo.value));
        socket.value.emit("user list");
      });
    });
  }
};
const sendMsg = (e: any) => {
  if (msg.value && e.key === "Enter") {
    socket.value.emit("send msg", {
      msg: msg.value,
      name: userInfo.value.name,
    });
    msg.value = "";
    msgContent.value &&
      msgContent.value.scrollTo(msgContent.value.scrollHeight);
  }
};
const leaveChatRoom = () => {
  if (!!userInfo.value.id) {
    socket.value.emit("user leave", userInfo.value.id);
    socket.value.emit("user list");
    window.sessionStorage.removeItem("user");
  }
  socket.value.disconnect();
};
</script>
<style scoped lang="scss">
.message-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  width: calc(100% - 200px);
  padding: 10px;
  background: #d9d9d9;
  z-index: 99;
}
.message-list {
  margin-top: 20px;
}
.user-list {
  // back
}
</style>