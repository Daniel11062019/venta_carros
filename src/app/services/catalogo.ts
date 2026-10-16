import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../Models/CatalogoModels';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private readonly url = 'http://localhost:3000/api/v1/catalogo';

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.url);
  }

  getVehiculo(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.url}/${id}`);
  }

  crearVehiculo(vehiculo: Omit<Vehiculo, 'idVehiculo'>): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.url, vehiculo);
  }

  actualizarVehiculo(id: number, vehiculo: Partial<Vehiculo>): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.url}/${id}`, vehiculo);
  }

  eliminarVehiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
