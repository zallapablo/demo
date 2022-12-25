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
    console.log(act);

    const aun_api = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["assigned_user_name"])

    console.log("AUN API", aun_api);
    
    const aun = this.dataService.singleTransform(aun_api)[0].value;
    console.log("Centro de la persona:", aun);

    console.log(aun);
    

    const query = "assigned_user_name='" + aun + "'"
    console.log(query);

    const query2 = "assigned_user_name='SinergiaCRM'"
    console.log(query2  );
    
    
    const acts1 = await this.API.getEntryList("stic_Events", query)
    console.log(acts1);

    const acts2 = await this.API.getEntryList("stic_Events", query2)
    console.log(acts2);
  }

  async getAct() {
    const act = await this.API.getEntryId("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059")
    console.log("CON ID", act);
    
  }
}
