import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Se renderiza en el navegador: la sesión está en sessionStorage y el servidor
  // no la conoce. Así tampoco quedan datos guardados en el HTML generado.
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
