import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolBar } from 'src/components/toolBar/toolBar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolBar],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TeeRex Store';
}
