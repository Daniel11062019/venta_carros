import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  correo = '';
  contrasena = '';
  readonly error = signal('');
  readonly cargando = signal(false);
  readonly verContrasena = signal(false);

  iniciarSesion(): void {
    this.error.set('');
    this.cargando.set(true);
    this.auth.login(this.correo, this.contrasena).subscribe({
      next: () => this.router.navigate(['/catalogo']),
      error: (respuesta) => {
        this.cargando.set(false);
        this.error.set(respuesta.error?.message ?? 'No se pudo conectar con el servidor');
      },
    });
  }
}
