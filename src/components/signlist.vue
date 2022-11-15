<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <ul>
      <li v-if="signStores.signOne !== ''">
        <img :src="signOne" alt="" /><button @click="signStores.signOne = ''">
          <img src="../assets/close.png" alt="" />
        </button>
      </li>
      <li v-if="signStores.signSec !== ''">
        <img :src="signSec" alt="" /><button @click="signStores.signSec = ''">
          <img src="../assets/close.png" alt="" />
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { signStore } from "../store/index";

export default defineComponent({
  components: {},
  setup() {
    const signStores = signStore();
    const signOne = ref<string>(signStores.signOne);
    const signSec = ref<string>(signStores.signSec);

    watch([() => signStores.signOne, () => signStores.signSec], () => {
      signOne.value = signStores.signOne;
      signSec.value = signStores.signSec;
    });

    return {
      signStores,
      signOne,
      signSec,
    };
  },
});
</script>
