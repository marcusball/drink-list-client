<template>
  <div>
    <form @submit.prevent="newEntry" class="form-horizontal">
      <select v-model="timePeriod">
        <option
          v-for="option in timePeriodOptions"
          :key="option.value"
          :value="option.value"
          :selected="option.selected"
          >{{ option.label }}</option
        >
      </select>
      <ApproxInput v-model="quantity"></ApproxInput>
      <input type="text" v-model="name" />
      <ApproxInput v-model="abv"></ApproxInput>
      <ApproxInput v-model="volume"></ApproxInput>

      <div>
        {{ timePeriod }}, {{ quantity }}, {{ name }}, {{ abv }}, {{ volume }}
      </div>

      <input
        type="submit"
        value="Add Entry"
        ref="entrySubmit"
        class="btn btn-primary btn-lg"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import EntryPair from "@/classes/EntryPair";
import { JsonConvert } from "json2typescript";
import ApproxInput from "./ApproxInput";
import format from "date-fns/format";

interface TimePeriodOption {
  label: string;
  value: string;
  selected: boolean;
}

@Component({
  components: {
    ApproxInput
  }
})
export default class NewEntryForm extends Vue {
  @Prop({ default: () => new Date() })
  public date!: Date;

  public timePeriod: string = "night";

  public quantity: string = "";

  public name: string = "";

  public abv: string = "";

  public volume: string = "";

  private isLoading: boolean = false;

  newEntry() {
    const API_BASE = process.env.VUE_APP_API_URL;

    this.isLoading = true;

    const form = new URLSearchParams();
    form.append("drank_on", this.isoDate);
    form.append("time_period", this.timePeriod);
    form.append("quantity", this.quantity);
    form.append("name", this.name);
    form.append("abv", this.abv);
    form.append("volume", this.volume);

    return fetch(`${API_BASE}/drink`, {
      method: "POST",
      body: form,
      headers: {
        // Authorization: this.$store.state.token,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(result => {
        this.reset(); // Reset the form to default

        let jsonConvert: JsonConvert = new JsonConvert();
        let entry: EntryPair = jsonConvert.deserializeObject(
          result.data.aggregated_entry,
          EntryPair
        );

        this.$emit("new-entry", entry); // refresh the list
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  get timePeriodOptions(): TimePeriodOption[] {
    return [
      {
        label: "Morning",
        value: "morning",
        selected: false
      },
      {
        label: "Afternoon",
        value: "afternoon",
        selected: false
      },
      {
        label: "Evening",
        value: "evening",
        selected: false
      },
      {
        label: "Night",
        value: "night",
        selected: false
      }
    ];
  }

  get isoDate(): string {
    return format(this.date, "yyyy-LL-dd");
  }

  reset() {
    this.quantity = "";
    this.name = "";
    this.abv = "";
    this.volume = "";
  }
}
</script>