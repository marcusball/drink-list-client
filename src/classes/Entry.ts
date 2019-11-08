import { JsonObject, JsonProperty } from "json2typescript";

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

  @JsonProperty("min_abv", Object)
  minAbv?: any;
  @JsonProperty("max_abv", Object)
  maxAbv?: any;
  @JsonProperty("multiplier", Number)
  multiplier?: number;

  @JsonProperty("min_quantity", Object)
  minQuantity?: any;

  @JsonProperty("max_quantity", Object)
  maxQuantity?: any;

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
    this.minAbv = undefined;
    this.maxAbv = undefined;
    this.multiplier = undefined;
    this.minQuantity = undefined;
    this.maxQuantity = undefined;
    this.volume = undefined;
    this.volumeMl = undefined;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }
}