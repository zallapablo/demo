import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage {

  constructor(
    private API: ApiService,
    private dataService: DataService) { }

  async ionViewWillEnter() {

    const aui_api = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["assigned_user_id"])
    const aui = this.dataService.singleTransform(aui_api)[0].value;
    console.log("Centro de la persona:", aui);

    const query = "stic_attendances.id='7caa6930-3497-902d-e471-63d464baa5f5'"
    

    const all = await this.API.getEntryList("stic_Attendances", query);
    console.log("Todas las asistencias:", all);

    const hijo_id = localStorage.getItem("hijo_contact_id");
    const padre_id = localStorage.getItem("contact_id");

    const fields = [
      "id",
      "name"
    ]

    const asist_api = await this.API.getRelationships("Contacts", padre_id, "contacts_stic_attendances_1*", "", fields)
    console.log("Asistencias: ", asist_api);

    const asist_api2 = await this.API.getRelationships("Contacts", hijo_id, "contacts_stic_attendances_1*", "", fields)
    console.log("Asistencias: ", asist_api2);



    
    
  }

}
