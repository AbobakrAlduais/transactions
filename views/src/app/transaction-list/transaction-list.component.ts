import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transactions } from '../transactions';

@Component({
  selector: 'app-root',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  transactions: Transactions[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    this.transactionService
      .getTransactions(
        'transaction?startDate=1638997755000&endDate=1673072290148'
      )
      .subscribe((transactions) => (this.transactions = transactions));
  }
}
