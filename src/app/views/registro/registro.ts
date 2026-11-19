import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './registro.html',
  styleUrl: '../login/login.css',
})
export class Registro {
  public formRegistro: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        ],
      ],
    });
  }

  registrarse() {
    if (this.formRegistro.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registro inválido',
      });
      return;
    } else {
      this.authService
        .registrar(
          this.formRegistro.get('nombre')?.value,
          this.formRegistro.get('email')?.value,
          this.formRegistro.get('password')?.value
        )
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: 'Ahora inicia sesión con tu correo y contraseña',
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (respuesta) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: respuesta.error?.message ?? 'No se pudo conectar con el servidor',
            });
          },
        });
    }

    console.log(this.formRegistro.value);
  }
}
