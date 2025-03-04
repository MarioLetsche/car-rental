import { Routes } from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {CarComponent} from './car/car.component';
import {RentalComponent} from './rental/rental.component';

export const routes: Routes = [
  { path: '', redirectTo: 'rentals', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'rentals', component: RentalComponent }
];
