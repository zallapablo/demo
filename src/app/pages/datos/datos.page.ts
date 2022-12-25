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

  response: Array<Object>;

  first_name: string
  last_name: string
  stic_identification_type_c: string
  stic_identification_number_c: string
  stic_gender_c: string
  birthdate: string
  email1: string
  bosco_tipovia_c: string
  primary_address_street: string
  primary_address_city: string
  primary_address_state: string
  primary_address_postalcode: string

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

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
      "bosco_tipovia_c",
      "primary_address_street",
      "primary_address_city",
      "primary_address_state",
      "primary_address_postalcode"
    ];

    const id = localStorage.getItem("contact_id");
    const res = await this.API.getEntryFields("Contacts", id, fields);
    
    this.response = this.dataService.singleTransform(res);
    console.log(this.response);

    console.log(this.response[0]["value"]);
    console.log(this.response[0]["value"]);
    console.log(this.response[0]["value"]);
    console.log(this.first_name);
    console.log(this.first_name);
    console.log(this.first_name);
    

    

    
    this.saveValues();
    console.log(this.first_name);
    console.log(this.first_name);
    console.log(this.first_name);

    console.log(this.last_name);
    console.log(this.stic_identification_type_c);
  }

  save() {

  }

  saveValues() {
    this.first_name = this.response[0]["value"]
    this.last_name = this.response[1]["value"]
    this.stic_identification_type_c = this.response[2]["value"]
    this.stic_identification_number_c = this.response[3]["value"]
    this.stic_gender_c = this.response[4]["value"]
    this.birthdate = this.response[5]["value"]
    this.email1 = this.response[6]["value"]
    this.bosco_tipovia_c = this.response[7]["value"]
    this.primary_address_street = this.response[8]["value"]
    this.first_name = this.response[9]["value"]
    this.primary_address_state = this.response[10]["value"]
    this.primary_address_postalcode = this.response[11]["value"]
  }
}
