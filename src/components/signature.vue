<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <!-- 編輯簽名區塊 -->
    <div class="sign-container"></div>
    <button type="button" @click="setSignature">建立簽名文件</button>
    <h3>簽名存檔</h3>
    <ul>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>
