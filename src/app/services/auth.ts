import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../Models/UsuarioModels';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `${environment.apiUrl}/api/v1/auth`;
  private claveSesion = 'usuario';

  // Usuario con la sesión iniciada (null si nadie ha entrado)
  usuario: Usuario | null = null;

  constructor(private http: HttpClient) {
    this.usuario = this.leerSesion();
  }

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.url}/login`, { correo, contrasena })
      .pipe(tap((usuario) => this.guardarSesion(usuario)));
  }

  // Solo crea el usuario. No inicia sesión: después tiene que entrar por el login.
  registrar(nombre: string, correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/registro`, { nombre, correo, contrasena });
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.claveSesion);
    this.usuario = null;
  }

  // sessionStorage solo existe en el navegador, no en el servidor (SSR).
  private leerSesion(): Usuario | null {
    if (typeof sessionStorage === 'undefined') return null;

    const guardado = sessionStorage.getItem(this.claveSesion);
    return guardado ? JSON.parse(guardado) : null;
  }

  private guardarSesion(usuario: Usuario): void {
    sessionStorage.setItem(this.claveSesion, JSON.stringify(usuario));
    this.usuario = usuario;
  }
}
