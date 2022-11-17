import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPageModule } from '../calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    NgCalendarModule,
    CalendarPageModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
