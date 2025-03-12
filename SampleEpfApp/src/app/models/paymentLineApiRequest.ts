export class PaymentLineApiRequest {
  amount: number;
  type: number;
  recurring: number;
  constructor() {
    this.amount = 0.0;
    this.type = 1;
    this.recurring = 0;
  }
}

