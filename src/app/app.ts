import { Component } from '@angular/core';
import { MenuComponent } from './views/menu/menu.component';

@Component({
  imports: [MenuComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  title = 'GH_AUTOS';
}
