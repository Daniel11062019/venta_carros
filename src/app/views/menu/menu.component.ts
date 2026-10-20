import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { RouterLink, RouterOutlet } from '@angular/router';

import { map } from 'rxjs/operators';

import { PerritosService } from '../../services/perritos.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterOutlet
  ],
})
export class MenuComponent implements OnInit {

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly perritosService = inject(PerritosService);

  readonly isHandset = toSignal(
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches)),
    {
      initialValue: false
    }
  );

  ngOnInit(): void {
    this.perritosService.getPerritos().subscribe({
      next: (datos) => console.log('Perritos:', datos),
      error: (error) => console.error('No se pudieron cargar los perritos', error)
    });
  }
}