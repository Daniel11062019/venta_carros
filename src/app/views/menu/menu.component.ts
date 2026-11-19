import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  // true cuando la pantalla es de celular
  isHandset = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public auth: AuthService
  ) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isHandset = result.matches;
    });
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
