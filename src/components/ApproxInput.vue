<template>
  <div>
    <input
      type="text"
      @input="$emit('input', $event.target.value)"
      :value="inputValue"
    />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    inputValue: String,
  }
});
</script>