import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];
  displayedColumns: string[] = [];

  // Guarda los datos y permite partirlos en páginas
  dataSource = new MatTableDataSource<any>([]);

  // Busca el <mat-paginator> que está en el HTML
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(): void {
    this.displayedColumns = [];

    this.data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!this.displayedColumns.includes(key)) {
          this.displayedColumns.push(key);
        }
      });
    });

    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
