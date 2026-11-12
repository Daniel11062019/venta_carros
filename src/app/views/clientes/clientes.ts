import { Component, signal } from '@angular/core';
import { ClientesService } from '../../services/clientes';
import { Table } from '../../componentes/table/table';

@Component({
  selector: 'app-clientes',
  imports: [Table],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
  clientesData = signal<any[]>([]);

  constructor(private clientesService: ClientesService) {
    this.clientesService.getClientes().subscribe((data: any[]) => {
      this.clientesData.set(data);
    });
  }
}
