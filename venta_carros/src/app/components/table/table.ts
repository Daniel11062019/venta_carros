import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class TableComponent {
  // Accept columns and data from host components. Provide sensible defaults.
  @Input() displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'sexo', 'numeroTelefono'];
  @Input() dataSource: any[] = [];

  toHeader(col: string) {
    // Convert camelCase or snake_case to Title Case for headers
    return col
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_\-]/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase())
      .trim();
  }
}