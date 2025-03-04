import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {CarComponent} from './car/car.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerComponent, ToolbarComponent, CarComponent],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  title = 'car-rental';
}
