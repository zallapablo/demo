import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  styleUrls: ['./sesiones.page.scss'],
})
export class SesionesPage {

  response: Array<Object>;
  no_registers: string = "";

  constructor(
    private API: ApiService,
    private dataService: DataService,
    private navCtrl: NavController) { }

  async ionViewWillEnter() {

    const sesiones = await this.API.getEntryList("stic_Sessions", "")
    console.log("TODAS LAS SESIONES: ", sesiones);
    
    const c_id = localStorage.getItem("contact_id");
    const hijo_id = localStorage.getItem("hijo_contact_id");

    const fields = [
      "id",
      "name"
    ]

    const all_fields = await this.dataService.getAllFields("stic_Registrations");

    const sesion = await this.API.getRelationships("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059", "stic_sessions_stic_events", "", fields);
    console.log("LA PUTA SESION: ", sesion);

    if(sesion["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(sesion);
      console.log("Transformado", this.response);
    }
  }

  showSesion(i) {
    console.log("RRR", this.response[i][0].value);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: this.response[i][0].value
      }};

      this.navCtrl.navigateForward(['sesiones/show'], navigationExtras);
  }


}
