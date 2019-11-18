import { JsonObject, JsonProperty } from "json2typescript";
import LiquidVolume from "./LiquidVolume";
import isEqual from "lodash/isEqual";

@JsonObject("Aggregate")
export default class Aggregate {
  @JsonProperty("min_drinks", Number)
  minDrinks?: number;

  @JsonProperty("max_drinks", Number)
  maxDrinks?: number;

  @JsonProperty("min_volume", LiquidVolume)
  minVolume?: LiquidVolume | null;

  @JsonProperty("max_volume", LiquidVolume)
  maxVolume?: LiquidVolume | null;

  constructor() {
    this.minDrinks = undefined;
    this.maxDrinks = undefined;
    this.minVolume = undefined;
    this.maxVolume = undefined;
  }

  get drinksString() {
    if (!isEqual(this.minDrinks, this.maxDrinks)) {
      return `${this.minDrinks!.toFixed(1)}-${this.maxDrinks!.toFixed(1)}`;
    }

    return `${this.minDrinks!.toFixed(1)}`;
  }

  get volumeString() {
    if (!isEqual(this.minVolume, this.maxVolume)) {
      return `${this.minVolume!.amount.num.toFixed(1)}-${this.maxVolume!.amount.num.toFixed(1)} ${this.minVolume!.unit}`;
    }

    if (!this.minVolume) {
      return '';
    }

    return `${this.minVolume!.amount.num.toFixed(1)} ${this.minVolume!.unit}`;
  }
}