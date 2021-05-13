import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

@JsonConverter
export default class DateConverter implements JsonCustomConvert<Date> {
  serialize(date: Date): string {
    return format(date, "yyyy-LL-dd");
  }
  deserialize(date: any): Date {
    let d = parseISO(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}