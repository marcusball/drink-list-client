<template>
  <div class="columns">
    <div class="column col-1 text-left">
      <sub v-for="context in drink.entry.context" :key="context">{{
        context
      }}</sub>
    </div>
    <div class="column col-1 text-left">{{ drink.entry.quantityString }}</div>
    <div class="column col-3 text-left">{{ drink.entry.name }}</div>
    <div class="column col-1 text-left">{{ drink.entry.abvString }}</div>
    <div class="column col-2 text-left">{{ drink.entry.volumeString }}</div>
    <div class="column col-2 text-left">
      {{ drink.aggregate.drinksString }} drinks
    </div>
    <div class="column col-2 text-left">
      {{ drink.aggregate.volumeString }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EntryPair from "@/classes/EntryPair";

@Component({})
export default class Drink extends Vue {
  @Prop()
  private drink!: EntryPair;
}
</script>
