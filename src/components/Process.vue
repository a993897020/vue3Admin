
<template>
  <div class="process-wrap">
    <el-row :gutter="6">
      <el-col :span="6">
        <el-card class="process-node-wrap">
          <div class="process-header">
            <img src="@/assets/branch.png" alt="" />
            <span>设置选项</span>
          </div>
          <div class="process-line"></div>
          <el-alert
            title="提示：拖到选框以设置流程"
            type="warning"
            show-icon
            :closable="false"
          >
          </el-alert>
          <!-- <div class="process-node">
            <div
              class="process-node-item"
              v-for="item in nodeList"
              :key="item.id"
              v-text="item.name"
              draggable="true"
              @dragstart="handleDragStart($event, item, 1)"
              @dragover.prevent="handleDragOver($event, item)"
              @dragend="handleDragEnd($event, item)"
            ></div>
          </div> -->
        </el-card>
      </el-col>
      <!-- 流程设置区 -->
      <el-col :span="18" :push="6">
        <el-card class="process-list-container">
          <div class="process-header">
            <img src="@/assets/branch.png" alt="" />
            <span>流程设置</span>
          </div>
          <div class="process-line"></div>
          <!-- <Process
            :nodeList="nodeList"
            :processList="processList"
            @handleDragStart="handleDragStart"
            @handleDragEnd="handleDragEnd"
            @handleDragOver="handleDragOver"
            @handleDragEnter="handleDragEnter"
            @dropEvent="dropEvent"
            @handleShowDialog="handleShowDialog"
            @handleDelNode="handleDelNode"
          ></Process> -->
          <ProcessList></ProcessList>
        </el-card>
      </el-col>
      <!-- <el-col :span="6" :push="6">
        <el-card>456</el-card>
      </el-col> -->
    </el-row>
    <el-dialog
      :visible.sync="showAddNodeDialog"
      title="创建节点"
      width="600px"
      @close="showAddNodeDailog = false"
    >
      <el-form :model="nodeForm" ref="nodeFormRef">
        <el-form-item
          label="节点名称"
          :rules="[
            { required: true, message: '请输入节点名称', trigger: 'blur' },
          ]"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="nodeForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="节点说明"
          :rules="[
            { required: true, message: '请输入节点说明', trigger: 'blur' },
          ]"
          :label-width="formLabelWidth"
          prop="desc"
        >
          <el-input v-model="nodeForm.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始状态" :label-width="formLabelWidth">
          <el-radio-group v-model="nodeForm.beginStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="结束状态" :label-width="formLabelWidth">
          <el-radio-group v-model="nodeForm.endStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddNodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitNodeForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    Process: () => import("../../components/processSettings/process"),
    ProcessList: () => import("../../components/processSettings/ProcessList"),
  },
  data() {
    return {
      nodeList: [
        { id: 1, name: "立案审核" },
        { id: 2, name: "立案缴费" },
        { id: 3, name: "申请案号" },
        { id: 4, name: "分配案号" },
      ],
      processList: [
        { id: 1, name: "立案审核", isMany: false, showMenu: false },
        { id: 2, name: "立案缴费", isMany: false, showMenu: false },
        { id: 3, name: "申请案号", isMany: false, showMenu: false },
        { id: 4, name: "组庭", isMany: false, showMenu: false },
        {
          id: 5,
          name: [
            { id: 51, name: "合议庭" },
            { id: 52, name: "独任庭" },
            { id: 52, name: "独任庭" },
            { id: 52, name: "独任庭" },
          ],
          isMany: true,
        },
      ],
      dragging: null, //当前被拖拽的元素
      targetIndex: -1,
      targetChildIndex: -1,
      showAddNodeDialog: false,
      nodeForm: {
        name: "",
        desc: "",
        beginStatus: "",
        endStatus: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleDragStart(e, item, isAdd = false) {
      console.log(item);
      this.dragging = item;
      this.dragging.isAdd = isAdd;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
      this.targetIndex = -1;
      this.targetChildIndex = -1;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      // console.log("over", e);
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item, childItem) {
      // console.log("enter", e);
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      console.log(item);
      const newItems = [...this.processList];
      const src = newItems.indexOf(this.dragging);
      this.targetIndex = newItems.indexOf(item);
      if (childItem) {
        this.targetChildIndex =
          this.processList[this.targetIndex].name.indexOf(childItem);
      }
      if (src >= 0 && !this.dragging.isAdd) {
        newItems.splice(this.targetIndex, 0, ...newItems.splice(src, 1));
        this.processList = newItems;
      }
    },
    dropEvent(e, type) {
      const newItems = [...this.processList];
      const index = this.nodeList.indexOf(this.dragging);
      console.log(this.targetIndex);
      /**替换节点 */
      if (this.targetIndex >= 0 && index >= 0) {
        const nodeItem = this.processList[this.targetIndex];
        if (nodeItem.isMany) {
          const childNodeItem = Object.assign(
            {},
            nodeItem.name[this.targetChildIndex],
            { name: this.dragging.name }
          );
          nodeItem.name[this.targetChildIndex] = childNodeItem;
          newItems.splice(this.targetIndex, 1, nodeItem);
        } else {
          newItems.splice(this.targetIndex, 1, this.nodeList[index]);
        }
      }
      /**添加节点 */
      if (this.targetIndex < 0 && index >= 0) {
        newItems.push(JSON.parse(JSON.stringify(this.nodeList[index])));
      }
      this.processList = newItems;
    },
    handleShowDialog(index) {
      this.showAddNodeDialog = true;
      this.targetIndex = index;
    },
    /**提交表单新增节点 */
    submitNodeForm() {
      this.$refs.nodeFormRef.validate((v) => {
        if (v) {
          const newState = [...this.processList];
          const nodeItem = Object.assign({}, this.nodeForm, {
            id: this.nodeList.length + 1,
          });
          const state1 = newState.filter((_p, i) => i <= this.targetIndex);
          const state2 = newState.filter((_p, i) => i > this.targetIndex);
          state1.push(JSON.parse(JSON.stringify(nodeItem)));
          this.processList = [...state1, ...state2];
          // console.log(this.processList);
          this.nodeList.push(nodeItem);
          this.showAddNodeDialog = false;
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      });
    },
    /**删除节点 */
    handleDelNode(index) {
      this.$confirm("此操作将删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.processList.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.process-wrap {
  .process-header {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #314259;
    display: flex;
    align-items: center;
    & > img {
      width: 44px;
      height: 44px;
    }
    & > span {
      margin-top: -4px;
    }
  }
  .process-line {
    border-bottom: 1px solid #eaeef5;
    margin-bottom: 12px;
    margin-top: 6px;
  }
  .process-node-wrap {
    position: fixed;
    left: 240px;
    top: 120px;
    height: calc(100% - 140px);
    width: calc((100% - 60px - 210px - 25px) * 0.25);
    .process-node {
      display: flex;
      margin-top: 12px;
      flex-wrap: wrap;
      .process-node-item {
        margin-right: 14px;
        margin-bottom: 10px;
        height: 40px;
        background: #f5f6fc;
        color: #006dd0;
        text-align: center;
        line-height: 40px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 16px;
        min-width: 174px;
        padding: 0 30px;
        cursor: pointer;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    .el-alert {
      background: #fff9f1;
      color: #ef940a;
      border: 1px solid #ef940a;
    }
  }
  .process-list-container {
    margin-bottom: 20px;
    :deep() .el-card__body {
      min-height: calc(100vh - 140px);
      width: 100%;
    }
  }
  .process-list-wrap {
    border: 1px dashed #8e8e8e;
    padding: 20px;
    .process-list {
      min-height: calc(100vh - 140px);
      display: flex;
      flex-direction: column;
      align-items: center;
      .process-list-item {
        margin-bottom: 60px;
        width: 64px;
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
            width: calc(100% - 64px);
            background: #797979;
          }
          .process-list-item-many_end_line {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            height: 2px;
            width: calc(100% - 64px);
            background: #797979;
          }
          .process-list-item-many_item {
            position: relative;
            width: 64px;
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
          border: 1px solid #000;
          padding: 3px;
          cursor: pointer;
          text-align: center;
        }
        .process-list-item_fill {
          padding-bottom: 50px;
        }
        .process-list-item-wrap {
          .process-list-item_line {
            position: absolute;
            bottom: -58px;
            left: 50%;
            transform: translateX(-50%);
            height: 60px;
            width: 2px;
            background: #797979;
            z-index: -1;
          }
          .process-list-item_addBtn {
            position: absolute;
            bottom: -38px;
            left: 28%;
            transform: translateX(-50%);
            display: flex;
            white-space: nowrap;
            align-items: center;
            background: #fff;
            .icon {
              font-size: 20px;
              cursor: pointer;
            }
          }
          .process-list-item_downIcon {
            position: absolute;
            bottom: -68px;
            left: 50%;
            transform: translateX(-50%);
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
}
</style>