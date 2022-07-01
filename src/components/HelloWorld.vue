<!--
 * @Author: 关振俊
 * @Date: 2022-06-17 10:23:42
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-06-28 15:10:48
 * @Description: 
-->

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import Mock from 'mockjs'

defineProps();

interface User {
  date: string
  name: string
  address: string
}

const mockData=Mock.mock({
  "data|20":[
    {
      "date":"@date",
      "name":"@name",
      "address":"@county(true)"
    }
  ]
})

const search = ref('')
const tableData: User[] = reactive(mockData.data)
console.log(mockData)
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Date" prop="date" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Address" prop="address" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
</style>
