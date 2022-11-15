<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <canvas id="the-canvas"></canvas>
  <signlist />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import signlist from "./signlist.vue";
// import { fabric } from "fabric";
import * as pdfjs from "pdfjs-dist";
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default defineComponent({
  components: { signlist },
  props: ["fileItem"],
  setup(props) {
    const doc = ref();

    onMounted(() => {
      const watchDoc = document.getElementById("the-canvas");
      // const fabricCanvas = new fabric.Canvas(watchDoc);

      // watchDoc.addEventListener("mousemove", (e) => {
      //   console.log(e);
      // });

      console.log(doc.value, document.getElementById("the-canvas"));

      const fileItems = props.fileItem;
      console.log(fileItems.type);

      if (fileItems.type === "application/pdf") {
        setPdf(fileItems);
      }
      if (fileItems.type === "image/png" || fileItems.type === "image/jpeg") {
        setImage(fileItems);
      }
    });

    function setPdf(file: any): void {
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
    function setImage(file: any): void {
      const fileReader = new FileReader();
      const canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      const image = new Image();

      fileReader.readAsDataURL(file);

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);
      };
      fileReader.onload = () => {
        image.src = fileReader.result as string;
      };
    }

    return { setPdf, setImage };
  },
});
</script>
