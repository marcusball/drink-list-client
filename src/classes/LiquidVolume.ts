import { JsonObject, JsonProperty } from "json2typescript";
import ApproxNumber from "./ApproxNumber";

@JsonObject("LiquidVolume")
export default class LiquidVolume {
  @JsonProperty("amount", ApproxNumber)
  amount: ApproxNumber;

  @JsonProperty("unit", String)
  unit: String;

  constructor(amount: ApproxNumber, unit: String) {
    this.amount = amount;
    this.unit = unit;
  }

  toString() {
    return `${this.amount.toString()} ${this.unit}`;
  }
}
