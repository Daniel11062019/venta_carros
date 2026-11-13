import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { Compras } from './views/compras/compras';
import { Catalogo } from './views/catalogo/catalogo';
import { Clientes } from './views/clientes/clientes';
import { Contacto } from './views/contacto/contacto';
import { Inicio } from './views/inicio/inicio';
import { Login } from './views/login/login';
import { Registro } from './views/registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'clientes', component: Clientes, canActivate: [authGuard, adminGuard] },
  { path: 'catalogo', component: Catalogo, canActivate: [authGuard] },
  { path: 'compras', component: Compras, canActivate: [authGuard, adminGuard] },
  { path: 'contacto', component: Contacto, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: '**', redirectTo: 'catalogo' },
];