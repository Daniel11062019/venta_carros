import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Vehiculo } from '../../Models/CatalogoModels';
import { CatalogoService } from '../../services/catalogo';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit, AfterViewInit {
  displayedColumns = ['marca', 'modelo', 'anio', 'cc', 'precio', 'categoria'];
  dataSource = new MatTableDataSource<Vehiculo>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit(): void {
    this.catalogoService.getVehiculos().subscribe({
      next: (vehiculos) => this.dataSource.data = vehiculos,
      error: (error) => console.error('No se pudo cargar el catálogo', error)
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
