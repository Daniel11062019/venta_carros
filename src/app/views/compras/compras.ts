import { Component, signal } from '@angular/core';
import { ComprasService } from '../../services/compras';
import { Table } from '../../componentes/table/table';

@Component({
  selector: 'app-compras',
  imports: [Table],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras {
  comprasData = signal<any[]>([]);

  constructor(private comprasService: ComprasService) {
    this.comprasService.getCompras().subscribe((data: any[]) => {
      this.comprasData.set(data);
    });
  }
}
