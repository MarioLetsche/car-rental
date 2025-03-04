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
              @Inject(MAT_DIALOG_DATA) public data: Customer) {
    this.customer = data;
  }

  public updateCustomer(customer: Customer): void {
    if (customer.firstName == '' || customer.lastName == '' || customer.email == '') {
      return;
    }
    console.log(customer)
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {},
      error: () => {}
    })
    setTimeout(() => {
      this.customerService.loadCustomers()
    }, 100);
  }
}
