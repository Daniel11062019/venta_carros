import { Component, signal } from '@angular/core';
import { CatalogoService } from '../../services/catalogo';
import { Table } from '../../componentes/table/table';

@Component({
  selector: 'app-catalogo',
  imports: [Table],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  catalogoData = signal<any[]>([]);

  constructor(private catalogoService: CatalogoService) {
    this.catalogoService.getVehiculos().subscribe((data: any[]) => {
      this.catalogoData.set(data);
    });
  }
}
