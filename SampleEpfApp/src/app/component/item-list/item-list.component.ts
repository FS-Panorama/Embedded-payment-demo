import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Option } from '../../models/option.model';
import { ILineItem } from '../../models/ILineItem.interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaymentServiceModel } from '../../models/paymentServiceModel';
import { PaymentService } from '../../services/payment.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-item-list',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [FormsModule,
            InputTextModule,
            ButtonModule,
            TableModule,
            CommonModule,
            InputNumberModule,
            DropdownModule,
            DialogModule,
            ToastModule,
            ConfirmDialogModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})

export class ItemListComponent implements OnInit {
  paymentModel: PaymentServiceModel;
  paymentLineOptions: Option[] = [];
  frequencyOptions: Option[] = [];
  itemDialog: boolean = false;
  item: ILineItem = { itemType: { name: 'Donation', code: '1' }, itemAmount: '0', recurringType: { name: 'Monthly', code: '4' } };
  isEdit: boolean = false;
  constructor(private readonly injectedPaymentService: PaymentService,
  ) {
    this.paymentModel = this.injectedPaymentService.getPaymentModel();

    this.paymentLineOptions = [
      { name: 'Donation', code: '1' },
      { name: 'Auction', code: '3' },
      { name: 'Ticket', code: '4' },
      { name: 'Registration', code: '5' },
      { name: 'Quick Sale', code: '6' },
      { name: 'Online Store', code: '7' },
      { name: 'Campaign Payment', code: '8' },
      { name: 'Auction No Fee', code: '9' },
      { name: 'Partner API', code: '10' },
      { name: 'Express Payroll', code: '11' }
    ];

    this.frequencyOptions = [
      { name: 'Daily', code: '1' },
      { name: 'Weekly', code: '2' },
      { name: 'BiWeekly', code: '3' },
      { name: 'Monthly', code: '4' },
      { name: 'BiMonthly', code: '5' },
      { name: 'Quarterly Sale', code: '6' },
      { name: 'SemiAnnually Store', code: '7' },
      { name: 'Annually Payment', code: '8' }
    ];
  }

  ngOnInit() {

  }

  openNew() {
    this.item = { itemType: { name: 'Donation', code: '1' }, itemAmount: '0', recurringType: { name: 'Monthly', code: '4' } };
    this.isEdit = false;
    this.itemDialog = true;
  }

  editItem(row: ILineItem) {
    this.item = { ...row };
    this.isEdit = true;
    this.itemDialog = true;
  }

  saveItem() {
    if (this.isEdit) {
      const index = this.paymentModel.lineItems.findIndex((i) => i.id === this.item.id);
      this.paymentModel.lineItems[index] = this.item;
    } else {
      this.item.id = this.paymentModel.lineItems.length + 1;
      this.paymentModel.lineItems.push(this.item);
    }
    this.itemDialog = false;
    this.item = { itemType: { name: 'Donation', code: '1' }, itemAmount: '0', recurringType: { name: 'Monthly', code: '4' } };
  }

  saveRecurringItem() {
    if (this.isEdit) {
      const index = this.paymentModel.recurringItem.findIndex((i) => i.id === this.item.id);
      this.paymentModel.recurringItem[index] = this.item;
    } else {
      this.item.id = this.paymentModel.recurringItem.length + 1;
      this.paymentModel.recurringItem.push(this.item);
    }
    this.itemDialog = false;
    this.item = { itemType: { name: 'Donation', code: '1' }, itemAmount: '0', recurringType: { name: 'Monthly', code: '4' } };
  }

  deleteRecurringItem(row: ILineItem) {
    this.paymentModel.recurringItem = this.paymentModel.recurringItem.filter((item) => item.id !== row.id);
  }

  deleteItem(row: ILineItem) {
    this.paymentModel.lineItems = this.paymentModel.lineItems.filter((item) => item.id !== row.id);
  }

  hideDialog() {
    this.itemDialog = false;
  }
}
