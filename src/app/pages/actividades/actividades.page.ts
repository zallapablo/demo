import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import {formatDate} from '@angular/common';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  response: Array<Object>;
  no_registers: string = "";

  constructor(
    private dataService: DataService,
    private API: ApiService,
    private navCtrl: NavController) { }

  async ngOnInit() {

    /*
    const act = await this.API.getEntryList("stic_Events", "");
    console.log("Lista actividades: ", act);
    */

    const aui_api = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["assigned_user_id"])
    const aui = this.dataService.singleTransform(aui_api)[0].value;
    //console.log("Centro de la persona:", aui);

    const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    console.log("FECHA: ", date);
    

    const fields = [
      "id",
      "name"
    ]
    
    const query = "stic_events.assigned_user_id='" + aui + "' and stic_events.status='registration' and stic_events.end_date>='" + date + "'";
    console.log(query);

    const acts = await this.API.getEntryListFields("stic_Events", query, fields);
    console.log("Acts 0 :", acts);

    if(acts["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(acts);
      console.log("Transformado", this.response);
    
      //console.log("EL NAME: ", this.response[0]);
      
      const res = acts["entry_list"][0];
      //console.log("RES", res);      
    }
  }

  async getAct() {
    const act = await this.API.getEntryId("stic_Events", "876ad600-dce8-25c6-e6d8-6389bc748059")
    console.log("CON ID", act);
    
  }

  showActividad(i) {
    console.log("RRR", this.response[i][3]);

    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          id: this.response[i][3].value
      }};

      this.navCtrl.navigateForward(['actividades/show'], navigationExtras);
  }

  
}
