<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <ul ref="signlist">
      <li
        v-if="signStores.signOne !== ''"
        @click="getSign($event, signStores.signOne)"
      >
        <img :src="signOne" alt="" />
        <button @click="signStores.signOne = ''" v-if="types === 'signature'">
          <img src="../assets/close.png" alt="" />
        </button>
      </li>
      <li
        v-if="signStores.signSec !== ''"
        @click="getSign($event, signStores.signSec)"
      >
        <img :src="signSec" alt="" />
        <button @click="signStores.signSec = ''" v-if="types === 'signature'">
          <img src="../assets/close.png" alt="" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { signStore } from "../store/index";
import EventBus from "../utilities/event-bus";

export default defineComponent({
  components: {},
  props: ["type"],
  setup(props) {
    const signStores = signStore();
    const signlist = ref();
    const signOne = ref<string>(signStores.signOne);
    const signSec = ref<string>(signStores.signSec);
    const types = ref<string>(props.type);

    watch([() => signStores.signOne, () => signStores.signSec], () => {
      signOne.value = signStores.signOne;
      signSec.value = signStores.signSec;
    });

    function getSign(event: Event, sign: string): void {
      event.stopPropagation();
      event.preventDefault();

      for (const item of signlist.value.children) {
        item.className = "";
      }

      for (const item of (event as any).path) {
        if (item.nodeName === "LI") {
          item.className = "active";
        }
      }
      EventBus.emit("current-sign", sign);
    }

    return {
      signStores,
      signOne,
      signSec,
      getSign,
      types,
      signlist,
    };
  },
});
</script>
