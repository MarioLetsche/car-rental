import { Component } from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../utility/status-snackbar/status-snackbar.component';
import {Car} from '../ interface/car';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';
import {CarsService} from '../service/cars.service';
import {EditCarDialogComponent} from '../utility/edit-car-dialog/edit-car-dialog.component';

@Component({
  selector: 'app-car',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  standalone: true,
  templateUrl: './car.component.html'
})
export class CarComponent {
  public cars: Car[] = [];
  private destroy_stream$: Subject<void> = new Subject<void>();

  constructor(private carService: CarsService,
              private matDialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.carService.cars$
      .pipe(takeUntil(this.destroy_stream$))
      .subscribe({
        next: carList => {
          this.cars = carList
        }
      })

    this.carService.loadCars();
  }

  public deleteCar(carId: bigint | undefined): void {
    const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
      data: 'Trying to delete the car',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500
    })

    if (!carId) {
      snackbar.instance.data = 'Missing the car ID!'
      snackbar.instance.hidden = true;
      snackbar.instance.successful = false;
      return
    }

    this.carService.deleteCar(carId).subscribe({
      next: () => {
        snackbar.instance.data = 'Deleted selected car';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = true;
      },
      error: () => {
        snackbar.instance.data = 'Failed to delete selected car';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
      }
    });
    this.reloadCars();
  }

  private reloadCars(): void {
    setTimeout(() => {
      this.carService.loadCars();
    }, 100)
  }

  public addCar(): void {
    const car: Car = {
      model: '',
      brand: '',
      inRental: false
    }

    this.matDialog.open(EditCarDialogComponent, {
      data: car
    })
  }

  public updateCar(car: Car): void {
    this.matDialog.open(EditCarDialogComponent, {
      data: car
    });
  }
}
