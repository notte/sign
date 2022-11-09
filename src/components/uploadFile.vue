<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p class="steps">1. 上傳文件</p>
  <div class="uploadfile">
    <label for="upload">
      <input
        class="upload"
        id="upload"
        type="file"
        accept="image/*,.pdf"
        capture
        aria-label="file"
        ref="file"
        @change="handleFiles($event)"
      />
      請選擇檔案
    </label>
    <p v-if="fileName === ''">或拖曳檔案至此處</p>
    <p>{{ fileName }}</p>
  </div>
  <button type="button" class="active" @click="uploadFile">上傳簽署文件</button>
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

    function uploadFile(): void {
      console.log(file.value);
    }
    function handleFiles(event: Event): void {
      // const fileItem = new File();
      // let reader = new FileReader();
      console.log((event as any).target.files[0]);
    }
    return { file, fileName, uploadFile, handleFiles };
  },
});
</script>
