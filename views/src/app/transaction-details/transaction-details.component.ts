import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  id: any;
  transaction: Transaction = {
    id: 0,
    _id: '',
    date: '',
    Amount: '',
    CurrencyCd: '',
    status: '',
  };

  comments = new FormControl(this.transaction.Comments, [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9 ]*$'),
  ]);

  transactionForm = new FormGroup({
    id: new FormControl({ value: this.transaction.id, disabled: true }),
    date: new FormControl({ value: this.transaction.date, disabled: true }),
    comments: this.comments,
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

  getErrorMessage(): string {
    if (this.comments.hasError('required')) {
      return 'You must enter a value';
    }

    return this.comments.hasError('pattern')
      ? 'Only alphanumeric characters are allowed'
      : '';
  }

  getTransactionById(id: string): void {
    this.transactionService
      .getTransactionById(id)
      .subscribe((transaction) => (this.transaction = transaction));
  }

  commentsChange(comments: string): void {
    const isAlphanumeric = /^[a-zA-Z0-9 ]*$/.test(comments);

    if (isAlphanumeric) {
      this.updateComments(comments);
    }
  }

  updateComments(comments: string): void {
    this.transactionService
      .updateComments(this.id, { Comments: comments })
      .subscribe((transaction) => (this.transaction = transaction));
  }
}
