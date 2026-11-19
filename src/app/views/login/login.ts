import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formLogin = this.fb.group({
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

  login() {
    if (this.formLogin.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login inválido',
      });
      return;
    } else {
      this.authService.login(this.formLogin.get('email')?.value, this.formLogin.get('password')?.value).subscribe({
        next: () => {
          this.router.navigate(['/catalogo']);
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

    console.log(this.formLogin.value);
  }
}
