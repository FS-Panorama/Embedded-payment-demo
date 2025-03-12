import { signal,  computed } from '@angular/core';
import { RecurringTypes } from '../models/recurring-types';
import { PaymentLine } from '../models/paymentLine.model';
import { ILineItem } from '../models/ILineItem.interface';
import { Option } from '../models/option.model';

export class PaymentServiceModel {
  selectedRecurringType: RecurringTypes;
  paymentLines: PaymentLine[];
  resultToken: string;
  samplePaymentApiUrl = signal('https://localhost:44316');
  selectedTheme: Option;
  thisDomainUrl: string;
  paymentType = signal('OneTime');

  recurringItem: ILineItem[] = []; // Business rule: can only be 1 recurring payment and must be of type 'donation'
  lineItems: ILineItem[] = []; 
  constructor() {
    this.resultToken = '';
    this.selectedRecurringType = RecurringTypes.Monthly;
    this.paymentLines = [];
    this.selectedTheme = new Option('None', '0');
    this.thisDomainUrl = '';
  }
}
