import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { Transactions } from '../transactions';

@Component({
  selector: 'app-root',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'comments', 'action'];
  transactions: Transactions[] = [];
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
    this.getTransaction(this.startDate, this.endDate);
  }

  dateRangeChange(startDate: string, endDate: string): void {
    console.log(startDate, endDate, typeof startDate);
    if (endDate) {
      this.getTransaction(startDate, endDate);
    }
  }

  getTransaction(start: string | Date, end: string | Date): void {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const path = `transaction?startDate=${startDate}&endDate=${endDate}`;
    this.transactionService
      .getTransactions(path)
      .subscribe((transactions) => (this.transactions = transactions));
  }
}
