import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sel-inicial',
  templateUrl: './sel-inicial.page.html',
  styleUrls: ['./sel-inicial.page.scss'],
})
export class SelInicialPage implements OnInit {

  //hijos: any;
  response: any;

  constructor(private dataService: DataService,
              private API: ApiService,
              private router: Router,
              private menuCtrl: MenuController) { }

  async ngOnInit() {

    const res = await this.getHijos();
    //this.hijos = res['entry_list'];

    this.response = this.dataService.transform(res);
    console.log(this.response);
  }

  async saveContactId(sel: string) {
    const res = await this.API.getRelationships("stic_Personal_Environment", sel, "stic_personal_environment_contacts_1", "", ["id"]);
    const c_id = res["entry_list"][0]["id"];
    
    localStorage.setItem("hijo_contact_id", c_id);    
  }

  async SelectClicked(sel: string) {
    console.log("Hijo seleccionado: ", sel);
    localStorage.setItem("hijo_spe_id", sel);

    this.saveContactId(sel);

    this.menuCtrl.enable(true);
    this.router.navigate(['/inicio']);
  }

  async getHijos() {
    const c_id = localStorage.getItem("contact_id");
    //const all_fields = await this.dataService.getAllFields("stic_Personal_Environment");

    const fields = [
      "id",
      "stic_personal_environment_contacts_1_name"
    ]

    const query = "(relationship_type = 'father' OR relationship_type = 'mother' OR relationship_type = 'legal')";
    
    const res = await this.API.getRelationships("Contacts", c_id, "stic_personal_environment_contacts", query, fields);
    
    return res;
  }
}
