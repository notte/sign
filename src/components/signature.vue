<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <!-- 編輯簽名區塊 -->
    <canvas class="sign-container" ref="sign" />
    <button type="button" class="claer_button" @click="clearSignature">
      清除簽名
    </button>
    <button type="button" @click="setSignature">建立簽名</button>
    <ul>
      <li><button>刪除</button></li>
      <li><button>刪除</button></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { signStore } from "../store/index";

export default defineComponent({
  components: {},
  setup() {
    const signStores = signStore();
    const sign = ref();
    const events =
      "ontouchstart" in window
        ? ["touchstart", "touchmove", "touchend"]
        : ["mousedown", "mousemove", "mouseup"];

    onMounted(() => {
      const canvas = sign.value as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      canvas.addEventListener(events[0], startEventHandler, false);
      canvas.addEventListener(events[1], moveEventHandler, false);
      canvas.addEventListener(events[2], endEventHandler, false);
    });

    function moveEventHandler(event: any): void {
      event.preventDefault();
      const { ctx, isSupportTouch } = state;
      const evt = isSupportTouch ? event.touches[0] : event;
      const coverPos = canvas.getBoundingClientRect();
      const mouseX = evt.clientX - coverPos.left;
      const mouseY = evt.clientY - coverPos.top;
      cxt.lineTo(mouseX, mouseY);
      cxt.stroke();
    }

    // let beginX: number, beginY: number;
    // onMounted(() => {
    //   const canvas = sign.value as HTMLCanvasElement;
    //   const ctx = canvas.getContext("2d");
    //   if (ctx && canvas) {
    //     ctx.fillStyle = "#fff";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    //     canvas.addEventListener("touchstart", (event) => {
    //       event.preventDefault();
    //       beginX = event.touches[0].clientX - canvas.offsetLeft;
    //       beginY = event.touches[0].pageY - canvas.offsetTop;
    //     });
    //     canvas.addEventListener("touchmove", (event) => {
    //       event.preventDefault();
    //       event = event.touches[0];
    //       const stopX = event.clientX - canvas.offsetLeft;
    //       const stopY = event.pageY - canvas.offsetTop;
    //       writing(beginX, beginY, stopX, stopY, ctx);
    //       beginX = stopX;
    //       beginY = stopY;
    //     });
    //   }
    // });

    // function writing(
    //   beginX: number,
    //   beginY: number,
    //   stopX: number,
    //   stopY: number,
    //   ctx: any
    // ): void {
    //   ctx.beginPath();
    //   ctx.globalAlpha = 1;
    //   ctx.lineWidth = 3;
    //   ctx.strokeStyle = "#34363a";
    //   ctx.moveTo(beginX, beginY);
    //   ctx.lineTo(stopX, stopY);
    //   ctx.closePath();
    //   ctx.stroke();
    // }

    // function clearSignature(): void {
    //   const canvas = sign.value as HTMLCanvasElement;
    //   const ctx = canvas.getContext("2d");
    //   if (ctx) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   }
    // }

    // function setSignature(): void {
    //   const canvas = sign.value as HTMLCanvasElement;
    //   const signItem = canvas.toDataURL("image/png");

    //   if (signStores.getSignOne === "") {
    //     signStores.setSignOne(signItem);
    //   } else if (signStores.getSignSec === "") {
    //     signStores.setSignSec(signItem);
    //   } else {
    //     console.log("too many");
    //   }
    // }

    // return { sign, signStores, writing, clearSignature, setSignature };
    return { sign, signStores, events };
  },
});
</script>
