import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-perfil-participante',
  templateUrl: './perfil-participante.page.html',
  styleUrls: ['./perfil-participante.page.scss'],
})
export class PerfilParticipantePage  {

  response: any;
  direccion: any;
  adicional: any;

  unsorted() {}

  constructor(private API: ApiService,
              private dataService: DataService) { }

  async ionViewWillEnter() {

    const fields = [
      "first_name",
      "last_name",
      "stic_identification_type_c",
      "stic_identification_number_c",
      "stic_gender_c",
      "birthdate",
      "email1",
      "curso_escolar_c",
    ];

    const direccion = [
      "bosco_tipovia_c",
      "primary_address_street",
      "primary_address_city",
      "primary_address_state",
      "primary_address_postalcode",
    ];

    const adicional = [
      "bosco_descripcio_allergies_c",
      "bosco_descripcio_intoler_c",
      "bosco_descripcio_tratam_c",
      "bosco_descripcio_enfermed_c",
      "bosco_descripcio_otros_c"
    ];

    const c_id = localStorage.getItem("hijo_contact_id");
    const res1 = await this.API.getEntryFields("Contacts", c_id, fields);
    console.log("RES1: ", res1);

    const res2 = await this.API.getEntryFields("Contacts", c_id, direccion);
    console.log(res2);

    const res3 = await this.API.getEntryFields("Contacts", c_id, adicional);
    console.log(res3);

    this.response = await this.dataService.getLabels("Contacts", fields, res1, "IParticipante");
    this.direccion = await this.dataService.getLabels("Contacts", direccion, res2, "IParticipante");
    this.adicional = await this.dataService.getLabels("Contacts", adicional, res3, "IParticipante");
  }
}
