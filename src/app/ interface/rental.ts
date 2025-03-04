import {Customer} from './customer';
import {Car} from './car';

export interface Rental {
  rentalId: bigint,
  customer: Customer,
  car: Car,
  mileage: number
}

export interface RentalWithId {
  customerId: bigint | undefined,
  carId: bigint | undefined,
  mileage: number | undefined,
}
