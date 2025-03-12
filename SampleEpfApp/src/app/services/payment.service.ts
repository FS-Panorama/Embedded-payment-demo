import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentServiceModel } from '../models/paymentServiceModel';
import { SessionApiRequest } from '../models/sessionApiRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentServiceModel: PaymentServiceModel;
  routes: any;
  
  constructor(private http: HttpClient) {
    this.paymentServiceModel = new PaymentServiceModel();

    this.routes = {
      StartSession: '/Payment/api/EmbeddedSession',
      ReadResponseToken: 'https://demo-auth.frontstream.com/api/Verification/VerifyAuthToken?Code={0}',
    };

  }

  startSession(domainUrl: string, payload: SessionApiRequest): Observable<any> {

    return this.http.post<string>(domainUrl + this.routes.StartSession, payload);
  }

  readResponseToken(token: string): Observable<any> {

    return this.http.get<string>(this.formatString(this.routes.ReadResponseToken, token));
  }

  formatString(template: string, ...args: any[]): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  
  getPaymentModel() {
    return this.paymentServiceModel;
  }
}
