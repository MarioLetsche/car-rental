import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {catchError, lastValueFrom, Observable, Subject, take, throwError} from 'rxjs';
import {Customer} from '../ interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customersUrl: string = config.carRentalInterfaceUrl + config.customersEndpoint;
  public customers$: Subject<Customer[]> = new Subject<Customer[]>();

  constructor(private httpClient: HttpClient) {}

  public loadCustomers(): void {
    lastValueFrom(this.httpClient.get<Customer[]>(this.customersUrl))
      .then(data => this.customers$.next(data));
  }

  public deleteCustomer(customerId: bigint): Observable<any> {
    return this.httpClient.delete<bigint>(this.customersUrl, {body: customerId})
      .pipe(take(1), catchError(err => {throw err;}));
  }

  public saveCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put(this.customersUrl, customer)
      .pipe(take(1), catchError(err => {throw err;}))
  }
}
