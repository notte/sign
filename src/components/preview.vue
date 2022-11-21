<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p class="steps">2. 選定簽名，進行輸出合併</p>
  <canvas id="the-canvas"></canvas>
  <signlist :type="'preview'" />
  <button @click="setPrint">輸出</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import signlist from "./signlist.vue";
import EventBus from "../utilities/event-bus";
import * as pdfjs from "pdfjs-dist";

const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default defineComponent({
  components: { signlist },
  props: ["fileItem"],
  setup(props) {
    const currentType = ref<string>("");
    const currentSign = ref<string>("");
    const currentCanvas = ref<string>("");

    EventBus.on("current-sign", (sign) => {
      currentSign.value = sign as string;
    });

    onMounted(() => {
      const fileItems = props.fileItem;

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
      currentType.value = "application/pdf";

      fileReader.onload = () => {
        const loadingTask = pdfjs.getDocument({ data: fileReader.result });

        loadingTask.promise.then((pdf: any) => {
          const pageNumber = 1;
          pdf.getPage(pageNumber).then((page: any) => {
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
              const bg = canvas.toDataURL("image/jpeg");
              currentCanvas.value = bg as string;
            });
          });
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
        currentCanvas.value = fileReader.result as string;
        currentType.value = "image/png";
      };
    }
    function setPrint(): void {
      if (currentSign.value === "") {
        alert("請選擇一個簽名，或建立新的簽名。");
      } else {
        EventBus.emit("set_print", {
          type: currentType.value,
          sign: currentSign.value,
          canvas: currentCanvas.value,
        });
      }
    }

    return {
      setPdf,
      setImage,
      setPrint,
      currentSign,
      currentCanvas,
      currentType,
    };
  },
});
</script>
