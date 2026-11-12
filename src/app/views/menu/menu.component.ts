import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
})
export class MenuComponent {

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);

  readonly isHandset = toSignal(
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches)),
    {
      initialValue: false
    }
  );

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
