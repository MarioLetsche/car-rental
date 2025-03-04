import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarAction} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-status-snackbar',
  imports: [
    MatProgressSpinner,
    MatIcon,
    MatSnackBarAction,
    NgIf
  ],
  standalone: true,
  templateUrl: './status-snackbar.component.html'
})
export class StatusSnackbarComponent {
  hidden: boolean = false;
  successful: boolean = false;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }
}
