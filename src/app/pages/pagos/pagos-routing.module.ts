import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';

const routes: Routes = [
  {
    path: '',
    component: PagosPage
  },  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
