import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  response: Array<Object>;

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(
    private dataService: DataService,
    private API: ApiService) { }

  async ngOnInit() {

    this.getAct()

    const act = await this.API.getEntryList("stic_Events", "");
    console.log("Lista actividades: ", act);

    const aun_api = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["assigned_user_name"])

    const aun = this.dataService.singleTransform(aun_api)[0].value;
    //console.log("Centro de la persona:", aun);


    const query = "assigned_user_name='" + aun + "'"
    console.log(query);

    const final_query = "assigned_user_name='" + aun.replace(/\s/g, "") + "'"
    console.log("FINAL QUERY: ", final_query);
    const def = await this.API.getEntryList("stic_Events", final_query)
    console.log("DEF :", def);


    const acts = await this.API.getEntryList("stic_Events", query)
    console.log("Acts 0 :", acts);




    const query1 = "assigned_user_name='Centro1'"
    console.log("Query 1: ", query1);

    const acts1 = await this.API.getEntryList("stic_Events", query1)
    console.log("Acts 1 :", acts1);



    const query2 = "assigned_user_name = 'Centro 1'"
    console.log("Query2: ", query2);
    
    const acts2 = await this.API.getEntryList("stic_Events", query2)
    console.log("Acts 2", acts2);


    const id = localStorage.getItem("contact_id");
    const hijo_id = localStorage.getItem("hijo_contact_id")

    const rel = await this.API.getRelationships("Contacts", hijo_id, "stic_registrations_contacts", "", ["id", "name"]);
    console.log("RELACIOBN:", rel);
    
  }

  async getAct() {
    const act = await this.API.getEntryId("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059")
    console.log("CON ID", act);
    
  }
}
