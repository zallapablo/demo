import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilParticipantePageRoutingModule } from './perfil-participante-routing.module';

import { PerfilParticipantePage } from './perfil-participante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilParticipantePageRoutingModule
  ],
  declarations: [PerfilParticipantePage]
})
export class PerfilParticipantePageModule {}
