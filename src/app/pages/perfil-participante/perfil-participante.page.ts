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
  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private API: ApiService,
              private dataService: DataService) { }

  async ionViewWillEnter() {

    const id = localStorage.getItem("hijo_spe_id");
    const link = "stic_personal_environment_contacts_1";

    const fields = [
      "first_name",
      "last_name",
      "stic_identification_type_c",
      "stic_identification_number_c",
      "stic_gender_c",
      "birthdate",
      "email1",
      "curso_escolar_c",
      "bosco_tipovia_c",
      "primary_address_street",
      "primary_address_city",
      "primary_address_state",
      "primary_address_postalcode",
      "bosco_descripcio_allergies_c",
      "bosco_descripcio_intoler_c",
      "bosco_descripcio_tratam_c",
      "bosco_descripcio_enfermed_c",
      "bosco_descripcio_otros_c"
    ];

    /*
    const res = await this.API.getRelationships("stic_Personal_Environment", id, link, "", fields);
    console.log(res);
    */
    const c_id = localStorage.getItem("hijo_contact_id");
    const res = await this.API.getEntryFields("Contacts", c_id, fields);
    console.log(res);
    

    this.response = this.dataService.singleTransform(res);
    console.log(this.response);
  }
}
