<template>
  <div class="columns">
    <div class="column col-2 text-left">
      {{ drink.drankOn }}
      <sub v-for="context in drink.context" :key="context">{{ context }}</sub>
    </div>
    <div class="column col-1 text-left">{{ drink.quantityString }}</div>
    <div class="column col-5 text-left">{{ drink.name }}</div>
    <div class="column col-2 text-left">{{ drink.abvString }}</div>
    <div class="column col-2 text-left">{{ drink.volumeString }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Entry from "@/classes/Entry";

@Component({})
export default class Drink extends Vue {
  @Prop()
  private drink!: Entry;
}
</script>
