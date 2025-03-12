import { Option } from '../models/option.model';

export interface ILineItem {
  id?: number;
  itemType: Option;
  itemAmount: string;
  recurringType: Option;
}
