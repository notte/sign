<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p class="steps">1. 上傳文件</p>
  <div class="uploadfile">
    <label for="upload">
      <input
        class="upload"
        id="upload"
        type="file"
        accept="image/*,.pdf"
        capture
        aria-label="file"
        ref="file"
        @change="handleFiles($event)"
      />
      請選擇檔案
    </label>
    <p v-if="fileName === ''">或拖曳檔案至此處</p>
    <p>{{ fileName }}</p>
    <canvas class="pdf-item" :id="`pdf-canvas-${item}`"></canvas>
    <!-- <preview /> -->
  </div>
  <button type="button" class="active" @click="uploadFile">上傳簽署文件</button>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// import preview from "./components/preview.vue";
import * as pdfjs from "pdfjs-dist";
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// const pdfjs = await import("pdfjs-dist/build/pdf");

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default defineComponent({
  // components: { preview },
  setup() {
    const file = ref();
    const fileName = ref<string>("");

    onMounted(() => {
      const fileID = document.getElementById("upload");
      fileID?.addEventListener("change", () => {
        if (file.value.files.length > 0) {
          fileName.value = file.value.files[0].name;
        } else {
          fileName.value = "";
        }
      });
    });

    function uploadFile(): void {
      // console.log(file.value);
    }

    function handleFiles(event: Event): void {
      const fileReader = new FileReader();
      const fileType = (event as any).target.files[0].type;
      fileReader.readAsDataURL((event as any).target.files[0]);

      fileReader.onload = (res) => {
        if (res.target) {
          const buffer = res.target.result;
          // var typedarray = new Uint8Array(this.result);
          if (res.target.result) {
            const review = pdfjs.getDocument(res.target.result);
            console.log(review);
          }
        }
      };
    }

    return { file, fileName, uploadFile, handleFiles };
  },
});
</script>
