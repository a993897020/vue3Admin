<!--
 * @Author: 关振俊
 * @Date: 2022-07-01 16:07:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-07-14 17:44:17
 * @Description: 画布签名
-->
<template>
  <div class="sign-canvas-wrap">
    <h1>签名功能</h1>
    <div class="canvas-wrap" :style="canvasWrapS" ref="canvasWrap">
      <canvas
        ref="signCanvas"
        :style="canvasS"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      ></canvas>
    </div>
    <div class="btn-wrap">
      <el-button @click="clearCanvas">清空</el-button>
      <el-button @click="createCancas">生成</el-button>
      <el-button @click="rorateCancas">选择90°</el-button>
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
import { computed, onMounted, Ref, ref } from "vue";
const signCanvas: Ref<any> = ref();
const ctx = ref();
const isWrite = ref(false);
const x = ref(0);
const y = ref(0);
const canvasWidth = ref(300);
const canvasHeight = ref(150);
const canvasImgList: any = ref([]);
const isRotate = ref(false);
const canvasWrap: Ref<any> = ref();
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
  const width = isRotate.value ? canvasHeight.value : canvasWidth.value;
  const height = isRotate.value ? canvasWidth.value : canvasHeight.value;
  ctx.value.fillRect(0, 0, width, height); //填充画布
  ctx.value.clearRect(0, 0, width, height); //清空画布
};
/**生成画布 */
const createCancas = () => {
  console.log("create");
  const url: string = signCanvas.value.toDataURL("image/png", 1); //生成画布base64
  canvasImgList.value.push(url);
};
/**切换横竖屏 */
const rorateCancas = () => {
  isRotate.value = !isRotate.value;
  if (!isRotate.value) {
    // 竖屏
    signCanvas.value.height = canvasHeight.value;
    signCanvas.value.width = canvasWidth.value;
  } else {
    // 横屏
    //将签名还原翻转，就可以保证在横屏情况下保证画笔的方向跟手势一致，然后再进行高度和宽度的调整。
    signCanvas.value.height = canvasWidth.value;
    signCanvas.value.width = canvasHeight.value;
  }
};
const canvasWrapS = () => {
  return {
    width: isRotate.value
      ? canvasHeight.value + "px"
      : canvasWidth.value + "px",
    height: isRotate.value
      ? canvasWidth.value + "px"
      : canvasHeight.value + "px",
    transform: `rotate(${isRotate.value ? "90deg" : "0deg"})`,
    transformOrigin: `${canvasHeight.value / 2}px ${canvasHeight.value / 2}px`,
  };
};
const canvasS = () => {
  return {
    transform: `rotate(${isRotate.value ? "-90deg" : "0deg"})`,
    transformOrigin: isRotate.value
      ? `${canvasHeight.value / 2}px ${canvasHeight.value / 2}px`
      : `${canvasWidth.value / 2}px ${canvasWidth.value / 2}px`,
  };
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