import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { IPago } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})



export class ShowPage {

  pago_id: string;
  pago: any;
  ipago = {} as IPago;
  tr2: any;

  unsorted() {}

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

    console.log(pago);
    console.log(id);

    const resp = this.dataService.getLabels("stic_Payments", fields, pago, "IPago");
    console.log(resp);

    return resp;
    

/*
    const mf = await this.API.getModuleFields("stic_Payments", fields);
    console.log(mf['module_fields']);

    /*
    for(const [k, v] of Object.entries(mf['module_fields'])) {
      //console.log(v);
      
      this.campos[v['label']] = v['name']
      
    }

    console.log("CAMPOS: ", this.campos);

    

    const transformado = this.dataService.singleTransform(pago);
    

    transformado.forEach(element => {
      console.log("Elemento: ", element.name);

      const o = mf['module_fields'][element.name];

      console.log(o);
      

      if(o.type == "enum") {
        //console.log(o.label, " ES ENUMERADO");

        const index = Object.keys(o.options).indexOf(element.value)
        //console.log(index);

        const val = Object.values(o.options)[index]['value'];
        //console.log("VALOR ENUMERADO: ", val);
        this.campos[o.label] = val;
        
        
      }
      else {
        this.campos[o.label] = element.value;
      }
      //console.log(o);
      
      
    });

    console.log("CAMPOS FINAL: ", this.campos);
   
    
    console.log("TRANSFORMADO: ", transformado);
    return this.dataService.singleTransform(pago);  
    */  
  }
}
