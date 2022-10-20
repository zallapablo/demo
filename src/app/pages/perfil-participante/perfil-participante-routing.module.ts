import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilParticipantePage } from './perfil-participante.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilParticipantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilParticipantePageRoutingModule {}
