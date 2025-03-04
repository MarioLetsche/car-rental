import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CustomersService} from '../../service/customers.service';
import {Customer} from '../../ interface/customer';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../status-snackbar/status-snackbar.component';

@Component({
  selector: 'app-edit-customer-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    FormsModule
  ],
  standalone: true,
  templateUrl: './edit-customer-dialog.component.html'
})
export class EditCustomerDialogComponent {
  customer: Customer;

  constructor(private customerService: CustomersService,
              private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Customer) {
    this.customer = data;
  }

  public updateCustomer(customer: Customer): void {
    const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
      data: customer.customerId ? 'Trying to update customer data' : 'Trying to add customer',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500
    })
    if (customer.firstName === '' || customer.lastName === '' || customer.email === '') {
      snackbar.instance.data = 'Missing customer data!';
      snackbar.instance.hidden = true;
      snackbar.instance.successful = false;
      return;
    }

    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        snackbar.instance.data = customer.customerId ? 'Updated customer' : 'Added new customer';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = true;
        this.customerService.loadCustomers();
      },
      error: () => {
        snackbar.instance.data = customer.customerId ? 'Failed to update customer' : 'Failed to add new customer';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
      }
    })
  }
}
