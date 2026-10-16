import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../Models/ComprasModels';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  private readonly url = 'http://localhost:3000/api/v1/compras';

  constructor(private http: HttpClient) {}

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.url);
  }

  getCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.url}/${id}`);
  }

  crearCompra(compra: Omit<Compra, 'idCompra'>): Observable<Compra> {
    return this.http.post<Compra>(this.url, compra);
  }

  actualizarCompra(id: number, compra: Partial<Compra>): Observable<Compra> {
    return this.http.put<Compra>(`${this.url}/${id}`, compra);
  }

  eliminarCompra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
