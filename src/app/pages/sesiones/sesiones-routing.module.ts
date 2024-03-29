import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionesPage } from './sesiones.page';

const routes: Routes = [
  {
    path: '',
    component: SesionesPage
  },
  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionesPageRoutingModule {}
