<!--
 * @Author: 关振俊
 * @Date: 2022-09-23 10:24:59
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-23 14:47:45
 * @Description: 
-->
<template>
  <div class="user-main">
    <div class="user-search">
      <el-icon :size="18" color="#757575"><Search /></el-icon>
      <input v-model="userfilVal" placeholder="Search" />
    </div>
    <el-scrollbar>
      <ul class="user-list">
        <li class="user-item" v-for="(item, index) in 16" :key="index">
          <div class="user-item-avatar"></div>
          <div class="user-item-info">
            <div class="user-item-info-nt">
              <div class="user-info-name">name</div>
              <div class="user-info-lastTime">
                {{ moment(new Date()).format("YYYY-MM-DD") }}
              </div>
            </div>
            <div class="user-item-message">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloribus mollitia fuga assumenda voluptatibus. Nihil nobis
              adipisci in voluptate dolor mollitia veritatis esse, fugit, ea
              tempore impedit illum eum error excepturi!
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang='ts' setup>
import { Search } from "@element-plus/icons-vue";
import { ref, Ref } from "vue";
import moment from "moment";
const userfilVal: Ref<string> = ref("");
</script>
<style scoped lang="scss">
@mixin leftSolid() {
  background: #ebf7fd;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 100%;
    background: #4496cf;
  }
}
.user-main {
  height: 100%;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  .user-search {
    height: 50px;
    line-height: 50px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    .el-icon {
      top: 2px;
    }
    & > input {
      margin-left: 10px;
      height: 100%;
      border: 0;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }
  .user-list {
    padding-bottom: 50px;
    .active {
      @include leftSolid();
    }
    .user-item {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      padding: 10px;
      position: relative;
      cursor: pointer;
      &:hover {
        @include leftSolid();
      }
      .user-item-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ccc;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .user-item-info {
        overflow: hidden;
        .user-item-info-nt {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .user-info-name {
            color: #000;
            font-size: 18px;
          }
          .user-info-lastTime {
            color: #ccc;
            font-size: 14px;
          }
        }
        .user-item-message {
          color: #ccc;
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>