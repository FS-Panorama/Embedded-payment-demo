import { PaymentLineApiRequest } from './paymentLineApiRequest';
export class SessionApiRequest {
  ipAddress: string;
  redirectUrl: string;
  paymentLines: PaymentLineApiRequest[];
  selectedTheme: number;

  constructor() {
    this.paymentLines = [];
    this.redirectUrl = '';
    this.ipAddress = '';
    this.selectedTheme= 0;
  }
}

