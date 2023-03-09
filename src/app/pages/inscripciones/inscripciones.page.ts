import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage {

  response: Array<Object>;
  no_registers: string = "";

  constructor(
    private API: ApiService,
    private dataService: DataService,
    public navCtrl: NavController) { }

  async ionViewWillEnter() {

    const fields = [
      "id",
      "name",
      "ccjdbe_color_prenda_c",
      "ccjdbe_talla_c"
    ];

    const all_fields = await this.dataService.getAllFields("stic_Registrations");
    
    const mf = await this.API.getModuleFields("stic_Registrations", all_fields)
    console.log("ALL FIELDS: ", mf);
    

    const c_id = localStorage.getItem("hijo_contact_id");

    const ins = await this.API.getRelationships("Contacts", c_id, "stic_registrations_contacts", "", fields);
    console.log("RELACIOBN:", ins);

    const ins2 = await this.API.getRelationships("Contacts", c_id, "stic_registrations_contacts", "", all_fields);
    console.log("TODOS LOS DATOS:", ins2);

    if(ins["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(ins);
      console.log("Transformado", this.response);
    
      console.log("EL NAME: ", this.response[0]);
      
      const res = ins["entry_list"][0];
      console.log("RES", res);      
    }
  }

  showInscripcion(i) {
    console.log("RRR", this.response[i][0].value);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: this.response[i][0].value
      }};

      this.navCtrl.navigateForward(['inscripciones/show'], navigationExtras);
  }
}
