import {Customer} from './customer';
import {Car} from './car';

export interface Rental {
  rentalId: number,
  customer: Customer,
  car: Car,
  mileage: number
}

export interface RentalWithId {
  customerId: number | undefined,
  carId: number | undefined,
  mileage: number | undefined,
}
