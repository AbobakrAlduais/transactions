import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];
  options: string[] = ['COMPLETED', 'IN PROGRESS', 'REJECTED'];
  currentStatus: string[] = [];
  transactions: Transaction[] = [];
  endDate = new Date();
  startDate = new Date(new Date().setDate(this.endDate.getDate() - 7));
  dateForm: FormGroup;

  constructor(private transactionService: TransactionService) {
    this.dateForm = new FormGroup({
      startDate: new FormControl(this.startDate),
      endDate: new FormControl(this.endDate),
    });
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  statusChange(options: string[]): void {
    this.currentStatus = options;
    this.getTransactions();
  }

  dateRangeChange(startDate: any, endDate: any): void {
    if (endDate) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.getTransactions();
    }
  }

  getTransactions(): void {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    const status = this.currentStatus.length ? `status=${this.currentStatus.join(',')}` : "";
    let paramQuery  = `?startDate=${startDate}&endDate=${endDate}`;
    paramQuery = status ? `${paramQuery}&${status}` : paramQuery;

    this.transactionService
      .getTransactions(paramQuery)
      .subscribe((transactions) => (this.transactions = transactions));
  }
}
