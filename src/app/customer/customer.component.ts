import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CustomersService} from '../service/customers.service';
import {Customer} from '../ interface/customer';
import {NgForOf} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-customer',
  imports: [
    NgForOf,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatIconButton,
    MatIcon
  ],
  standalone: true,
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  public customers: Customer[] = [];
  private destroy_stream$: Subject<void> = new Subject<void>();

  constructor(private customerService: CustomersService) {
  }

    ngOnInit() {
      this.customerService.customers$
        .pipe(takeUntil(this.destroy_stream$))
        .subscribe({
          next: customersList => {
            this.customers = customersList
          },
          error: () => {
            //TODO: Implement error handling
          }
        })

      this.customerService.loadCustomers();
    }

    public deleteCustomer(customerId: bigint | undefined): void {
      if (!customerId) {
        return
      }
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {},
        error: () => {}
      });
      this.reloadCustomers();
    }

    private reloadCustomers(): void {
      setTimeout(() => {
        this.customerService.loadCustomers();
      }, 100)
    }

    public addCustomer(firstName: string, lastName: string, email: string): void {
      const customer: Customer = {
        firstName: firstName,
        lastName: lastName,
        email: email
      }

      this.customerService.saveCustomer(customer).subscribe({
        next: () => {},
        error: () => {}
      });
      this.reloadCustomers();
    }

    public updateCustomer(customer: Customer): void {
      this.customerService.saveCustomer(customer).subscribe({
        next: () => {},
        error: () => {}
      })
      this.reloadCustomers();
    }
}
