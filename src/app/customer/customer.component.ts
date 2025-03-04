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
import {MatDialog} from '@angular/material/dialog';
import {EditCustomerDialogComponent} from '../utility/edit-customer-dialog/edit-customer-dialog.component';

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

  constructor(private customerService: CustomersService,
              private matDialog: MatDialog) {
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

    public addCustomer(): void {
      const customer: Customer = {
        firstName: '',
        lastName: '',
        email: ''
      }

      this.matDialog.open(EditCustomerDialogComponent, {
        data: customer
      })
    }

    public updateCustomer(customer: Customer): void {
      this.matDialog.open(EditCustomerDialogComponent, {
        data: customer
      });
    }
}
