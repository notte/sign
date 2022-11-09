<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signature">
    <p class="steps">2. 文件簽署</p>
    <!-- 上傳文件 review -->
    <div class="review"></div>
    <button type="button" @click="setSignature">完成文件簽署</button>
    <ul>
      <li></li>
      <li></li>
    </ul>
    <button class="small-button" type="button">使用</button>
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
