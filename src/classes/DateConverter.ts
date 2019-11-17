import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export default class DateConverter implements JsonCustomConvert<Date> {
  serialize(date: Date): any {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  }
  deserialize(date: any): Date {
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}