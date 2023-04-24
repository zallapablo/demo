import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  eventSource = [
    {
      title: 'PRUEBA',
      startTime: new Date(Date.UTC(2023, 3, 8)),
      endTime: new Date(Date.UTC(2023, 3, 9)),
      allDay: false,
      desc: 'stic_Events',
      color: 'ROJO'
    }
  ];

  viewTitle: string;

  calendar = {
    mode: "month",
    currentDate: new Date(),
    noEventsLabel: 'No hay eventos'
  };

  evento = {
    title: 'PRUEBA',
    startTime: new Date(Date.UTC(2023, 3, 1)),
    endTime: new Date(Date.UTC(2023, 3, 2)),
    allDay: false
  }

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private API: ApiService,
              private router: Router,
              private dataService: DataService,
              private modalCtrl: ModalController) { }

  async ngOnInit() {

    

    await this.getActs();
    await this.getSesions();
    
    this.loadEvents;
  }

  async getSesions() {
    
  }

  async getActs() {
    const acts = await this.dataService.getActividades();

    acts['entry_list'].forEach(act => {
      console.log(act);
      
      const evento = {
        title: act['name_value_list']['name'].value,
        startTime: new Date(act['name_value_list']['start_date'].value),
        endTime: new Date(act['name_value_list']['end_date'].value),
        allDay: false,
        desc: act['module_name'],
        color: act['name_value_list']['color_evento_c'].value,
        id: act['id']
      }

      console.log(evento);
      
      this.eventSource.push(evento);
    });
  }

  loadEvents() {
    this.eventSource.push({
      title: 'PRUEBA',
      startTime: new Date(Date.UTC(2023, 4, 8)),
      endTime: new Date(Date.UTC(2023, 4, 9)),
      allDay: false,
      desc: 'PRUEBA',
      color: ''
    })
    this.myCal.loadEvents();
    
  }

  next() {
    this.myCal.slideNext();
  }
  back() {
    this.myCal.slidePrev();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log("ON TIME SELECTED: ", ev);
    
  }
}
