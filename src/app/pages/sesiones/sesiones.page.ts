import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.page.html',
  styleUrls: ['./sesiones.page.scss'],
})
export class SesionesPage {

  constructor(
    private API: ApiService,
    private dataService: DataService) { }

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

    const ses1 = await this.API.getRelationships("Contacts", c_id, "stic_registrations_contacts", "", all_fields);
    console.log("RELACION contacts y sesiones:", ses1);

    const ses2 = await this.API.getRelationships("Contacts", hijo_id, "stic_registrations_contacts", "", all_fields);
    console.log("RELACION contacts y sesiones:", ses2);

    const sesion = await this.API.getRelationships("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059", "stic_sessions_stic_events", "", all_fields);
    console.log("LA PUITA SESION: ", sesion);
  }

  async getSesion(id: string) {

    const sesion = await this.API.getRelationships("stic_Events", id, "stic_sessions_stic_events", "", [])
    console.log(sesion);
  }

}
