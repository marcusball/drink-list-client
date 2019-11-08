<template>
  <div class="columns">
    <div class="col-6">
      {{ drink.drank_on }}, {{ drink.name }}, {{ drink.min_abv.num }}%,
      {{ drink.volume[0].num }} {{ drink.volume[1] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Drink extends Vue {
  @Prop()
  private drink!: any;
}
</script>
