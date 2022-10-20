import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-perfil-participante',
  templateUrl: './perfil-participante.page.html',
  styleUrls: ['./perfil-participante.page.scss'],
})
export class PerfilParticipantePage implements OnInit {

  response: any;
  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient,
              private API: ApiService,
              private dataService: DataService) { }


  async ngOnInit() {

    const id = localStorage.getItem("hijo_spe_id");
    const query = "stic_personal_environment.id='" + id + "'";

    console.log("ID", localStorage.getItem("hijo_spe_id"));
    
    const spe = await this.API.getEntryList("stic_Personal_Environment", query);
    console.log("SPE info", spe);
    
    const mf = await this.API.getModuleFields("stic_Personal_Environment", "");
    console.log(mf);

    const rel = await this.API.getRelationships("stic_Personal_Environment", id, "stic_personal_environment_contactscontacts_ida", "", ["id", "name"]);
    console.log("RELATION ", rel);

    const rel2 = await this.API.getRelationships("stic_Personal_Environment", id, "stic_personal_environment_contacts", "", await this.dataService.getAllFields("Contacts"));
    console.log("RELATION ", rel2);
    

    const mf2 = await this.API.getModuleFields("Contacts", "");
    console.log(mf2);
    
    
  }

}
