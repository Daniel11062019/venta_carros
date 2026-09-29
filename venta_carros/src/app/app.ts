import { Component, signal } from '@angular/core';
import { MenuComponent } from './views/menu/menu.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { TableComponent } from './components/table/table';

@Component({
  imports: [MenuComponent, TablaComponent, TableComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('GH_AUTOS');
}
