import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../status-snackbar/status-snackbar.component';
import {Car} from '../../ interface/car';
import {CarsService} from '../../service/cars.service';

@Component({
  selector: 'app-edit-car-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    FormsModule
  ],
  standalone: true,
  templateUrl: './edit-car-dialog.component.html'
})
export class EditCarDialogComponent {
  car: Car;

  constructor(private carService: CarsService,
              private snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Car) {
    this.car = data;
  }

  public updateCar(car: Car): void {
    const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
      data: car.carId ? 'Trying to update car data' : 'Trying to add car',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500
    })
    if (car.brand == '' || car.model == '') {
      snackbar.instance.data = 'Missing car data!';
      snackbar.instance.hidden = true;
      snackbar.instance.successful = false;
      return;
    }

    this.carService.saveCar(car).subscribe({
      next: () => {
        snackbar.instance.data = car.carId ? 'Updated car' : 'Added new car';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = true;
      },
      error: () => {
        snackbar.instance.data = car.carId ? 'Failed to update car' : 'Failed to add car';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
      }
    })
    setTimeout(() => {
      this.carService.loadCars()
    }, 100);
  }
}
