import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogoService } from '../../services/catalogo';
import { Table } from '../../componentes/table/table';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-catalogo',
  imports: [Table],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  catalogoData: any[] = [];

  constructor(private catalogoService: CatalogoService) {
    this.catalogoService.getVehiculos().subscribe((data: any[]) => {
      this.catalogoData = data;
    });
  }
}
