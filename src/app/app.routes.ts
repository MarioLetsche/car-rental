import { Routes } from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {CarComponent} from './car/car.component';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
];
