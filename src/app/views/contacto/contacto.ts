import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-contacto',
  imports: [MatIconModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {}
