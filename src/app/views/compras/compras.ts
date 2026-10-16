import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Compra } from '../../Models/ComprasModels';
import { ComprasService } from '../../services/compras';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './compras.html',
  styleUrl: './compras.css'
})
export class Compras implements OnInit, AfterViewInit {
  displayedColumns = ['idCompra', 'cliente', 'vehiculo', 'fecha', 'precio', 'estado'];
  dataSource = new MatTableDataSource<Compra>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private comprasService: ComprasService) {}

  ngOnInit(): void {
    this.comprasService.getCompras().subscribe({
      next: (compras) => this.dataSource.data = compras,
      error: (error) => console.error('No se pudieron cargar las compras', error)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
