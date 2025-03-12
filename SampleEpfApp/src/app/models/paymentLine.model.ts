import { TransactionGroup } from './transaction-group';
import { RecurringTypes } from './recurring-types';


// required external transaction model
export class PaymentLine {
  amount: string;
  fee: string;
  type: TransactionGroup;
  payFee?: boolean;
  tranId?: string;
  commissionRateOverride?: string;
  cardProcessingFeeOverride?: string;
  externalLineId?: string;
  tip?: string;
  recurring?: RecurringTypes;

  constructor() {
    this.amount = '0.0';
    this.fee = '0.0';
    this.type = TransactionGroup.Donation;
    this.payFee = false;
  }
}

export class PaymentLines {
  paymentLines: PaymentLine[];

  constructor() {
    this.paymentLines = [];
  }
}
