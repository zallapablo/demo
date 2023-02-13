import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})

export class PagosPage {

  response: Array<Object>;
  no_registers: string = "";

  constructor(
    private router: Router,
    private API: ApiService,
    private dataService: DataService,
    private navCtrl: NavController) { }

  async ionViewWillEnter() {

    const all_fields = await this.dataService.getAllFields("stic_Payments")
    console.log(all_fields);
    

    const fields = [
      "id",
      "name"
    ];

    const padre_id = localStorage.getItem("contact_id");
    console.log("PADRE: ", padre_id);
    
    
    const pagos = await this.API.getRelationships("Contacts", padre_id, "stic_payments_contacts", "", fields);
    console.log("RELACIO 1:", pagos);

    if(pagos["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      this.response = this.dataService.transform(pagos);
      console.log("Transformado", this.response);
    
      console.log("EL NAME: ", this.response[0]);
      
      const res = pagos["entry_list"][0];
      console.log("RES", res);      
    }
  }

  showPago(i) {
    console.log("Pago elegido: ", this.response[i][0].value);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          pago: this.response[i][0].value
      }
    };

    this.navCtrl.navigateForward(['pagos/show'], navigationExtras);
  }
}
