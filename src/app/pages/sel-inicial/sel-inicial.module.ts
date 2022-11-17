import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelInicialPageRoutingModule } from './sel-inicial-routing.module';

import { SelInicialPage } from './sel-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelInicialPageRoutingModule
  ],
  declarations: [SelInicialPage]
})
export class SelInicialPageModule {}
