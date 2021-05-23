<template>
  <div>
    <h3>
      <a v-if="enableDayLink" :href="day.linkToDayPage">{{ formattedDate }}</a>
      <span v-else>{{ formattedDate }}</span>
    </h3>

    <div v-if="day.morning.length">
      <h5 class="bg-primary p-2">Morning</h5>
      <Drink
        v-for="drink in day.morning"
        :key="drink.id"
        :drink="drink"
        :showIncrement="showIncrement"
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
        :showIncrement="showIncrement"
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
        :showIncrement="showIncrement"
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
        :showIncrement="showIncrement"
        @update:drink="$emit('update:drink', $event)"
      >
      </Drink>
    </div>

    <div class="divider"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Day from "@/classes/Day";
import Drink from "./Drink.vue";

import format from "date-fns/format";

export default defineComponent({
  components: {
    Drink,
  },

  props: {
    day: Object as PropType<Day>,

    /**
     * When enabled, show the button for incrementing drink quantities. 
     */
    showIncrement: {
      type: Boolean,
      default: true,
    },

    /**
     * When enabled, have the header link to the page for viewing/modifying that specific date.
     */
    enableDayLink: {
      type: Boolean,
      default: true,
    }
  },

  computed: {
    formattedDate(): string {
      return format(this.day!.date, "d MMM yyyy");
    },
  }
});

</script>
