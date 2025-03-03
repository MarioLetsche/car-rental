import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CustomerComponent} from './customer/customer.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  title = 'car-rental';
}
