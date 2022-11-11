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
    <canvas id="the-canvas"></canvas>
  </div>
  <button type="button" class="active" @click="uploadFile">上傳簽署文件</button>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as pdfjs from "pdfjs-dist";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// const pdfjs = await import("pdfjs-dist/build/pdf");

const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
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
        const loadingTask = pdfjs.getDocument({ data: fileReader.result });

        loadingTask.promise.then(
          function (pdf: any) {
            console.log("PDF loaded");

            // Fetch the first page
            const pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page: any) {
              console.log("Page loaded");

              const scale = 0.3;
              const viewport = page.getViewport({ scale });

              // Prepare canvas using PDF page dimensions
              const canvas = document.getElementById(
                "the-canvas"
              ) as HTMLCanvasElement;
              if (canvas) {
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                  canvasContext: context,
                  viewport,
                };
                const renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                  console.log("Page rendered");
                });
              }
            });
          },
          function (reason: any) {
            // PDF loading error
            console.error(reason);
          }
        );
      };
    }

    return { file, fileName, uploadFile, handleFiles };
  },
});
</script>
