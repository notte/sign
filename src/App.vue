<template>
  <div class="layout">
    <uploadFile />
    <signature />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import uploadFile from "./components/uploadFile.vue";

import signature from "./components/signature.vue";

export default defineComponent({
  components: { uploadFile, signature },
  setup() {
    return {};
  },
});
</script>
