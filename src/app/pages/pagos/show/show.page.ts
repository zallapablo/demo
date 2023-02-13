import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})

export class ShowPage {

  pago_id: string;
  pago: any;

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.pago_id = params["pago"];

      //console.log("param", params["pago"]);
    });
    
    this.pago = await this.getPago(this.pago_id);

    //console.log(this.pago);
  }

  async getPago(id) {

    const fields = [
      "name",
      "stic_payments_stic_registrations_name",
      "status",
      "payment_type",
      "amount",
      "payment_method"
    ]

    const pago = await this.API.getEntryFields("stic_Payments", id, fields);
    console.log(id);

    return this.dataService.singleTransform(pago);    
  }
}
