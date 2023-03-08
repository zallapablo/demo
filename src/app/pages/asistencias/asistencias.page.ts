import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import { NavComponent } from '@ionic/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage {

  response: Array<Object>;
  no_registers: string = "";

  constructor(
    private dataService: DataService,
    private API: ApiService,
    private navCtrl: NavController
    ) { }

  async ionViewWillEnter() {

    const fields = [
      'id',
      'name'
    ]
    
    const c_id = localStorage.getItem("hijo_contact_id");

    const contact = await this.API.getEntryFields("Contacts", c_id, ["full_name"])
    const nombre = contact['entry_list'][0]['name_value_list'].full_name.value;
    console.log(nombre);

    const query = "name like '%" + nombre + "%'"

    const asist = await this.API.getEntryListFields("stic_Attendances", query, fields)
    console.log("Asistencias", asist);
    
    if(asist["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(asist);
      console.log("Transformado", this.response);
    }
  }

  showAsist(i) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: this.response[i][0].value
      }};

      this.navCtrl.navigateForward(['asistencias/show'], navigationExtras);
  }

}
