<!--
 * @Author: 关振俊
 * @Date: 2022-06-28 09:42:18
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-08-30 11:24:29
 * @Description: 信息
-->
<template>
  <div>
    <div class="head-btn">
      <el-button @click="showDialog = true">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="state" label="State" />
      <el-table-column prop="city" label="City" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="zip" label="Zip" />
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row, scope.$index)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index)"
            >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      ref="drawerRef"
      v-model="showDialog"
      title="I have a nested form inside!"
      :before-close="handleClose"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.date"
              type="date"
              label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="form.state" autocomplete="off" />
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="zip" :label-width="formLabelWidth">
            <el-input v-model="form.zip" autocomplete="off" />
          </el-form-item>
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-input v-model="form.tag" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">{{
            loading ? "Submitting ..." : "Submit"
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang='ts' setup>
import { ElDrawer, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import moment from "moment";
let tableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
]);

interface ITable {
  date: string;
  name: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  tag: string;
  [key: string]: string;
}

const form: ITable = reactive({
  date: "",
  name: "",
  state: "",
  city: "",
  address: "",
  zip: "",
  tag: "",
});
const showDialog = ref(false);
const currentNum = ref(0);
const handleEdit = (item: any, i: number) => {
  Object.keys(item).forEach((p: string) => (form[p] = item[p]));
  currentNum.value = i;
  showDialog.value = true;
};
const handleDelete = (i: number) => {
  tableData.splice(i, 1);
};
const formLabelWidth = "80px";
let timer: any;

const loading = ref(false);

const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const onClick = () => {
  const formData = Object.assign({}, form, {
    date: moment(form.date).format("YYYY-MM-DD"),
  });
  currentNum.value === 0
    ? tableData.push(formData)
    : (tableData[currentNum.value] = formData);
  cancelForm();
};

const handleClose = (done: any) => {
  if (loading.value) {
    return;
  }
  ElMessageBox.confirm("Do you want to submit?")
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done();
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false;
        }, 400);
      }, 2000);
    })
    .catch(() => {
      // catch error
    });
};

const cancelForm = () => {
  loading.value = false;
  showDialog.value = false;
  currentNum.value = 0;
  clearTimeout(timer);
};
</script>
<style scoped>
</style>