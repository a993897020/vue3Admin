<!--
 * @Author: 关振俊
 * @Date: 2022-10-09 16:34:30
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-02 09:23:56
 * @Description: 父子双向绑定 v-model
-->
<template>
  <div>
    <el-input v-model="newValue"></el-input>
    <el-tag>
      {{ props.data }}
    </el-tag>
  </div>
</template>
<script lang='ts' setup>
import { computed, watch } from "vue";
interface IProps {
  modelValue: string;
  data: string;
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: "hello world",
  data: "666",
});
const emit = defineEmits(["update:modelValue"]);
watch(
  () => props.modelValue,
  () => {
    console.log(props.modelValue);
  }
);
const newValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>
<style scoped>
</style>