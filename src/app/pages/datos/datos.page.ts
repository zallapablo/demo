import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})


export class DatosPage {

  datos: any;
  direccion: any;

  unsorted() {}

  constructor(private http: HttpClient,
              private API: ApiService,
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
    ];

    const direccion = [
      "bosco_tipovia_c",
      "primary_address_street",
      "primary_address_city",
      "primary_address_state",
      "primary_address_postalcode"
    ]

    const id = localStorage.getItem("contact_id");
    
    const res1 = await this.API.getEntryFields("Contacts", id, fields);
    const res2 = await this.API.getEntryFields("Contacts", id, direccion);
    
    
    this.datos = await this.dataService.getLabels("Contacts", fields, res1, "IDato");
    this.direccion = await this.dataService.getLabels("Contacts", direccion, res2, "IDato");
  }
}
