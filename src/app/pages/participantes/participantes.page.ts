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
              private router: Router,) { }


  async SelectClicked(sel: string) {
    console.log("Hijo seleccionado: ", sel);
    localStorage.setItem("hijo_spe_id", sel);

    this.getInfoHijo(sel);  
    //this.router.navigate(['/inicio']);
  }


  async ngOnInit() {

    const res = await this.getHijos();
    console.log("Respuesta hijos ", res);

    this.hijos = res['entry_list'];
  }

  async getInfoHijo(id: string) {
    
    const query = "";
    const all_fields = await this.dataService.getAllFields("Contacts");

    const res = await this.API.getEntryId("stic_Personal_Environment", id);
    console.log("INFO DEL HIJO stic_Personal_Environment \n", res);
     
    const con = await this.API.getRelationships("stic_Personal_Environment", id, "stic_personal_environment_contacts", query, all_fields);
    console.log("INFO CONTACTO ", con);
    
    const contacts = await this.API.getEntryList("Contacts", "pa_username_c='zallapablo@gmail.com'");
    console.log(contacts);
  }


  async getHijos() {
    /*
    const stic_id = "6e057c40-94fd-e47e-cc3c-63208a3ed902";
    const contacts_id = "d6d2a064-d66a-7734-7966-63208a653e85";
    const assigned_user_id = "2fe60801-c8f7-1b9a-eb71-614047a8c9e0";
    */

    //  CONSEGUIR ESTE ID MEDIANTE API
    const c_id = "5dd72408-f638-cd29-56c1-63208a8c40ad";
    const all_fields = await this.dataService.getAllFields("stic_Personal_Environment");
    const query = "";

    const res = await this.API.getRelationships("Contacts", c_id, "stic_personal_environment_contacts", query, all_fields);
    
    return res;
  }
}
    
    

    
    




      




