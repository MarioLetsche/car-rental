import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../config';
import {catchError, Observable, Subject, take} from 'rxjs';
import {Car} from '../ interface/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  carsUrl: string = config.carRentalInterfaceUrl + config.carEndpoint;
  public cars$: Subject<Car[]> = new Subject<Car[]>();

  constructor(private httpClient: HttpClient) {}

  public loadCars(): void {
    this.httpClient.get<Car[]>(this.carsUrl).pipe().subscribe(cars => {this.cars$.next(cars)});
  }

  public deleteCar(carId: bigint): Observable<any> {
    return this.httpClient.delete<bigint>(this.carsUrl, {body: carId})
      .pipe(take(1), catchError(err => {throw err;}));
  }

  public saveCar(car: Car): Observable<any> {
    if (car.carId === undefined) {
      return this.httpClient.post(this.carsUrl, car)
        .pipe(take(1), catchError(err => {throw err;}))
    }
    return this.httpClient.put(this.carsUrl, car)
      .pipe(take(1), catchError(err => {throw err;}))
  }
}
