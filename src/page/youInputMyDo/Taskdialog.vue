<!--
 * @Author: 关振俊
 * @Date: 2022-12-06 11:40:51
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-07 15:18:38
 * @Description: 添加、编辑dialog
-->
<template>
  <div>
    <el-drawer
      ref="drawerRef"
      v-model="props.showDialog"
      :title="props.selectVal === 'add' ? '添加任务' : '编辑任务'"
      :before-close="handleClose"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form" ref="taskFormRef">
          <el-form-item label="Date" :label-width="formLabelWidth">
            <el-date-picker
              ref="picker"
              v-model="form.date"
              type="date"
              placeholder="Pick a day"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Address" :label-width="formLabelWidth">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="onClick(taskFormRef)">{{
            "Submit"
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref } from "vue";
import { ElDrawer, ElMessage, ElMessageBox, FormInstance } from "element-plus";

const props = defineProps(["showDialog", "selectVal"]);
const emits = defineEmits(["closeDialog", "submitTask"]);

const formLabelWidth = "80px";

const form = reactive({
  date: "",
  name: "",
  address: "",
});
const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const taskFormRef = ref<FormInstance>();
const onClick = (taskForm: any) => {
  ElMessage.success("添加成功！");
  emits("submitTask", form);
  resetForm(taskForm);
  handleClose();
};
const resetForm = (taskForm: FormInstance | undefined) => {
  if (!taskForm) return;
  taskForm.resetFields();
};
const handleClose = () => {
  emits("closeDialog");
};
</script>
<style scoped>
</style>