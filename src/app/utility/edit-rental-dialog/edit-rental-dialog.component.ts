import {Component} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../status-snackbar/status-snackbar.component';
import {RentalWithId} from '../../ interface/rental';
import {RentalsService} from '../../service/rentals.service';

@Component({
  selector: 'app-edit-rental-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    FormsModule
  ],
  standalone: true,
  templateUrl: './edit-rental-dialog.component.html'
})
export class EditRentalDialogComponent {
  rental: RentalWithId = {customerId: undefined, carId: undefined, mileage: undefined};

  constructor(private rentalsService: RentalsService,
              private snackbar: MatSnackBar) {
  }

  public updateRental(rental: RentalWithId): void {
    const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
      data: 'Trying to add rental',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500
    })

    if (rental.customerId === undefined || rental.carId === undefined || rental.mileage === undefined || Number(rental.mileage) < 1) {
      snackbar.instance.data = 'Missing or invalid data!';
      snackbar.instance.hidden = true;
      snackbar.instance.successful = false;
      return;
    }

    this.rentalsService.saveRental(rental).subscribe({
      next: () => {
        snackbar.instance.data = 'Added new rental';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = true;
        this.rentalsService.loadRentals()
      },
      error: () => {
        snackbar.instance.data = 'Failed to add new rental';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
      }
    });
  }
}
