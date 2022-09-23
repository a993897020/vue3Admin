<!--
 * @Author: 关振俊
 * @Date: 2022-09-23 10:25:34
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-23 17:24:04
 * @Description: 
-->
<template>
  <div class="chat-main">
    <div class="chat-header">
      <div class="chat-header-avatar"></div>
      <div class="chat-header-name">name</div>
    </div>
    <div class="chat-content">
      <div class="chat-content-left">
        <el-scrollbar height="600px">
          <ul class="chat-content-list">
            <li
              :class="[
                index % 2 !== 0
                  ? 'chat-content-item myself'
                  : 'chat-content-item other',
              ]"
              v-for="(item, index) in 10"
              :key="index"
            >
              <div class="chat-content-item-avatar"></div>
              <div class="chat-content-item-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur quam enim delectus eveniet ipsa minima repudiandae
                alias sapiente, totam voluptatibus sint iste ratione illo
                mollitia. Asperiores suscipit et dicta ut.
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <div class="chat-content-send">
          <textarea
            v-model="sendMsg"
            :rows="10"
            placeholder="send something message"
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
import { Ref, ref } from "vue";
const sendMsg: Ref<string> = ref("");
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
      .el-scrollbar {
        height: 600px;
        border-bottom: 4px solid #f8f8f8;
      }
      .chat-content-list {
        padding: 20px;
        .chat-content-item {
          display: flex;
          margin-bottom: 20px;
          .chat-content-item-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ccc;
            flex-shrink: 0;
          }
          .chat-content-item-text {
            padding: 15px;
            color: #000;
            margin-top: 16px;
          }
        }
        .other {
          justify-content: flex-start;
          .chat-content-item-avatar {
            margin-right: 10px;
          }
          .chat-content-item-text {
            background: #f3f3f3;
            border-radius: 0 50px 80px 50px;
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
            border-radius: 50px 0 50px 80px;
          }
        }
      }
      .chat-content-send {
        padding: 20px;
        height: calc(100% - 74px - 600px);
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