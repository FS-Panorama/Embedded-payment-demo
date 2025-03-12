import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, effect, ViewEncapsulation, OnDestroy, computed } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { PaymentService } from '../../services/payment.service';
import { PaymentServiceModel } from '../../models/paymentServiceModel';
import { Option } from '../../models/option.model';
import { AppService } from '../../app.service';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton'
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatDialog } from '@angular/material/dialog';
import { IframeModalComponent } from '../iframe-modal/iframe-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { SessionApiRequest } from '../../models/sessionApiRequest';
import { PaymentLineApiRequest } from '../../models/paymentLineApiRequest';
import { DialogModule } from 'primeng/dialog';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { TouchedDirective } from '../../directive/touched.directive'; // Import the directive
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-test-jig',
  standalone: true,
  providers: [MessageService],
  imports: [ItemListComponent,
    FormsModule,
    FloatLabelModule,
    DividerModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CommonModule,
    MatDialogModule,
    ToastModule,
    SelectButtonModule,
    PanelModule,
    DialogModule,
    TouchedDirective,
    SelectModule
    ],
  templateUrl: './test-jig.component.html',
  styleUrl: './test-jig.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TestjigComponent implements OnInit {
  paymentModel: PaymentServiceModel;
  countryCodeOptions: Option[] = [];
  themeOptions: Option[] = [];
  languageOptions: Option[] = [];
  formTypeOptions: Option[] = [];
  ipAddress: string = '';
  paymentTypeOptions: any[] = [];
  isTouched = false;

  
  constructor(
    private readonly injectedPaymentService: PaymentService,
    private messageService: MessageService,
    private appService: AppService,
    private dialog: MatDialog,
    private http: HttpClient
    ) {

    this.paymentModel = this.injectedPaymentService.getPaymentModel();
    this.themeOptions = [
      { name: 'None', code: '0' },
      { name: 'Pink Theme', code: '1'  },
      { name: 'Green Theme', code: '2'  },
      { name: 'Dark Theme', code: '3'  }
    ];

    this.paymentTypeOptions = [
      { label: "One-Time Payment", value: "OneTime" },
      { label: "Recurring Payment", value: "Recurring" }
    ]; 

  }

  ngOnInit() {
    this.getIpAddress(); // get this for recaptcha support
    this.paymentModel.thisDomainUrl = window.location.origin;
  }

  markAsTouched() {
    this.isTouched = true;
  }

  paymentLinesValid() {

    var isValid: boolean = true;
    
    if ((this.paymentModel.paymentType() === "OneTime") && (this.paymentModel.lineItems.length <= 0)) {
      isValid = false;
    }

    if ((this.paymentModel.paymentType() === "Recurring") && (this.paymentModel.recurringItem.length <= 0)) {
      isValid = false;
    }

    if (isValid === false) {
      // Show error message
      this.messageService.clear('validationError');
      this.messageService.add({ key: 'validationError', severity: 'error', summary: 'At least 1 payment line item needs to be added.'});

      return false;
    }
    return true;
  }

  isNullOrEmpty(str: string | null | undefined): boolean {
    return (str ?? '').length === 0;
  }

  startIframe() {
    console.log("Iframe starting...");

    this.markAsTouched();

    if (this.paymentLinesValid()) {
      if (!this.isNullOrEmpty(this.paymentModel.samplePaymentApiUrl())) {

        const sessionPayload = new SessionApiRequest();
        // Send to Auth to create session token
        try {
          var line: PaymentLineApiRequest;
          if (this.paymentModel.paymentType() === "OneTime")
          // map one-time payment lines to request
            for (var item of this.paymentModel.lineItems) {
              line = new PaymentLineApiRequest();
              line.amount = Number(item.itemAmount);
              line.type = Number(item.itemType.code);
              line.recurring = 0;
              sessionPayload.paymentLines.push(line);
            }
          else {
            // map recurring to request
            for (var item of this.paymentModel.recurringItem) {
              line = new PaymentLineApiRequest();
              line.amount = Number(item.itemAmount);
              line.type = Number(item.itemType.code);
              line.recurring = Number(item.recurringType.code);
              sessionPayload.paymentLines.push(line);
            }

          }
          // map remaining model to request payload
          sessionPayload.redirectUrl = this.paymentModel.thisDomainUrl + '/thankyou';
          sessionPayload.ipAddress = this.ipAddress;
          sessionPayload.selectedTheme = Number(this.paymentModel.selectedTheme.code);
        } catch (error) {
          // Displays error thrown by the try block
          this.messageService.clear('validationError');
          this.messageService.add({
            key: 'validationError',
            severity: 'error',
            summary: 'Could not create payload',
            detail: <string>error
          });
        }

        this.injectedPaymentService.startSession(this.paymentModel.samplePaymentApiUrl(), sessionPayload)
          .subscribe(
            result => {


              this.dialog.open(IframeModalComponent,
                {
                  data: { iframeUrl: 'https://demo-epf.frontstream.com/checkout?token=' + result.result },
                  panelClass: 'iframe-modal-panel',
                  autoFocus: true,
                  disableClose: true // Prevent closing by clicking outside
                });
            },
            (error) => {
              this.messageService.clear('validationError');
              this.messageService.add({
                key: 'validationError',
                severity: 'error',
                summary: 'Could not create token',
                detail: ''
              });
            });

      } else {

        // Show error message
        this.messageService.clear('validationError');
        this.messageService.add({
          key: 'validationError',
          severity: 'error',
          summary: 'Please review the errors on the page.',
          detail: ''
        });
      }
    }
  }

  async getIpAddress() {
    const observable$ = this.http.get<any>('https://ipinfo.io/json',
      { headers: { "AccessToken": 'n/a' } }).pipe(
      map(((response: any) => response.ip)
        ));

    try {
      const result = await firstValueFrom(observable$);
      // Code that depends on the observable emitting its first value and completing
      this.ipAddress = result;
    } catch (error) {
      // Handle any errors from the observable
      console.error(error);
    }
  }


}
