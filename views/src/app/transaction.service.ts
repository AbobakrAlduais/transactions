import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTransactions<T>(path: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/${path}`);
  }

  getTransactionById<T>(path: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${path}`);
  }

  updateComments<T>(id: string, body: object): Observable<Transaction> {
    return this.http.patch<Transaction>(
      `${this.baseUrl}/transaction/${id}`,
      body
    );
  }
}
