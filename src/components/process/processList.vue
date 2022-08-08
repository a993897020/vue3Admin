<template>
  <div class="process-list-wrap">
    <div class="process-list" @drop="dropEvent" @dragover.prevent>
      <div
        class="process-list-item"
        v-for="(item, index) in processList"
        :key="index"
      >
        <!-- 单个节点 -->
        <template v-if="item.children.length === 0">
          <div
            class="process-list-item_text"
            v-text="item.name"
            :draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragover.prevent="handleDragOver($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragend="handleDragEnd($event, item)"
          ></div>
          <template>
            <div
              class="process-list-item-wrap"
              v-if="index !== processList.length - 1"
            >
              <div class="process-list-item_line"></div>
              <!-- 添加节点 -->
              <!-- <div class="process-list-item_addBtn">
                <el-icon
                  @click.native="handleShowDialog(index)"
                  class="el-icon-circle-plus icon"
                ></el-icon>
              </div> -->
              <!-- 箭头图标 -->
              <div
                class="process-list-item_downIcon"
                v-if="processList[index + 1].children.length === 0"
              >
                <el-icon class="el-icon-caret-bottom icon"></el-icon>
              </div>
            </div>
            <!-- 最后一个节点 -->
            <template v-else>
              <!-- 删除节点 -->
              <!-- <div
                    class="process-list-item_delBtn"
                    v-if="index === processList.length - 1"
                    @click="handleDelNode(index)"
                  >
                    <el-icon class="el-icon-minus icon"></el-icon>
                  </div> -->
              <!-- 添加异常连接 -->
              <!-- <div
                    class="process-list-item_addRejectBtn"
                    v-if="index === processList.length - 1"
                  >
                    <el-icon class="el-icon-plus icon"></el-icon>
                  </div> -->
              <div class="process-list-item_fill"></div>
            </template>
          </template>
        </template>

        <!-- 多个节点 -->
        <template v-else>
          <div
            class="process-list-item-many"
            :style="{
              width: `calc(174px * ${item.children.length} + 100px)`,
            }"
          >
            <div class="process-list-item-many_line"></div>
            <div
              class="process-list-item-many_end_line"
              v-if="index !== processList.length - 1"
            ></div>
            <div
              class="process-list-item-many_item"
              v-for="(n, ni) in item.children"
              :key="index + ni"
            >
              <div
                class="process-list-item_text"
                :draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragover.prevent="handleDragOver($event, item)"
                @dragenter="handleDragEnter($event, item, n)"
                @dragend="handleDragEnd($event, item)"
                v-text="n.name"
              ></div>
              <div class="process-list-item-many_item_wrap">
                <div class="process-list-item-many_text_line"></div>
                <div
                  class="process-list-item-many_text_end_line"
                  v-if="index !== processList.length - 1"
                ></div>
                <div class="process-list-item-many_text_downIcon">
                  <el-icon class="el-icon-caret-bottom icon"></el-icon>
                </div>
              </div>
            </div>
          </div>
          <div
            class="process-list-item-wrap"
            v-if="index !== processList.length - 1"
          >
            <div class="process-list-item_line"></div>
            <!-- 添加节点 -->
            <div class="process-list-item_addBtn">
              通过<el-icon
                @click.native="handleShowDialog(index)"
                class="el-icon-circle-plus icon"
              ></el-icon>
            </div>
            <!-- 箭头图标 -->
            <!-- 
                    v-if="!processList[index + 1].isMany"

                   -->
            <div class="process-list-item_downIcon">
              <el-icon class="el-icon-caret-bottom icon"></el-icon>
            </div>
          </div>
        </template>
      </div>
      <div class="empty-wrap" v-if="processList.length === 0">
        请在此处添加节点设置流程
      </div>
    </div>
    <div class="footer-btn">
      <el-button type="primary" size="small">保存</el-button>
      <el-button size="small">去设置校验项目</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodeList: { type: Array, default: () => [] },
    processList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showNodeMenu: false,
    };
  },
  methods: {
    handleDragStart(e, item, isAdd = false) {
      this.$emit("handleDragStart", e, item, isAdd);
    },
    handleDragEnd(e, item) {
      this.$emit("handleDragEnd", e, item);
      //   this.dragging = null;
      //   this.targetIndex = -1;
      //   this.targetChildIndex = -1;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      this.$emit("handleDragOver", e);
      // console.log("over", e);
      //   e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item, childItem) {
      this.$emit("handleDragEnter", e, item, childItem);
      //   e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      //   if (item === this.dragging) {
      //     return;
      //   }
      //   const newItems = [...this.processList];
      //   const src = newItems.indexOf(this.dragging);
      //   this.targetIndex = newItems.indexOf(item);
      //   if (childItem) {
      //     this.targetChildIndex =
      //       this.processList[this.targetIndex].name.indexOf(childItem);
      //   }
      //   if (src >= 0 && !this.dragging.isAdd) {
      //     newItems.splice(this.targetIndex, 0, ...newItems.splice(src, 1));
      //     this.processList = newItems;
      //   }
    },
    dropEvent(e, type) {
      this.$emit("dropEvent", e, type);
      //   const newItems = [...this.processList];
      //   const index = this.nodeList.indexOf(this.dragging);
      //   /**替换节点 */
      //   if (this.targetIndex >= 0 && index >= 0) {
      //     const nodeItem = this.processList[this.targetIndex];
      //     if (nodeItem.isMany) {
      //       const childNodeItem = Object.assign(
      //         {},
      //         nodeItem.name[this.targetChildIndex],
      //         { name: this.dragging.name }
      //       );
      //       nodeItem.name[this.targetChildIndex] = childNodeItem;
      //       newItems.splice(this.targetIndex, 1, nodeItem);
      //     } else {
      //       newItems.splice(this.targetIndex, 1, this.nodeList[index]);
      //     }
      //   }
      //   /**添加节点 */
      //   if (this.targetIndex < 0 && index >= 0) {
      //     newItems.push(JSON.parse(JSON.stringify(this.nodeList[index])));
      //   }
      //   this.processList = newItems;
    },
    handleShowDialog(index) {
      this.$emit("handleShowDialog", index);
      //   this.showAddNodeDialog = true;
      //   this.targetIndex = index;
    },
    /**删除节点 */
    handleDelNode(index) {
      this.$emit("handleDelNode", index);
      //   this.$confirm("此操作将删除该节点, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   }).then(() => {
      //     this.processList.splice(index, 1);
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     });
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.process-list-wrap {
  // border: 1px dashed #8e8e8e;
  padding: 20px;
  .process-list {
    min-height: 582px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .process-list-item {
      margin-bottom: 60px;
      //   width: 64px;
      width: 174px;
      min-height: 30px;
      position: relative;
      z-index: 1;
      // transition: all linear 0.3s;
      .process-list-item-many {
        display: flex;
        justify-content: space-between;
        // width: calc(64px * 2 + 100px); //多节点父容器宽度：64px * n + 100px
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 48px;
        margin-bottom: 52px;
        .process-list-item-many_line {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          width: calc(100% - 174px);
          background: #797979;
        }
        .process-list-item-many_end_line {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          width: calc(100% - 174px);
          background: #797979;
        }
        .process-list-item-many_item {
          position: relative;
          width: 174px;
          height: 100%;
          .process-list-item_text {
          }
          .process-list-item-many_item_wrap {
            .process-list-item-many_text_line {
              position: absolute;
              top: -50px;
              left: 50%;
              transform: translateX(-50%);
              height: 50px;
              width: 2px;
              background: #797979;
            }
            .process-list-item-many_text_end_line {
              position: absolute;
              bottom: -50px;
              left: 50%;
              transform: translateX(-50%);
              height: 50px;
              width: 2px;
              background: #797979;
            }
            .process-list-item-many_text_downIcon {
              position: absolute;
              top: -14px;
              left: 50%;
              transform: translateX(-50%);
              .icon {
                font-size: 20px;
              }
            }
          }
        }
      }
      .process-list-item_text {
        // border: 1px solid #000;
        // padding: 3px;
        // cursor: pointer;
        // text-align: center;
        // margin-right: 14px;
        // margin-bottom: 10px;
        height: 40px;
        background: #f5f6fc;
        color: #006dd0;
        text-align: center;
        line-height: 40px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 16px;
        width: 174px;
        padding: 0 30px;
        cursor: pointer;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
      .process-list-item_fill {
        padding-bottom: 50px;
      }
      .process-list-item-wrap {
        width: 100%;
        height: 100%;
        .process-list-item_line {
          position: absolute;
          bottom: -58px;
          left: 50%;
          transform: translateX(-50%);
          height: 60px;
          width: 2px;
          background: #006dd0;
          z-index: -1;
        }
        .process-list-item_addBtn {
          position: absolute;
          bottom: -38px;
          right: 32%;
          transform: translateX(-50%);
          display: flex;
          white-space: nowrap;
          align-items: center;
          background: #fff;
          .icon {
            font-size: 20px;
            cursor: pointer;
            color: #006dd0;
          }
        }
        .process-list-item_downIcon {
          position: absolute;
          bottom: -68px;
          left: 50%;
          transform: translateX(-50%);
          color: #006dd0;
          .icon {
            font-size: 20px;
          }
        }
      }
      .process-list-item_delBtn {
        position: absolute;
        bottom: 52%;
        transform: translateY(-50%);
        right: -22px;
        cursor: pointer;
        .icon {
          font-size: 20px;
        }
      }
      .process-list-item_addRejectBtn {
        position: absolute;
        bottom: 52%;
        transform: translateY(-50%);
        left: -22px;
        cursor: pointer;
        .icon {
          font-size: 20px;
        }
      }
    }
  }
  .footer-btn {
    text-align: center;
  }
}
</style>