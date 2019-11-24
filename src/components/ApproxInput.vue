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
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({})
export default class ApproxInput extends Vue {
  @PropSync("value", { type: String }) inputValue!: String;
}
</script>