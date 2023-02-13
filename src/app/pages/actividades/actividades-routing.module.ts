import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesPage } from './actividades.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesPage
  },  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesPageRoutingModule {}
