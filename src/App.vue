<template>
  <div>
    <p>123</p>
    <h1>ABCSD</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    function base() {
      return 1;
    }
    return { base };
  },
});
</script>
