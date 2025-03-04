import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StatusSnackbarComponent} from '../utility/status-snackbar/status-snackbar.component';
import {Rental} from '../ interface/rental';
import {RentalsService} from '../service/rentals.service';
import {EditRentalDialogComponent} from '../utility/edit-rental-dialog/edit-rental-dialog.component';
import {NgForOf} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-rental',
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
  templateUrl: './rental.component.html'
})
export class RentalComponent implements OnInit, OnDestroy {
  public rentals: Rental[] = [];
  private destroy_stream$: Subject<void> = new Subject<void>();

  constructor(private rentalService: RentalsService,
              private matDialog: MatDialog,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.rentalService.rentals$
      .pipe(takeUntil(this.destroy_stream$))
      .subscribe({
        next: customersList => {
          this.rentals = customersList
        }
      })

    this.rentalService.loadRentals();
  }

  public deleteRental(rentalId: bigint | undefined): void {
    const snackbar = this.snackbar.openFromComponent(StatusSnackbarComponent, {
      data: 'Trying to delete the rental',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2500
    })

    if (!rentalId) {
      snackbar.instance.data = 'Missing the rentals ID!'
      snackbar.instance.hidden = true;
      snackbar.instance.successful = false;
      return
    }

    this.rentalService.deleteRental(rentalId).subscribe({
      next: () => {
        snackbar.instance.data = 'Deleted selected rental';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = true;
        this.rentalService.loadRentals();
      },
      error: () => {
        snackbar.instance.data = 'Failed to delete selected rental';
        snackbar.instance.hidden = true;
        snackbar.instance.successful = false;
      }
    });
  }

  public addRental(): void {
    this.matDialog.open(EditRentalDialogComponent)
  }

  ngOnDestroy(): void {
    this.destroy_stream$.next();
    this.destroy_stream$.complete();
  }
}
