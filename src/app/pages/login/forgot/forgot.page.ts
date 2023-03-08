import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {

  constructor() { }

  ionViewWillEnter() {

  }

  send(user, email) {
    console.log("RESTABLECER: ", user, " y ", email);
    
  }

}
