import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionesPage } from './inscripciones.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionesPage
  },  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesPageRoutingModule {}
