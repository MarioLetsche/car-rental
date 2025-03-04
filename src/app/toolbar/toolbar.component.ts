import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

}
