import { Routes } from '@angular/router';
import { Compras } from './views/compras/compras';
import { Catalogo } from './views/catalogo/catalogo';
import { Clientes } from './views/clientes/clientes';
import { Contacto } from './views/contacto/contacto';
import { Inicio } from './views/inicio/inicio';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'clientes', component: Clientes },
  { path: 'catalogo', component: Catalogo },
  { path: 'compras', component: Compras },
  { path: 'contacto', component: Contacto },
  { path: '**', redirectTo: 'catalogo' },
];