import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {catchError, Observable, Subject, take} from 'rxjs';
import {Customer} from '../ interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customersUrl: string = config.carRentalInterfaceUrl + config.customersEndpoint;
  public customers$: Subject<Customer[]> = new Subject<Customer[]>();

  constructor(private httpClient: HttpClient) {}

  public loadCustomers(): void {
    this.httpClient.get<Customer[]>(this.customersUrl).pipe().subscribe(customers => {this.customers$.next(customers)})
  }

  public deleteCustomer(customerId: number): Observable<any> {
    return this.httpClient.delete<number>(this.customersUrl, {body: customerId})
      .pipe(take(1), catchError(err => {throw err;}));
  }

  public saveCustomer(customer: Customer): Observable<any> {
    if (customer.customerId === undefined) {
      return this.httpClient.post(this.customersUrl, customer)
        .pipe(take(1), catchError(err => {throw err;}))
    }
    return this.httpClient.put(this.customersUrl, customer)
      .pipe(take(1), catchError(err => {throw err;}))
  }
}
