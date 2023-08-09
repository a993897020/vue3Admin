<!--
 * @Author: 关振俊
 * @Date: 2022-07-01 16:07:26
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-11-01 18:00:36
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
  console.log(canvasImgList.value);
  // toFile();
};
/**生成文件 */
const toFile = () => {
  const base64 = canvasImgList.value[0].split(",")[1];
  const fileType = "pdf";
  const fileName = "canvas文件";
  let typeHeader = "data:application/" + fileType + ";base64,"; // 定义base64 头部文件类型
  const converedBase64 = typeHeader + base64;
  const blob: any = base64ToBlob(canvasImgList.value[0], fileType);
  downloadExportFile(blob, fileName, fileType);
};
/**
 * desc: base64对象转blob文件对象
 * @param urlData  ：数据的base64对象
 * @param type  ：类型 png,pdf,doc,mp3等;
 * @returns {Blob}：Blob文件对象
 **/
const base64ToBlob = (base64: string, type: string) => {
  let arr = base64.split(",");
  let array = arr[0].match(/:(.*?);/);
  let mime = (array && array.length > 1 ? array[1] : type) || type;
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime,
  });
};
/**
 * desc: 下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param fileType  ：文件类 word(docx) excel(xlsx) ppt等
 */
const downloadExportFile = (blob: any, fileName: string, fileType: string) => {
  let downloadElement = document.createElement("a");
  let href = blob;
  if (typeof blob == "string") {
    downloadElement.target = "_blank";
  } else {
    href = window.URL.createObjectURL(blob); //创建下载的链接
  }
  downloadElement.href = href;
  downloadElement.download = fileName + "." + fileType; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //触发点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  if (typeof blob != "string") {
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
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