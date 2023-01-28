import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})

export class PagosPage {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(
    private router: Router,
    private API: ApiService,
    private dataService: DataService) { }

  async ionViewWillEnter() {

    const all_fields = await this.dataService.getAllFields("stic_Payments")

    const fields = [
      "id"
    ];

    const c_id = localStorage.getItem("hijo_contact_id");

    const padre_id = localStorage.getItem("contact_id");
    console.log("PADRE: ", padre_id);
    
    

    const p1 = await this.API.getRelationships("Contacts", padre_id, "stic_payments_contacts", "", all_fields);
    console.log("RELACIO 1:", p1);


  }
  
}
