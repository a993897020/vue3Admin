<!--
 * @Author: 关振俊
 * @Date: 2022-08-08 10:02:53
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-09-01 17:19:01
 * @Description: 流程预览
-->
<template>
  <div class="process-wrap">
    <div class="wrapper" v-if="flowArr.length > 0">
      <div class="flow-parent-box">
        <div class="deal-node-box">
          <div class="fill-background head-row">开始</div>
          <!-- <div class="foot-row">默认发起人</div> -->
        </div>
        <div class="line-in-middle">
          <div class="node-line"></div>
          <div class="add-btn-box">
            <!-- <button type="button" class="add-bar">+</button> -->
          </div>
        </div>
      </div>
      <div
        class="flow-parent-box"
        v-for="(item, index) in flowArr"
        :key="index"
      >
        <div class="flow-parent-box">
          <div class="deal-node-box">
            <div class="audit-background head-row">{{ item.taskName }}</div>
            <!-- <div class="foot-row">{{ item.approverName }}</div> -->
          </div>
          <div class="line-in-middle">
            <div class="node-line"></div>
            <div class="add-btn-box">
              <!-- <button type="button" class="add-bar">+</button> -->
            </div>
          </div>
        </div>
        <processList v-if="item.children" :list="item.children"></processList>
      </div>
      <div class="end-node">结束</div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import processList from "../../components/process/processList.vue";
import { ref } from "vue";
const flowArr: any = ref([
  {
    taskName: "流程1",
    approverName: "审计测试人员,test1",
    children: [
      {
        taskName: "流程2",
        approverName: "admin,审计局",
        children: [
          { taskName: "流程2", approverName: "admin,审计局" },
          { taskName: "流程2", approverName: "admin,审计局" },
        ],
      },
      {
        taskName: "流程2",
        approverName: "admin,审计局",
        children: [
          { taskName: "流程2", approverName: "admin,审计局" },
          { taskName: "流程2", approverName: "admin,审计局" },
        ],
      },
    ],
  },
  { taskName: "流程3", approverName: "审计单位账号,admin" },
]);
</script>
  
  <style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  padding: 54.5px 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  min-width: -webkit-min-content;
  min-width: -moz-min-content;
  min-width: min-content;
  background-color: #f9fafc;
  transform-origin: 0 0 0;
}
.deal-node-box .del-node {
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.deal-node-box .head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.deal-node-box .foot-row .footnote {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.audit-background {
  background: linear-gradient(89.96deg, #fa6f32 0.05%, #fb9337 79.83%);
}
.fill-background {
  background: linear-gradient(90.04deg, #268bfb -16.37%, #33e1ae 137.34%);
}
.flow-parent-box {
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  min-height: 180px;
  width: 100%;
  padding: 0 50px;
}
.deal-node-box,
.flow-parent-box {
  display: inline-flex;
  flex-direction: column;
}
.deal-node-box {
  position: relative;
  width: 270px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 0.08);
  background-color: #fff;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}
.deal-node-box .head-row {
  width: 100%;
  height: 50px;
  border-radius: 8px 8px 0 0;
  color: #fff;
  padding: 0 14px;
}
.deal-node-box .head-row .user-name {
  width: 100%;
  font-weight: 500;
}
.deal-node-box .head-row > .iconfont {
  font-size: 24px;
  opacity: 0.3;
}
.deal-node-box .foot-row {
  padding: 0 15px;
  color: #6b737b;
}
.deal-node-box .foot-row .auditor-container {
  padding-top: 10px;
  font-size: 14px;
}
.deal-node-box .foot-row .auditor-container-hint {
  color: #b0b0b9;
}
.deal-node-box .foot-row .footnote {
  position: relative;
  height: 40px;
  color: #6b737b;
  border-top: 1px solid #f5f5f7;
  font-family: QingflowFont, sans-serif;
}
.deal-node-box .footer-profile {
  padding: 10px 15px;
}
.deal-node-box .footer-profile .footnote {
  margin-bottom: -10px;
}
.deal-node-box .del-node {
  cursor: pointer;
  opacity: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  right: -15px;
  top: -15px;
}
.deal-node-box .del-node i {
  font-size: 20px;
  color: #acb3bd;
}
.deal-node-box .del-node:before {
  content: "";
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
}
.deal-node-box:hover .del-node {
  opacity: 1;
}
.cut-node .foot-row,
.cut-node .head-row {
  opacity: 0.4;
}
.line-in-middle {
  width: 240px;
  min-height: 90px;
  display: inline-flex;
  flex-shrink: 0;
  flex-grow: 1;
  position: relative;
}
.line-in-middle .node-line {
  position: absolute;
  right: 50%;
  width: 1px;
  height: 100%;
  background-color: #ccd4e0;
  position: relative;
}
.add-btn-box {
  width: 100%;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  // flex-grow: 1;
}
.add-bar {
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 4px 10px 0 rgba(12, 31, 80, 0.08);
  border-radius: 16px;
  font-weight: 500;
  cursor: pointer;
  z-index: 1;
  position: relative;
  outline: none;
  border: none;
  color: #fb9337;
}
.add-bar i {
  font-size: 10px;
  display: inline-block;
  margin: auto;
}
.add-bar:hover {
  background-color: #fb9337;
  color: #fff;
}
.line-in-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}
.branch-box .add-branch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.flow-child-box {
  display: inline-flex;
}
.branch,
.flow-child-box {
  width: 100%;
  flex-shrink: 0;
}
.branch {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  min-height: 270px;
}
.branch-box {
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 1px solid #dfdfe8;
  border-top: 1px solid #dfdfe8;
  position: relative;
  display: flex;
}
.branch-box .col-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.branch-box .col-box .bottom-left-cover-line,
.branch-box .col-box .bottom-right-cover-line,
.branch-box .col-box .top-left-cover-line,
.branch-box .col-box .top-right-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background: #f9fafc;
}
.branch-box .col-box .top-left-cover-line {
  top: -2px;
  left: 0;
}
.branch-box .col-box .top-right-cover-line {
  top: -2px;
  right: 0;
}
.branch-box .col-box .bottom-left-cover-line {
  bottom: -2px;
  left: 0;
}
.branch-box .col-box .bottom-right-cover-line {
  bottom: -2px;
  right: 0;
}
.line-in-middle {
  width: 240px;
  min-height: 90px;
  position: relative;
}
.line-in-middle .node-line {
  position: absolute;
  left: 50%;
  width: 1px;
  height: 100%;
  background-color: #dfdfe8;
}
.condition-node-box .auto-judge .del-btn,
.transition {
  transition: all 0.2s ease;
}
.condition-node-box .auto-judge .del-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.condition-node-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.condition-node-box .auto-judge .foot-row,
.inline-flex-sc {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.single-line-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.animated {
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.branch-one {
  min-height: 220px;
  display: inline-flex;
}
.condition-node-box,
.branch-one {
  flex-direction: column;
  flex-grow: 1;
}
.condition-node-box {
  position: relative;
  min-height: 100%;
  padding: 30px 50px 0;
}
.condition-node-box .node-line {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #dfdfe8;
}
.condition-node-box .del-btn {
  opacity: 1;
}
.del-node {
  color: #fa6f32;
}
.end-node {
  text-align: center;
}
</style>
  