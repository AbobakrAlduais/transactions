import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../environments/environment';
import { Transactions } from './transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTransactions<T>(path: string): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(`${this.baseUrl}/${path}`);
  }
}
