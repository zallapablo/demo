import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.page.html',
  styleUrls: ['./participantes.page.scss'],
})
export class ParticipantesPage implements OnInit {

  hijos: any;

  constructor(private API: ApiService, 
              private dataService: DataService,
              ) { }


  async SelectClicked(sel: string) {
    console.log("Hijo seleccionado: ", sel);
    localStorage.setItem("hijo_spe_id", sel);

    this.saveContactId(sel);
    
    //this.router.navigate(['/inicio']);
  }

  async saveContactId(sel: string) {
    const res = await this.API.getRelationships("stic_Personal_Environment", sel, "stic_personal_environment_contacts_1", "", ["id"]);
    const c_id = res["entry_list"][0]["id"];
    
    localStorage.setItem("hijo_contact_id", c_id);    

    console.log(localStorage.getItem("hijo_contact_id"));
    
  }

  async ngOnInit() {

    console.log(await this.API.getModuleFields("stic_Personal_Environment",""));
    const res = await this.getHijos();
    console.log("Respuesta hijos ", res);

    this.hijos = res['entry_list'];
  }

  async getHijos() {
    
    const c_id = localStorage.getItem("contact_id");
    const all_fields = await this.dataService.getAllFields("stic_Personal_Environment");
    const query = "(relationship_type = 'father' OR relationship_type = 'mother' OR relationship_type = 'legal')";
    
    const res = await this.API.getRelationships("Contacts", c_id, "stic_personal_environment_contacts", query, all_fields);
    
    return res;
  }
}
    
    

    
    




      




