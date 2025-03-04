import { Injectable } from '@angular/core';
import {config} from '../config';
import {catchError, Observable, Subject, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Rental, RentalWithId} from '../ interface/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  rentalsUrl: string = config.carRentalInterfaceUrl + config.rentalEndpoint;
  public rentals$: Subject<Rental[]> = new Subject<Rental[]>();

  constructor(private httpClient: HttpClient) {}

  public loadRentals(): void {
    this.httpClient.get<Rental[]>(this.rentalsUrl).pipe().subscribe(res => this.rentals$.next(res));
  }

  public deleteRental(rentalId: bigint): Observable<any> {
    return this.httpClient.delete<bigint>(this.rentalsUrl, {body: rentalId})
      .pipe(take(1), catchError(err => {throw err;}));
  }

  public saveRental(rental: RentalWithId): Observable<any> {
    return this.httpClient.post(this.rentalsUrl, rental)
      .pipe(take(1), catchError(err => {throw err;}))
  }
}
