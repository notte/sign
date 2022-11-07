<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="document">
    <label for="upload">
      <input
        class="upload"
        id="upload"
        type="file"
        accept="image/*,.pdf"
        capture
        aria-label="file"
        ref="file"
      />
      請選擇檔案
    </label>
    <p>{{ fileName }}</p>
    <button type="button" class="active" @click="uploadFile(fileName)">
      上傳簽署文件
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const file = ref();
    const fileName = ref<string>("");

    onMounted(() => {
      const fileID = document.getElementById("upload");
      fileID?.addEventListener("change", () => {
        if (file.value.files.length > 0) {
          fileName.value = file.value.files[0].name;
        } else {
          fileName.value = "";
        }
      });
    });

    function uploadFile(name: string) {
      if (name) {
        console.log(name);
      }
    }
    return { file, fileName, uploadFile };
  },
});
</script>
