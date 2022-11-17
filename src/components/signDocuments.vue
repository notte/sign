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
import { defineComponent, onMounted } from "vue";
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

    onMounted(() => {
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
    });

    function setSigned(type: string): void {
      const signed = canvas.toDataURL("image/jpeg");

      if (type === "pdf") {
        // eslint-disable-next-line new-cap
        const doc = new jsPDF(undefined, "pt", [pdfSize.width, pdfSize.height]);
        doc.addImage(signed, "JPEG", 0, 0, pdfSize.width, pdfSize.height);
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
