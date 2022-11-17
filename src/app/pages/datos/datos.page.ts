import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})


export class DatosPage implements OnInit {

  response: Array<Object>;

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient,
              private API: ApiService,
              private dataService: DataService) { }

  async ngOnInit() {

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
  }
}
