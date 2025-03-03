import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon
  ],
  standalone: true,
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

}
