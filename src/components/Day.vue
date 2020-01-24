<template>
  <div>
    <h3>{{ formattedDate }}</h3>

    <div v-if="day.morning.length">
      <h5 class="bg-primary p-2">Morning</h5>
      <Drink
        v-for="drink in day.morning"
        :key="drink.id"
        :drink="drink"
        @update:drink="$emit('update:drink', $event)"
      >
      </Drink>

      <div class="divider"></div>
    </div>

    <div v-if="day.afternoon.length">
      <h5 class="bg-primary p-2">Afternoon</h5>
      <Drink
        v-for="drink in day.afternoon"
        :key="drink.id"
        :drink="drink"
        @update:drink="$emit('update:drink', $event)"
      >
      </Drink>
    </div>

    <div v-if="day.evening.length">
      <h5 class="bg-primary p-2">Evening</h5>
      <Drink
        v-for="drink in day.evening"
        :key="drink.id"
        :drink="drink"
        @update:drink="$emit('update:drink', $event)"
      >
      </Drink>
    </div>

    <div v-if="day.night.length">
      <h5 class="bg-primary p-2">Night</h5>
      <Drink
        v-for="drink in day.night"
        :key="drink.id"
        :drink="drink"
        @update:drink="$emit('update:drink', $event)"
      >
      </Drink>
    </div>

    <div class="divider"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Day from "@/classes/Day";
import Drink from "@/components/Drink";

import format from "date-fns/format";

@Component({
  components: {
    Drink
  }
})
export default class DayComponent extends Vue {
  @Prop()
  private day!: Day;

  get formattedDate() {
    return format(this.day!.date, "d MMM yyyy");
  }
}
</script>
