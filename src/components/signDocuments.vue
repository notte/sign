<template>
  <div class="signature">
    <p class="steps">3. 文件簽名編輯</p>
    <canvas id="sign-canvas"></canvas>
    <div class="download">
      <button type="button" @click="setSigned('pdf')">下載 PDF</button>
      <button type="button" @click="setSigned('jpg')">下載 JPG</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";

export default defineComponent({
  components: {},
  props: ["signData"],
  setup(props) {
    let canvas: fabric.Canvas;
    const pdfSize = {
      width: 0,
      height: 0,
    };
    const signDatas = props!.signData;
    const scroll: HTMLElement | null = document.querySelector(".scroll");

    onMounted(() => {
      if (scroll) {
        scroll.classList.add("h-auto");
      }
      canvas = new fabric.Canvas("sign-canvas");

      fabric.Image.fromURL(signDatas.sign, (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        canvas.add(img).renderAll();
      });

      fabric.Image.fromURL(signDatas.canvas, (img) => {
        canvas.setBackgroundImage(signDatas.canvas, () => canvas.renderAll());
        canvas.setHeight(img.height as number);
        canvas.setWidth(img.width as number);
        pdfSize.width = img.width as number;
        pdfSize.height = img.height as number;
      });

      canvas.on("object:moving", (e) => {
        // 阻止对象移动到画布外面
        const padding = 0; // 内容距离画布的空白宽度，主动设置
        const obj: any = e.target;
        if (
          obj.currentHeight > obj.canvas.height - padding * 2 ||
          obj.currentWidth > obj.canvas.width - padding * 2
        ) {
          return;
        }
        obj.setCoords();
        if (
          obj.getBoundingRect().top < padding ||
          obj.getBoundingRect().left < padding
        ) {
          obj.top = Math.max(
            obj.top,
            obj.top - obj.getBoundingRect().top + padding
          );
          obj.left = Math.max(
            obj.left,
            obj.left - obj.getBoundingRect().left + padding
          );
        }
        if (
          obj.getBoundingRect().top + obj.getBoundingRect().height >
            obj.canvas.height - padding ||
          obj.getBoundingRect().left + obj.getBoundingRect().width >
            obj.canvas.width - padding
        ) {
          obj.top = Math.min(
            obj.top,
            obj.canvas.height -
              obj.getBoundingRect().height +
              obj.top -
              obj.getBoundingRect().top -
              padding
          );
          obj.left = Math.min(
            obj.left,
            obj.canvas.width -
              obj.getBoundingRect().width +
              obj.left -
              obj.getBoundingRect().left -
              padding
          );
        }
      });
    });

    onBeforeUnmount(() => {
      if (scroll) {
        scroll.classList.remove("h-auto");
      }
    });
    function setSigned(type: string): void {
      const signed = (canvas as unknown as HTMLCanvasElement).toDataURL(
        "image/jpeg",
        1.0
      );

      if (type === "pdf") {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF("p", "pt", [pdfSize.width, pdfSize.height], true);
        doc.addImage(signed, "PNG", 0, 0, pdfSize.width, pdfSize.height);

        doc.save("signed.pdf");
      }

      if (type === "jpg") {
        saveAs(signed, "signed.jpg");
      }
    }

    return { setSigned };
  },
});
</script>
<style scoped lang="scss">
.scroll {
  height: auto !important;
}
</style>
