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
    <canvas class="pdf-item"></canvas>
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
      const fileItem = (event as any).target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(fileItem);

      fileReader.onload = function () {
        // console.log(fileReader.result);
        const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);

        // const review = pdfjs.getDocument(typedarray);
        // console.log(review);
        const loadingTask = pdfjs.getDocument(typedarray);
        loadingTask.promise.then((pdf: any) => {
          console.log(pdfjsWorker);
        });
      };
    }

    return { file, fileName, uploadFile, handleFiles };
  },
});
</script>
