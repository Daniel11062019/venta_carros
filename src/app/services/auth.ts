import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../Models/UsuarioModels';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = `${environment.apiUrl}/api/v1/auth`;
  private readonly claveSesion = 'usuario';

  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  readonly usuario = signal<Usuario | null>(this.leerSesion());

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.url}/login`, { correo, contrasena })
      .pipe(tap((usuario) => this.guardarSesion(usuario)));
  }

  registrar(nombre: string, correo: string, contrasena: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.url}/registro`, { nombre, correo, contrasena })
      .pipe(tap((usuario) => this.guardarSesion(usuario)));
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.claveSesion);
    this.usuario.set(null);
  }

  // sessionStorage solo existe en el navegador, no en el servidor (SSR).
  private leerSesion(): Usuario | null {
    if (!this.esNavegador) return null;

    const guardado = sessionStorage.getItem(this.claveSesion);
    return guardado ? JSON.parse(guardado) : null;
  }

  private guardarSesion(usuario: Usuario): void {
    sessionStorage.setItem(this.claveSesion, JSON.stringify(usuario));
    this.usuario.set(usuario);
  }
}
