<!--
 * @Author: 关振俊
 * @Date: 2022-09-23 10:25:34
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-30 16:28:40
 * @Description: 聊天内容
-->
<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="chat-header-avatar">
        <el-avatar :size="50" :src="props.selectUser.avatar" />
      </div>
      <div class="chat-header-name" v-text="props.selectUser.username"></div>
    </div>
    <div class="chat-content">
      <div class="chat-content-left">
        <el-scrollbar ref="scrollBar">
          <ul class="chat-content-list">
            <li
              :class="['chat-content-item', msg.fromSelf ? 'myself' : 'other']"
              v-for="(msg, index) in selectUser.messages"
              :key="index"
            >
              <div class="chat-content-item-avatar">
                <el-avatar :size="50" :src="msg.avatar" />
              </div>
              <div class="chat-content-item-text" v-text="msg.content"></div>
            </li>
            <li class="chat-content_bottom"></li>
          </ul>
        </el-scrollbar>
        <div class="chat-content-send">
          <textarea
            ref="sendInput"
            v-model="msgVal"
            :rows="10"
            placeholder="send something message"
            @keydown="sendMsg"
          ></textarea>
        </div>
      </div>
      <div class="chat-content-right">
        <div class="chat-content-notice">
          <el-scrollbar>
            <div class="notice-title">
              <el-icon color="#999" size="20px"><BellFilled /></el-icon>
              <span>Notice</span>
            </div>
            <div class="notice-content">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              optio eveniet vero ea doloribus repellat inventore quaerat, qui
              excepturi asperiores corporis reprehenderit expedita minus illo
              ipsam nihil nemo nulla. Maxime.Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Hic optio eveniet vero ea doloribus
              repellat inventore quaerat, qui excepturi asperiores corporis
              reprehenderit expedita minus illo ipsam nihil nemo nulla.
              Maxime.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Hic optio eveniet vero ea doloribus repellat inventore quaerat,
              qui excepturi asperiores corporis reprehenderit expedita minus
              illo ipsam nihil nemo nulla. Maxime.
            </div>
          </el-scrollbar>
        </div>
        <div class="chat-content-group">
          <el-scrollbar>
            <ul class="user-list">
              <li class="user-item" v-for="(item, index) in 10" :key="index">
                <div class="user-item-avatar"></div>
                <div class="user-item-name">name</div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { BellFilled } from "@element-plus/icons-vue";
import { Ref, ref, defineProps, defineEmits, defineExpose, watch } from "vue";
import { ElMessage } from "element-plus";
import { onPending } from "@/utils/tools";
const msgVal: Ref<string> = ref("");
const keyDownList: Ref<any[]> = ref([]);
const sendInput: Ref = ref(null);
const scrollBar: Ref = ref(null);
const props = defineProps({
  selectUser: {
    type: Object,
    default: () => {},
  },
});
watch(
  () => props.selectUser,
  async () => {
    if (props.selectUser.messages.length > 0) {
      await onPending(100);
      scrollBottom();
    }
  }
);
const emit = defineEmits(["sendMsg"]);
/**alt+enter发送消息 */
const sendMsg = (e: any) => {
  keyDownList.value.push(e.key);
  const lastTwoKeyDown =
    keyDownList.value.at(-1) + "+" + keyDownList.value.at(-2);
  if (lastTwoKeyDown === "Alt+Enter" || lastTwoKeyDown === "Enter+Alt") {
    if (!msgVal.value.trim()) {
      return ElMessage({
        message: "发送内容不能为空！",
        type: "warning",
      });
    } else {
      emit("sendMsg", {
        content: msgVal.value,
        avatar: props.selectUser.avatar,
      });
      keyDownList.value = [];
      msgVal.value = "";
      sendInput.value.value = "";
    }
  }
};
/**聊天内容滚动到底部 */
const scrollBottom = () => {
  const chatBottom: any = document.querySelector(".chat-content_bottom");
  chatBottom.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
defineExpose({ scrollBottom });
</script>
<style scoped lang="scss">
.chat-main {
  height: 100%;
  .chat-header {
    padding: 10px;
    display: flex;
    border-bottom: 4px solid #f8f8f8;
    .chat-header-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ccc;
      margin-right: 10px;
      flex-shrink: 0;
    }
    .chat-header-name {
      font-size: 18px;
      color: #000;
      margin-left: 10px;
    }
  }
  .chat-content {
    display: flex;
    height: calc(100% - 74px);
    .chat-content-left {
      border-right: 4px solid #f8f8f8;
      height: 100%;
      flex: 0.8;
      position: relative;
      .el-scrollbar {
        height: 60%;
      }
      .chat-content-list {
        padding: 20px;
        .chat-content-item {
          display: flex;
          margin-bottom: 20px;
          flex-wrap: wrap;
          .chat-content-item-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ccc;
            flex-shrink: 0;
          }
          .chat-content-item-text {
            padding: 5px 10px;
            color: #000;
            margin-top: 16px;
            word-break: break-all;
            max-width: 80%;
          }
        }
        .other {
          justify-content: flex-start;
          .chat-content-item-avatar {
            margin-right: 10px;
          }
          .chat-content-item-text {
            background: #f3f3f3;
            border-radius: 0 25px 25px 25px;
          }
        }
        .myself {
          justify-content: flex-end;
          .chat-content-item-avatar {
            order: 2;
            margin-left: 10px;
          }
          .chat-content-item-text {
            background: #dbf1fc;
            order: 1;
            border-radius: 25px 0 25px 25px;
          }
        }
      }
      .chat-content-send {
        border-top: 4px solid #f8f8f8;
        position: absolute;
        width: calc(100% - 4px);
        bottom: 0;
        left: 4px;
        padding: 20px;
        height: 280px;
        overflow: hidden;
        background: #fff;
        & > textarea {
          width: 100%;
          border: 0;
          outline: none;
          font-size: 20px;
          resize: none;
        }
      }
    }
    .chat-content-right {
      flex: 0.2;
      .chat-content-notice {
        height: 300px;
        border-bottom: 4px solid #f8f8f8;
        overflow: hidden;
        .notice-title {
          display: flex;
          align-items: center;
          padding: 10px;
          & > span {
            margin-left: 10px;
            font-size: 18px;
          }
        }
        .notice-content {
          padding: 10px;
          font-size: 16px;
          color: #ccc;
        }
      }
      .chat-content-group {
        height: calc(100% - 300px);
        .user-list {
          padding: 20px;
          .user-item {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            .user-item-avatar {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: #ccc;
              margin-right: 10px;
              flex-shrink: 0;
            }
            .user-item-name {
              font-size: 18px;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>