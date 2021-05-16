<template>
  <div>
    <button @click="previousDate" class="btn">&lt;</button>
    <span class="m-2">{{ displayDate }}</span>
    <button @click="nextDate" class="btn">&gt;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import isToday from "date-fns/isToday";
import isYesterday from "date-fns/isYesterday";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import format from "date-fns/format";

export default defineComponent({
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    }
  },

  computed: {
    displayDate(): string {
      if (isToday(this.date)) {
        return "Today";
      } else if (isYesterday(this.date)) {
        return "Yesterday";
      } else {
        return format(this.date, "d MMM yyyy");
      }
    },
  },

  methods: {
    previousDate() {
      this.$emit("date-changed", subDays(this.date, 1));
    },

    nextDate() {
      this.$emit("date-changed", addDays(this.date, 1));
    },
  }
})
</script>
