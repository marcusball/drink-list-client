<template>
  <div class="container">
    <DateTabs :date="date" v-on:date-changed="onDateChanged"></DateTabs>
  </div>
</template>

<script lang="ts">
import DateTabs from "@/components/DateTabs";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    DateTabs
  }
})
export default class Day extends Vue {
  date: Date;

  constructor() {
    super();
    this.date = new Date();
  }

  onDateChanged(newDate: Date) {
    this.date = newDate;
  }
}
</script>