<template>
  <div class="layout">

    <div class="document">
      <label for="upload">
        請選擇文件
        <input class="upload" id="upload" type="file" accept="image/*,.pdf" capture aria-label="file" ref="file" />
      </label>
      <p>{{ fileName }}</p>
      <button type="button" class="active" @click="uploadFile">上傳簽署文件</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const file = ref();
    const fileName = ref<string>('');
    watch(() => file.value, () => {
      if (file.value.files) {
        // console.log(file.value.files[0].name);
      }
    });
    function uploadFile() {
      // console.log(file.value.files[0].name);
    }
    return { file, fileName, uploadFile };
  },
});
</script>
