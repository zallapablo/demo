import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPageModule } from '../calendar/calendar.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    NgCalendarModule,
    CalendarPageModule
  ],
  declarations: [InicioPage],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es'
    }
  ]    
})
export class InicioPageModule {}
