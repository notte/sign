<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <canvas id="the-canvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import * as pdfjs from "pdfjs-dist";
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default defineComponent({
  components: {},
  props: ["fileItem"],
  setup(props) {
    onMounted(() => {
      const fileItems = props.fileItem;

      PDF(fileItems);
    });

    function PDF(file: any): void {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = () => {
        const loadingTask = pdfjs.getDocument({ data: fileReader.result });

        loadingTask.promise
          .then((pdf) => {
            const pageNumber = 1;
            pdf.getPage(pageNumber).then((page) => {
              const scale = 1;
              const viewport = page.getViewport({ scale });

              const canvas = document.getElementById(
                "the-canvas"
              ) as HTMLCanvasElement;

              const context = canvas.getContext("2d");

              canvas.width = viewport.width;
              canvas.height = viewport.height;

              const renderContext = {
                canvasContext: context,
                viewport,
              };
              const renderTask = page.render(renderContext);
              renderTask.promise.then(function () {
                console.log("Page rendered");
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
    }
    return { PDF };
  },
});
</script>
