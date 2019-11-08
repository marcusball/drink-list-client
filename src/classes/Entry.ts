import { JsonObject, JsonProperty } from "json2typescript";
import ApproxNumber from './ApproxNumber';
import isEqual from 'lodash/isEqual';

@JsonObject("Entry")
export default class Entry {
  @JsonProperty("id", Number)
  id?: number;

  @JsonProperty("drank_on", String)
  drankOn?: string;

  @JsonProperty("time", String)
  time?: string;

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

  @JsonProperty("volume", Object)
  volume?: any | null;
  @JsonProperty("volume_ml", Object)
  volumeMl?: any | null;

  @JsonProperty("created_at", String)
  createdAt?: string;

  @JsonProperty("updated_at", String)
  updatedAt?: string;

  constructor() {
    this.id = undefined;
    this.drankOn = undefined;
    this.time = undefined;
    this.drinkId = undefined;
    this.name = undefined;
    this.minAbv = null;
    this.maxAbv = null;
    this.multiplier = undefined;
    this.minQuantity = undefined;
    this.maxQuantity = undefined;
    this.volume = undefined;
    this.volumeMl = undefined;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }

  get abvString() {
    if (!isEqual(this.minAbv, this.maxAbv)) {
      return `${this.minAbv!.toString()}-${this.maxAbv!.toString()}`;
    }

    if (this.minAbv == null) {
      return "";
    }

    return this.minAbv!.toString();
  }
}