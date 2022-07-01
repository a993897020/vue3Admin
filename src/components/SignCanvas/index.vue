<!--
 * @Author: 关振俊
 * @Date: 2022-07-01 16:07:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-01 17:19:58
 * @Description: 画布签名
-->
<template>
  <div class="sign-canvas-wrap">
    <h1>签名功能</h1>
    <div class="canvas-wrap">
      <canvas
        ref="signCanvas"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      ></canvas>
    </div>
    <div class="btn-wrap">
      <el-button @click="clearCanvas">清空</el-button>
      <el-button @click="createCancas">生成</el-button>
    </div>
    <div class="canvas-img-list">
      <img
        :src="item"
        alt=""
        v-for="(item, i) in canvasImgList"
        @click="() => canvasImgList.splice(i, 1)"
        :key="i"
      />
    </div>
  </div>
</template>
<script lang='ts' setup>
import { onMounted, Ref, ref } from "vue";
const signCanvas: Ref<any> = ref();
const ctx = ref();
const isWrite = ref(false);
const x = ref(0);
const y = ref(0);
const canvasWidth = ref(300);
const canvasHeight = ref(150);
const canvasImgList: any = ref([]);
const initCanvas = () => {
  if (signCanvas.value) {
    signCanvas.value.width = canvasWidth.value;
    signCanvas.value.height = canvasHeight.value;
    ctx.value = signCanvas.value.getContext("2d");
    x.value = 0;
    y.value = 0;
    isWrite.value = false;
  }
};
const handleMouseDown = (e: any) => {
  console.log("down");
  // 开始绘画
  isWrite.value = true;
  writeCanvas(e);
};
const handleMouseMove = (e: any) => {
  console.log("move");
  // 绘画中
  writeCanvas(e);
};
const handleMouseUp = (e: any) => {
  console.log("up");
  // 结束绘画
  writeCanvas(e);
  isWrite.value = false;
};
/**绘画画布 */
const writeCanvas = (e: any) => {
  if (isWrite.value) {
    ctx.value.strokeStyle = "red"; //笔触颜色
    ctx.value.lineWidth = 2; //线条宽度
    ctx.value.beginPath(); // 开始绘画
    ctx.value.moveTo(x.value, y.value); //把画布移动到路径的指定点
    ctx.value.lineTo(e.offsetX, e.offsetY); //在画布创建该点到最后指定点线条
    ctx.value.stroke(); //绘制已定义的路线
  }
  x.value = e.offsetX;
  y.value = e.offsetY;

  console.log("e==", e);
};
/**清空画布 */
const clearCanvas = () => {
  console.log("clear");
  ctx.value.beginPath();
  ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value); //填充画布
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value); //清空画布
};
/**生成画布 */
const createCancas = () => {
  console.log("create");
  const url: string = signCanvas.value.toDataURL("image/png", 1); //生成画布base64
  canvasImgList.value.push(url);
};
onMounted(() => {
  initCanvas();
});
</script>
<style scoped lang="scss">
.sign-canvas-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  & > h1 {
    margin-bottom: 30px;
  }
  .canvas-wrap {
    & > canvas {
      border: 1px solid black;
    }
  }
}
</style>