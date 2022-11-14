<template>
  <div class="tabs" ref="tabs">
    <button class="active" @click="setTabs(upload, $event)">簽署文件</button>
    <button @click="setTabs(signature, $event)">建立簽名</button>
  </div>
  <div class="layout">
    <!-- <preview /> -->
    <uploadFile v-if="isShow(upload)" />
    <preview v-if="isShow(preview)" :fileItem="fileItem" />
    <signDocuments v-if="isShow(documents)" />
    <signature v-if="isShow(signature)" />
    <complete v-if="isShow(complete)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import uploadFile from "./components/uploadFile.vue";
import signature from "./components/signature.vue";
import signDocuments from "./components/signDocuments.vue";
import complete from "./components/complete.vue";
import preview from "./components/preview.vue";
import * as Status from "./models/status/type";
import EventBus from "./utilities/event-bus";

export default defineComponent({
  components: { uploadFile, signature, signDocuments, complete, preview },
  setup() {
    const current = ref(Status.SignType.upload);
    const documents = ref(Status.SignType.documents);
    const upload = ref(Status.SignType.upload);
    const signature = ref(Status.SignType.signature);
    const complete = ref(Status.SignType.complete);
    const preview = ref(Status.SignType.preview);
    const tabs = ref();
    const fileItem = ref();

    EventBus.on("upload_file", (file) => {
      current.value = preview.value;
      fileItem.value = file;
    });

    function isShow(page: Status.SignType): boolean {
      return current.value === page;
    }

    function setTabs(page: Status.SignType, e: Event): void {
      current.value = page;
      for (const item of tabs.value.children) {
        item.className = "";
      }
      (e as any).target.className = "active";
    }

    return {
      current,
      documents,
      upload,
      signature,
      complete,
      preview,
      tabs,
      fileItem,
      isShow,
      setTabs,
    };
  },
});
</script>
