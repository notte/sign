<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <p class="steps">1. 上傳文件</p>
  <div class="uploadfile" id="drop-area">
    <label for="upload">
      <input
        class="upload"
        id="upload"
        type="file"
        accept="image/*,.pdf"
        ref="file"
        @change="handleFiles($event)"
      />
      請選擇檔案
    </label>
    <p v-if="fileName === ''">或拖曳檔案至此處</p>
    <p>{{ fileName }}</p>
  </div>
  <button
    type="button"
    :class="getFile === true ? 'disabled' : ''"
    @click.once="uploadFile"
    :disabled="getFile"
  >
    上傳簽署文件
  </button>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EventBus from "../utilities/event-bus";

export default defineComponent({
  setup() {
    const file = ref();
    const dropFile = ref();
    const fileName = ref<string>("");
    const fileItem = ref<string | undefined | File>("");
    const getFile = ref<boolean>(true);

    function uploadFile(): void {
      EventBus.emit("upload_file", fileItem.value);
    }

    function handleFiles(event: any): void {
      fileItem.value = event.target.files[0];
      fileName.value = event.target.files[0].name;
      getFile.value = false;
    }

    onMounted(() => {
      const dropArea = document.getElementById("drop-area");
      if (dropArea) {
        dropArea.addEventListener("drop", (e) => {
          e.stopPropagation();
          e.preventDefault();
          fileName.value = e.dataTransfer?.files[0].name as string;
          fileItem.value = e.dataTransfer?.files[0];
          getFile.value = false;
        });

        dropArea.addEventListener("dragleave", (e) => {
          e.stopPropagation();
          e.preventDefault();
        });
        dropArea.addEventListener("dragenter", (e) => {
          e.stopPropagation();
          e.preventDefault();
        });
        dropArea.addEventListener("dragover", (e) => {
          e.stopPropagation();
          e.preventDefault();
        });
      }
    });

    return { file, dropFile, fileName, getFile, uploadFile, handleFiles };
  },
});
</script>
