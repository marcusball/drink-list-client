import { JsonObject, JsonProperty } from "json2typescript";
import ApproxNumber from "./ApproxNumber";
import LiquidVolume from "./LiquidVolume";
import DateConverter from "./DateConverter";
import isEqual from "lodash/isEqual";

@JsonObject("Entry")
export default class Entry {
  @JsonProperty("id", Number)
  id?: number;

  @JsonProperty("drank_on", DateConverter)
  drankOn?: Date;

  @JsonProperty("time", String)
  time?: string;

  @JsonProperty("context", [String])
  context?: string[];

  @JsonProperty("drink_id", Number)
  drinkId?: number;

  @JsonProperty("name", String)
  name?: string;

  @JsonProperty("min_abv", ApproxNumber)
  minAbv: ApproxNumber | null;
  @JsonProperty("max_abv", ApproxNumber)
  maxAbv: ApproxNumber | null;
  @JsonProperty("multiplier", Number)
  multiplier?: number;

  @JsonProperty("min_quantity", ApproxNumber)
  minQuantity?: ApproxNumber;

  @JsonProperty("max_quantity", ApproxNumber)
  maxQuantity?: ApproxNumber;

  @JsonProperty("volume", LiquidVolume)
  volume: LiquidVolume | null;
  @JsonProperty("volume_ml", LiquidVolume)
  volumeMl: LiquidVolume | null;

  @JsonProperty("created_at", String)
  createdAt?: string;

  @JsonProperty("updated_at", String)
  updatedAt?: string;

  constructor() {
    this.id = undefined;
    this.drankOn = undefined;
    this.time = undefined;
    this.context = undefined;
    this.drinkId = undefined;
    this.name = undefined;
    this.minAbv = null;
    this.maxAbv = null;
    this.multiplier = undefined;
    this.minQuantity = undefined;
    this.maxQuantity = undefined;
    this.volume = null;
    this.volumeMl = null;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }

  get abvString() {
    if (!isEqual(this.minAbv, this.maxAbv)) {
      return `${this.minAbv!.toString()}-${this.maxAbv!.toString()}%`;
    }

    if (this.minAbv == null) {
      return "";
    }

    return `${this.minAbv!.toString()}%`;
  }

  get quantityString() {
    if (!isEqual(this.minQuantity, this.maxQuantity)) {
      return `${this.minQuantity!.toString()} -${this.maxQuantity!.toString()} `;
    }

    if (this.minQuantity == null) {
      throw new Error("Entry quantity can not be null!");
    }

    return this.minQuantity!.toString();
  }

  get volumeString() {
    return this.volume ? this.volume.toString() : "";
  }
}
