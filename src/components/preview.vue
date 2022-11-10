<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pdf-preview"></div>
  <div class="pdf-wrap">
    <vue-pdf-embed
      :source="state.source"
      :style="scaleFun"
      class="vue-pdf-embed"
      :page="state.pageNum"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
// import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm";

export default defineComponent({
  components: {},
  props: ["pdfUrl"],
  setup(props) {
    const pdfUrls = ref<string>(props.pdfUrl);
    const state = reactive({
      source: pdfUrls.value,
      pageNum: 1,
      scale: 1,
      numPages: 0,
    });

    onMounted(() => {
      const loadingTask = createLoadingTask(state.source);
      loadingTask.promise.then((pdf: { numPages: number }) => {
        state.numPages = pdf.numPages;
      });
    });

    return { pdfUrls, state };
  },
});
</script>
<style lang="css" scoped>
.pdf-preview {
  position: relative;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  background: rgb(66, 66, 66);
}

.vue-pdf-embed {
  text-align: center;
  width: 515px;
  border: 1px solid #e5e5e5;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>