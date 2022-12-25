import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosPage } from './documentos.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosPage
  },  {
    path: 'show',
    loadChildren: () => import('./show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then( m => m.NewPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosPageRoutingModule {}
