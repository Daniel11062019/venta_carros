import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComprasService } from '../../services/compras';
import { Table } from '../../componentes/table/table';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-compras',
  imports: [Table],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras {
  comprasData: any[] = [];

  constructor(private comprasService: ComprasService) {
    this.comprasService.getCompras().subscribe((data: any[]) => {
      this.comprasData = data;
    });
  }
}
