import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Transactions } from '../transactions';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  id: any;
  transaction: Transactions = {
    id: 0,
    _id: '',
    date: '',
    Amount: '',
    CurrencyCd: '',
    status: '',
  };

  transactionForm = new FormGroup({
    id: new FormControl({value: this.transaction.id, disabled: true}),
    date: new FormControl({value: this.transaction.date, disabled: true}),
    comments: new FormControl(this.transaction.Comments, Validators.pattern('^[a-zA-Z0-9]*$')),
  });

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getTransactionById(this.id);
  }

  getTransactionById(id: string): void {
    const path = `transaction/${id}`;
    this.transactionService
      .getTransactionById(path)
      .subscribe((transaction) => (this.transaction = transaction));
  }
}
