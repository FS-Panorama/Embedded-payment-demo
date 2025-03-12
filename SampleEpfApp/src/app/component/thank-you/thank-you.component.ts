import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { PaymentServiceModel } from '../../models/paymentServiceModel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule, ButtonModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
  token: string;
  summary: any;
  allParams: any;
  paymentModel: PaymentServiceModel;
  rawResult: any;
  tokenError = false;
  constructor(private route: ActivatedRoute, private readonly injectedPaymentService: PaymentService, private router: Router) {
    this.token = '';
    this.paymentModel = this.injectedPaymentService.getPaymentModel();

  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: any) => {


      this.allParams = params;
      this.token = params['responseToken'];
      this.paymentModel.resultToken = this.token;

      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate: string = date.toLocaleDateString(undefined, options);

        // Lookup the response
        this.injectedPaymentService
          .readResponseToken(this.allParams['responseToken'])
          .subscribe(
            result => {
              console.log('Resulting token:');
              console.log(result);
            
              var resultingObject = JSON.parse(result);
              this.rawResult = resultingObject;

              // pull out what we need for a summary 
              this.summary = {
                amount: resultingObject.PaymentResult.TotalAmount,
                email: resultingObject.PaymentResult.EmailAddress,
                timestamp: formattedDate
              };
            },
            (error) => {
              console.log(error);
              this.tokenError = true;
            });
      
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`/${pageName}`]);
  }
}
