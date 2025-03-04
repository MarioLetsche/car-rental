import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../utility/status-snackbar/status-snackbar.component';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLinkActive} from '@angular/router';

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
    MatIcon,
    MatTooltip,
    RouterLinkActive
  ],
  standalone: true,
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit, OnDestroy {
  public customers: Customer[] = [];
  private destroy_stream$: Subject<void> = new Subject<void>();

  constructor(private customerService: CustomersService,
              private matDialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

    ngOnInit() {
      this.customerService.customers$
        .pipe(takeUntil(this.destroy_stream$))
        .subscribe({
          next: customersList => {
            this.customers = customersList
          }
        })

      this.customerService.loadCustomers();
    }

    public deleteCustomer(customerId: number | undefined): void {
      const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
        data: 'Trying to delete the customer',
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 2500
      })

      if (!customerId) {
        snackbar.instance.data = 'Missing the customers ID!'
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
        return
      }

      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          snackbar.instance.data = 'Deleted selected customer';
          snackbar.instance.hidden = true;
          snackbar.instance.successful = true;
          this.customerService.loadCustomers();
        },
        error: () => {
          snackbar.instance.data = 'Failed to delete selected customer';
          snackbar.instance.hidden = true;
          snackbar.instance.successful = false;
        }
      });
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

  ngOnDestroy(): void {
    this.destroy_stream$.next();
    this.destroy_stream$.complete();
  }
}
