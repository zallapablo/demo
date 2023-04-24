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

  fields = [
    "id",
    "name"
  ]

  constructor(
    private API: ApiService,
    private dataService: DataService,
    private navCtrl: NavController) { }

  async ionViewWillEnter() {

    const sesiones = await this.API.getEntryList("stic_Sessions", "")
    console.log("TODAS LAS SESIONES: ", sesiones);
    
    const c_id = localStorage.getItem("contact_id");
    const hijo_id = localStorage.getItem("hijo_contact_id");

    const all_fields = await this.dataService.getAllFields("stic_Registrations");

    const af = await this.dataService.getAllFields("stic_Sessions");
    const sesion = await this.API.getRelationships("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059", "stic_sessions_stic_events", "", this.fields);
    console.log("SESION: ", sesion);

    const ses_hijo = await this.API.getRelationships("Contacts", hijo_id, "contacts_stic_sessions_1*", "", this.fields);
    console.log("sesión hijo: ", ses_hijo);

    const prueba = await this.API.getRelationships("stic_Sessions", "36990402-80af-fc74-5a3c-63c7c214646f", "stic_attendances_stic_sessions", "", this.fields);
    console.log("PRUEBA CUTRE: ", prueba);
    
    
    if(sesion["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(sesion);
      console.log("Transformado", this.response);
    }

    /*  ESTÁ BIEN CREO
    const as = await this.getSesiones();
    console.log(as);
    */
  }

  async getSesiones() {

    const af = await this.dataService.getAllFields("stic_Sessions");
    const insf = await this.dataService.getAllFields("stic_Registrations");

    const acts = await this.dataService.getTodasActividades();
    console.log("ACTIVIDADES: ", acts);

    acts['entry_list'].forEach(async act => {
      console.log(act);

      const sesion = await this.API.getRelationships("stic_Events", act['id'], "stic_sessions_stic_events", "", af);
      
      console.log(sesion['entry_list']);

      sesion['entry_list'].forEach(async ses => {

        console.log("SES : ", ses);

        const inscr = await this.API.getRelationships("stic_Sessions", ses['id'], "stic_sessions_stic_registrations_1*", "", insf)
        //console.log("INSC: ", inscr);
      })
    }
  )};

  showSesion(i) {
    console.log("RRR", this.response[i][0].value);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: this.response[i][0].value
      }};

      this.navCtrl.navigateForward(['sesiones/show'], navigationExtras);
  }


}
