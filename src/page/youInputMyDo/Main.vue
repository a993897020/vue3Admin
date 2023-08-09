
<!--
 * @Author: 关振俊
 * @Date: 2022-12-01 17:22:33
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-07 15:18:59
 * @Description: 你输入内容，我做相关操作
-->
<template>
  <div>
    <h1>你输内容，我操作</h1>
    <!-- <el-input v-model="iptVal"></el-input> -->
    <el-input
      ref="taskIpt"
      v-model="iptVal"
      :placeholder="
        selectVal === 'add'
          ? 'Please input name:xxx format.Comma segmentation'
          : 'Please input'
      "
      class="input-with-select"
      @keyup.enter="addTask"
    >
      <template #prepend>
        <el-select
          v-model="selectVal"
          placeholder="Select"
          style="width: 115px"
          @change="selectTaskType"
        >
          <el-option
            v-for="(item, i) in selectOptionList"
            :key="i"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <ul class="infinite-list" style="overflow: auto">
      <li v-for="(p, i) in taskList" :key="i" class="infinite-list-item">
        {{ p }}
      </li>
    </ul>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Date" prop="date" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Address" prop="address" />
      <el-table-column align="right">
        <template #header>
          <el-input
            id="tableIptSearch"
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, 'single')"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Taskdialog
      :showDialog="showDialog"
      :selectVal="selectVal"
      @submitTask="(form) => tableData.push(JSON.parse(JSON.stringify(form)))"
      @closeDialog="showDialog = false"
    ></Taskdialog>
  </div>
</template>
<script lang='ts' setup>
import { onPending } from "@/utils/tools";
import { ref, computed, watch, nextTick } from "vue";
import { Message, Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Taskdialog from "./Taskdialog.vue";
const iptVal = ref<string | number>("");
const taskList = ref<any[]>([]);
const selectVal = ref<optionType>("filter");
const taskIpt = ref<any>();
const showDialog = ref<boolean>(false);
const selectOptionList = ref<any[]>([
  { label: "筛选", value: "filter" },
  { label: "删除", value: "delete" },
  { label: "添加", value: "add" },
]);
const optionMap = {
  filter: "筛选",
  delete: "删除",
  add: "添加",
};
type optionType = "filter" | "delete" | "add";
/**
 * @Description: 切换任务类型
 * @Param:
 * @Author: 关振俊
 * @Date: 2022-12-06 11:09:33
 * @LastEditors: 关振俊
 * @LastEditTime: Do not edit
 * @Return:
 * @param {*} e
 */
const selectTaskType = (e: any) => {
  if (e === "delete") {
    iptVal.value = 1;
  }
  if (e === "add") {
    iptVal.value = "name:xxx,date:xxx,address:xxx";
  }
};
/**添加任务 */
const addTask = (e: any) => {
  const task = iptVal.value.toString();
  taskList.value.push(`${optionMap[selectVal.value]}-${task ? task : "清空"}`);
  executionTask(task);
  iptVal.value = "";
};
/**
 * @Description:创建自定义键盘事件
 * @Param:
 * @Author: 关振俊
 * @Date: 2022-12-05 17:37:57
 * @LastEditors: 关振俊
 * @LastEditTime: Do not edit
 * @Return:
 * @param {string} type 事件类型
 * @param {number} keyCode 键位码
 */
const createKeyboardEvent = (type: string, keyCode: number) => {
  return new KeyboardEvent(type, {
    bubbles: true, //阻止事件冒泡
    cancelable: true, //阻止事件默认操作
    // repeat: true, //按键一直按住
    keyCode: keyCode,
  });
};
/**执行任务 */
const executionTask = (task: any) => {
  if (selectVal.value === "delete") {
    handleDelete(task, "many");
    nextTick(() => {
      setTimeout(() => {
        // const enterKeyboardEvent = createKeyboardEvent("keydown", 13);
        const clickMouseEvent = new MouseEvent("click", {
          button: 0, //鼠标键位按下 0左键 1中键 2右键
          bubbles: true, //阻止事件冒泡
          cancelable: true, //阻止事件默认操作
          view: window,
        });

        const confimBtn = document.querySelector(
          ".el-message-box>.el-message-box__btns>.el-button--primary"
        );
        confimBtn?.dispatchEvent(clickMouseEvent);
      }, 300);
    });
  }
  if (selectVal.value === "add") {
    const taskArr = task.split(",");
    console.log(taskArr);
    let bool = false;
    if (
      taskArr.length === 3 &&
      taskArr.every((o: string, oi: number) => {
        if (!bool && oi === 0) bool = o.includes("name:");
        if (bool && oi === 1) bool = o.includes("date:");
        if (bool && oi === 2) bool = o.includes("address:");
        return bool;
      })
    ) {
      showDialog.value = true;
      nextTick(() => {
        const allFormItem: any = document.querySelectorAll(
          ".demo-drawer .el-input"
        );
        const allInput: any = document.querySelectorAll(
          ".demo-drawer .el-input__inner"
        );
        const taskArrFormat = taskArr.map((p: any) => (p = p.split(":")));
        console.log({ taskArrFormat });
        const data = Object.fromEntries(taskArrFormat);
        console.log({ data });
        // const data: any = {
        //   date: "2021-10-20",
        //   name: "jack",
        //   address: "beijing",
        // };
        const inputEvent = new InputEvent("input");
        const inputList: any[] = []; //填完赋值ture
        allInput.forEach(async (p: any, pi: number) => {
          if (pi > 0) await onPending(1000 * pi);
          const obj = ["date", "name", "address"];
          const key: string = obj[pi];
          // console.log({ key });
          const valArr = data[key].split("");
          // console.log({ valArr });
          valArr.forEach(async (o: string, oi: number) => {
            await onPending(100 * (oi + 1));
            p.value += o;
            p.dispatchEvent(inputEvent);
            if (oi === valArr.length - 1) {
              /**这里聚焦和失焦是为了取消日期选择弹框 */
              p.focus();
              // console.log("end");
              if (key === "date") {
                await onPending(100);
                p.blur();
              }
              inputList.push(true);
              if (inputList.length === allInput.length) {
                await onPending(300);
                const submit = document.querySelector(
                  ".demo-drawer .el-button--primary"
                );
                submit?.dispatchEvent(
                  new MouseEvent("click", {
                    bubbles: true, //阻止事件冒泡
                    cancelable: true, //阻止事件默认操作
                  })
                );
              }
            }
          });
        });
        // console.log({ allFormItem });
      });
    } else {
      ElMessage.error("请按规范输入执行任务");
    }
  }
  if (selectVal.value === "filter") {
    const search: any = document.getElementById("tableIptSearch");
    search.focus();
    // search.value = "";
    const taskContent = task.split("");
    const iptEvent = new InputEvent("input"); //构造input对象的事件
    //创建keyboard对象的事件:组合键ctrl:17+shift:16+backspace:8
    // const ctrlKeyboardEvent = createKeyboardEvent("keydown", 17);
    // const shiftKeyboardEvent = createKeyboardEvent("keydown", 16);
    // const backspaceKeyboardEvent = createKeyboardEvent("keydown", 8);
    //创建mouse对象的事件
    const mouseEvent = new MouseEvent("click", {
      button: 0, //鼠标键位按下 0左键 1中键 2右键
      bubbles: true, //阻止事件冒泡
      cancelable: true, //阻止事件默认操作
      view: window,
    });
    search.dispatchEvent(mouseEvent); //点击聚焦筛选输入框
    //按组合键ctrl+shift+backspace删除输入框内容：以下三行代码并不能模拟键盘操作删除输入框内容
    // search.dispatchEvent(ctrlKeyboardEvent);
    // search.dispatchEvent(shiftKeyboardEvent);
    // search.dispatchEvent(backspaceKeyboardEvent);
    // 筛选内容为空
    if (taskContent.length === 0) {
      const value = search.value;
      const valArr = value.split("");
      console.log({ valArr });
      // 判断筛选内容是否为空,为空置空，不为空一个个字符串删除
      if (valArr.length === 0) {
        search.value = "";
        search.dispatchEvent(iptEvent);
      } else {
        valArr.forEach(async (p: string, pi: number) => {
          await onPending(100 * pi + 1);
          search.value = value.slice(0, -(pi + 1));
          search.dispatchEvent(iptEvent);
        });
      }
    } else {
      if (taskContent.length > 0) {
        // 一个个字符串添加
        taskContent.forEach(async (p: string, pi: number) => {
          await onPending(100 * pi + 1);
          search.value += p;
          search.dispatchEvent(iptEvent); //执行构造的input派发事件
          if (pi === taskContent.length - 1) {
            search.blur();
          }
        });
      }
    }
  }
  taskIpt.value.focus();
};
interface User {
  date: string;
  name: string;
  address: string;
}

const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
/**
 * @Description: 删除数据，支持单个和多个删除
 * @Param:
 * @Author: 关振俊
 * @Date: 2022-12-06 11:31:46
 * @LastEditors: 关振俊
 * @LastEditTime: Do not edit
 * @Return:
 * @param {*} index 单个删除就是索引，多个删除就删除这个索引之前的
 * @param {*} type single、many
 */
const handleDelete = (index: number, type: "single" | "many") => {
  console.log(index);
  ElMessageBox.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  ).then(() => {
    if (type === "single") {
      tableData.value.splice(index, 1);
    } else {
      tableData.value = tableData.value.filter((_, pi) => pi > index - 1);
    }
    ElMessage({
      type: "success",
      message: "Delete completed",
    });
  });
};

const tableData = ref<User[]>([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
</script>
<style scoped >
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>