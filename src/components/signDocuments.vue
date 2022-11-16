<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <p class="steps">3. 文件簽名編輯</p>
    <!-- 上傳文件 review -->
    <canvas id="sign-canvas" width="600" height="400"></canvas>
    <button type="button" @click="setSignature">完成簽署</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { fabric } from "fabric";

export default defineComponent({
  components: {},
  props: ["signData"],
  setup(props) {
    let canvas: fabric.Canvas;
    const signDatas = props!.signData;

    onMounted(() => {
      canvas = new fabric.Canvas("sign-canvas");

      fabric.Image.fromURL(signDatas.sign, (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        canvas.add(img).renderAll();
      });

      if (signDatas.type !== "application/pdf") {
        fabric.Image.fromURL(signDatas.canvas, (img) => {
          canvas.setBackgroundImage(signDatas.canvas, () => canvas.renderAll());
          canvas.setHeight(img.height);
          canvas.setWidth(img.width);
        });
      } else {
        console.log(signDatas.canvas);
      }
    });
    return { canvas };
  },
});
</script>
