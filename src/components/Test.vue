<!--
 * @Author: 关振俊
 * @Date: 2022-12-29 11:45:01
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-12-29 11:45:05
 * @Description: 
-->
<template>
  <div>
    <div class="change-size">
      <p>动态改变canvas大小</p>
      <span
        >例如:
        点击按钮2秒后，改变canvas高度，会引起canvas的重新加载，导致已经绘制好的内容丢失</span
      >
      <br />
      <button class="my-btn" @click="changeSize">{{ btnText }}</button>
      <canvas
        id="text"
        width="600"
        :height="tHeight"
        style="background: #ececec"
      ></canvas>
    </div>
  </div>
</template>
    
    <script>
import { onMounted, nextTick, ref } from "vue";

export default {
  name: "ChangeSize",
  setup() {
    const tHeight = ref(300),
      btnText = ref("改变canvas高度");

    let timeOut = 3000,
      canvasCtx = null;

    onMounted(() => {
      nextTick(() => {
        canvasCtx = document.querySelector("#text").getContext("2d");
        drawText();
      });
    });
    // 重点来了; //
    const changeSize = () => {
      // 获取画布像素数据
      const data = canvasCtx.getImageData(0, 0, 600, 300);
      btnText.value = `${timeOut / 1000}s后canvas高度改变`;
      const loop = setInterval(() => {
        console.log(timeOut);
        if (timeOut > 0) {
          timeOut -= 1000;
          btnText.value = `${timeOut / 1000}s后canvas高度改变`;
        } else {
          btnText.value = "改变canvas高度";
          clearInterval(loop);
          tHeight.value = 200;
          // 延时操作，为了确保画布已经重新加载
          setTimeout(() => {
            canvasCtx.putImageData(data, 0, 0);
          }, 0);
        }
      }, 1000);
    };
    const drawText = () => {
      canvasCtx.fillStyle = "red";
      canvasCtx.font = "28px sans-serif";
      let x = 20,
        y = 100;
      const string = "HELLO WORLD !";
      canvasCtx.fillText(string, x, y);
      canvasCtx.save();
    };

    return {
      tHeight,
      btnText,
      changeSize,
    };
  },
};
</script>
    