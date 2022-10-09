<!--
 * @Author: 关振俊
 * @Date: 2022-07-19 10:18:17
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-10-09 14:24:57
 * @Description: 表格单元格合并
-->
<template>
  <div>
    <!-- <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" sortable label="Amount 1" />
      <el-table-column prop="amount2" sortable label="Amount 2" />
      <el-table-column prop="amount3" sortable label="Amount 3" />
    </el-table> -->

    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <!-- <el-table-column prop="id" label="ID" width="180" /> -->
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
  </div>
</template>
<script lang='ts' setup>
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface User {
  id: string;
  name: string;
  amount1: string;
  amount2: string;
  amount3: number;
}

interface SpanMethodProps {
  row: User;
  column: TableColumnCtx<User>;
  rowIndex: number;
  columnIndex: number;
}
const coordinateList: any[] = [
  {
    x: 1,
    y: 1,
    rowSpan: 2,
    colSpan: 3,
  },
  //   {
  //     x: 2,
  //     y: 2,
  //     rowSpan: 2,
  //     colSpan: 2,
  //   },
];

const arraySpanMethod = ({
  row,
  column,
  rowIndex, //行index
  columnIndex, //列index
}: SpanMethodProps) => {
  //   for (let i = 0; i < coordinateList.length; i++) {
  //     if (
  //       rowIndex === coordinateList[i].x &&
  //       columnIndex === coordinateList[i].y
  //     ) {
  //       console.log({ rowIndex, columnIndex });
  //       console.log({ row, column });
  //       return [coordinateList[i].rowSpan, coordinateList[i].colspan];
  //     }
  //     console.log({ i });
  //   }
  // if (rowIndex === 0 && columnIndex === 0) return [2, 1];
  // if (rowIndex === 1 && columnIndex === 0) return [2, 1];
  return [1, 1];
};

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  // if (columnIndex === 0) {
  //   if (rowIndex % 2 === 0) {
  //     return {
  //       rowspan: 2,
  //       colspan: 1,
  //     };
  //   } else {
  //     return {
  //       rowspan: 0,
  //       colspan: 0,
  //     };
  //   }
  // }
  // return [1, 1];
  if (columnIndex === 0) {
    const namespan = getSpanMethod(tableData, "name");
    return {
      rowspan: namespan[rowIndex],
      colspan: 1,
    };
  } else {
    return {
      rowspan: 1,
      colspan: 1,
    };
  }
};
const getSpanMethod = (data: any[], prop: string): any[] => {
  let position = 0; //当前遍历位置
  let temp = data[0][prop]; //获取第一列prop的值，遍历匹配目标值
  const result = [1]; //第一列第一个单元格默认为1
  for (let i = 1; i < data.length; i++) {
    if (data[i][prop] === temp) {
      result[position] += 1;
      result[i] = 0;
    } else {
      position = i;
      result[position] = 1;
      temp = data[i][prop];
    }
  }
  return result;
};

const tableData: User[] = [
  {
    id: "12987122",
    name: "Tom",
    amount1: "234",
    amount2: "3.2",
    amount3: 10,
  },
  {
    id: "12987123",
    name: "Tom",
    amount1: "165",
    amount2: "4.43",
    amount3: 12,
  },
  {
    id: "12987125",
    name: "Jack",
    amount1: "621",
    amount2: "2.2",
    amount3: 17,
  },
  {
    id: "12987126",
    name: "Jeni",
    amount1: "539",
    amount2: "4.1",
    amount3: 15,
  },
  {
    id: "12987123",
    name: "Jeni",
    amount1: "666",
    amount2: "6.1",
    amount3: 15,
  },
];
</script>
<style scoped>
</style>