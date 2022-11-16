<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <!-- 編輯簽名區塊 -->
    <canvas class="sign-container" ref="sign" id="sign" />
    <button type="button" class="claer-button" @click="clearSignature">
      清除簽名
    </button>
    <button type="button" @click="setSignature">建立簽名</button>
    <signlist :type="'signature'" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import signlist from "./signlist.vue";
import { signStore } from "../store/index";

interface IState {
  ctx: CanvasRenderingContext2D | null;
  events: string[] | null;
}

export default defineComponent({
  components: { signlist },
  setup() {
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let state: IState;
    const signStores = signStore();
    const sign = ref();

    onMounted(() => {
      canvas = sign.value as HTMLCanvasElement;
      ctx = canvas.getContext("2d");
      state = {
        ctx,
        events:
          "ontouchstart" in window
            ? ["touchstart", "touchmove", "touchend"]
            : ["mousedown", "mousemove", "mouseup"],
      };

      if (state.events) {
        canvas.addEventListener(state.events[0], startEventHandler, false);
      }
    });

    function startEventHandler(event): void {
      event.preventDefault();
      ctx?.beginPath();
      canvas?.addEventListener(state.events![1], moveEventHandler, false);
      canvas?.addEventListener(state.events![2], endEventHandler, false);
    }

    function moveEventHandler(event): void {
      event.preventDefault();
      let evt;

      if (event.touches) {
        evt = event.touches[0];
      } else {
        evt = event;
      }

      const coverPos = canvas?.getBoundingClientRect();
      const mouseX = evt.clientX - coverPos!.left;
      const mouseY = evt.clientY - coverPos!.top;
      ctx?.lineTo(mouseX, mouseY);
      ctx?.stroke();
    }

    function endEventHandler(event): void {
      event.preventDefault();
      ctx?.closePath();

      canvas?.removeEventListener(state.events![1], moveEventHandler, false);
      canvas?.removeEventListener(state.events![2], endEventHandler, false);
    }

    function clearSignature(): void {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
    }

    function setSignature(): void {
      const signItem = canvas?.toDataURL("image/png");

      if (signStores.signOne === "") {
        signStores.setSignOne(signItem);
        clearSignature();
      } else if (signStores.signSec === "") {
        signStores.setSignSec(signItem);
        clearSignature();
      } else {
        alert("僅能保存兩個簽名紀錄");
      }
    }

    return {
      sign,
      ctx,
      canvas,
      signStores,
      clearSignature,
      setSignature,
    };
  },
});
</script>
