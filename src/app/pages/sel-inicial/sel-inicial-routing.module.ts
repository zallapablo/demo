import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelInicialPage } from './sel-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: SelInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelInicialPageRoutingModule {}
