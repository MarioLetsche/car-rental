import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {catchError, lastValueFrom, Observable, Subject, take} from 'rxjs';
import {Car} from '../ interface/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  carsUrl: string = config.carRentalInterfaceUrl + config.carEndpoint;
  public cars$: Subject<Car[]> = new Subject<Car[]>();

  constructor(private httpClient: HttpClient) {}

  public loadCars(): void {
    lastValueFrom(this.httpClient.get<Car[]>(this.carsUrl))
      .then(data => this.cars$.next(data));
  }

  public deleteCar(carId: bigint): Observable<any> {
    return this.httpClient.delete<bigint>(this.carsUrl, {body: carId})
      .pipe(take(1), catchError(err => {throw err;}));
  }

  public saveCar(car: Car): Observable<any> {
    return this.httpClient.put(this.carsUrl, car)
      .pipe(take(1), catchError(err => {throw err;}))
  }
}
