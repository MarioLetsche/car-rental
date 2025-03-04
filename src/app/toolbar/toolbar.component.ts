import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatTooltip
  ],
  standalone: true,
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

}
