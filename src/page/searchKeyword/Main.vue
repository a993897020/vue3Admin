<!--
 * @Author: 关振俊
 * @Date: 2022-11-18 11:41:10
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-11-18 17:33:09
 * @Description: 查找关键字
-->
<template>
  <div>
    <div class="item">
      <el-button @click="randomCreateParagraph('ch')"
        >随机生成中文文本</el-button
      >
      <el-button @click="randomCreateParagraph('en')"
        >随机生成英文文本</el-button
      >
    </div>
    <div class="item">
      <el-input
        v-model="keyword"
        placeholder="Please input"
        class="input-with-select"
        @input="handleSearchKeyword"
      >
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
    <div class="item">
      <p>搜索到的关键字数：{{ keywordNum }}</p>
    </div>
    <div class="item">
      <div v-html="htmlContent"></div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { Search } from "@element-plus/icons-vue";
import { Random } from "mockjs";
import { onMounted, ref, Ref } from "vue";
const keyword: Ref<string> = ref("");
const keywordNum: Ref<number> = ref(0);
const content: Ref<string> = ref("");
const htmlContent: Ref<string> = ref("");
onMounted(() => {
  randomCreateParagraph("ch");
});
/**随机生成中英文文本 */
const randomCreateParagraph = (type: "ch" | "en"): void => {
  const textMaxLength = 100;
  const textMinLength = 50;
  const text = {
    en: Random.paragraph(textMinLength, textMaxLength),
    ch: Random.cparagraph(textMinLength, textMaxLength),
  };
  content.value = htmlContent.value = text[type];
};
/**在内容中标记关键字并计算出匹配关键字数量 */
const handleSearchKeyword = () => {
  if (!!keyword.value.trim()) {
    const keywordArr = keyword.value.split(" ");
    let text = content.value;
    keywordArr.forEach((p) => {
      let reg = "/" + p + "/g";
      text = text.replace(eval(reg), `<mark>${p}</mark>`);
    });
    keywordNum.value = getMarkTextNum(text);
    htmlContent.value = text;
  }
};
/**获取标记文字总数 */
const getMarkTextNum = (text: string): number => {
  let count = 0;
  let markText = "<mark>";
  let position = text.indexOf(markText);
  if (!text) return 0;
  while (position !== -1) {
    count += 1;
    position = text.indexOf(markText, position + 1);
  }
  return count;
};
</script>
<style scoped>
.item {
  margin-bottom: 20px;
}
</style>