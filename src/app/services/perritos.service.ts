import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perrito } from '../Models/PerritosModels';

@Injectable({ providedIn: 'root' })
export class PerritosService {
  private readonly url = 'http://localhost:3000/api/v1/perritos';

  constructor(private http: HttpClient) {}

  getPerritos(): Observable<Perrito[]> {
    return this.http.get<Perrito[]>(this.url);
  }

  getPerrito(id: number): Observable<Perrito> {
    return this.http.get<Perrito>(`${this.url}/${id}`);
  }

  crearPerrito(perrito: Omit<Perrito, 'idPerrito'>): Observable<Perrito> {
    return this.http.post<Perrito>(this.url, perrito);
  }

  actualizarPerrito(id: number, perrito: Partial<Perrito>): Observable<Perrito> {
    return this.http.put<Perrito>(`${this.url}/${id}`, perrito);
  }

  eliminarPerrito(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
