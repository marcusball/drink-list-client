<template>
  <div>
    <input
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
});
</script>