import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private API: ApiService,
              private router: Router) { }

  ngOnInit() {

    
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
}
