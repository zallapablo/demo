import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage {

  id_actividad: string;
  actividad: any;

  unsorted() {}

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService,
    private router: Router
  ) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.id_actividad = params["id"];

      console.log("param", params["id"]);
    });

    this.actividad = await this.getActividad(this.id_actividad);
    console.log("PRINT ", this.actividad);
    
    const af = await this.dataService.getAllFields("stic_Registrations");
    
    const mf = await this.API.getModuleFields("stic_Registrations", af);
    console.log(mf);
    
    const ai = await this.API.getEntryId("stic_Registrations", "d10a2c4c-ab7d-2d74-8698-6409b50421a6");
    console.log(ai); 
  }

  async getActividad(id: string) {

    const fields = [ 
      "name",
      "type",
      "start_date",
      "end_date",
      "start_inscripcion_c",
      "end_inscripcion_c",
      "description"
    ];
/*
    const doc = await this.API.getEntryFields("Documents", id, fields);
    console.log(doc);
*/
    const act = await this.API.getEntryFields("stic_Events", id, fields);
    console.log(act);

    const resp = await this.dataService.getLabels("stic_Events", fields, act, "IActividad");
    console.log(resp);

    

    return resp;

    //return this.dataService.singleTransform(act);   
  }

  async inscribir() {

    const fields = [ 
      "name",
      "type",
      "start_date",
      "end_date",
      "start_inscripcion_c",
      "end_inscripcion_c",
      "description"
    ];

    const resp = await this.API.getEntryFields("stic_Events", this.id_actividad, fields);
    console.log(resp);

    const act = this.dataService.singleTransform(resp);
    console.log(act);
    
    
    console.log("Inscribir en la actividad: ", this.id_actividad);

    const nombre_api = await this.API.getEntryFields("Contacts", localStorage.getItem("hijo_contact_id"), ["full_name"]);
    console.log("NOMBRE HIJO: ", nombre_api);

    const no = this.dataService.singleTransform(nombre_api)

    const nombre = no[0].value + " - " + this.actividad["Nombre"];
    ;
    const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'es-ES')
    console.log(date);
    
    console.log(this.actividad["Nombre"]);
    
    const list = [
      {
        "name": "registration_date",
        "value": date
      },
      {
        "name": "participation_type",
        "value": "attendant"
      },
      {
        "name": "stic_registrations_stic_events_name",
        "value": this.actividad["Nombre"]
      },
      {
        "name": "stic_registrations_contacts_name",
        "value": no[0].value
      },
      {
        "name": "name",
        "value": nombre
      },
      {
        "name": "status",
        "value": "confirmed"
      }       
    ]

    const res = await this.API.setEntry("stic_Registrations", list);
    console.log("RESPUESTA DEL SET: ", res);
    
    this.inscripcion(res);
    //this.router.navigate(["./inscripciones"]);

  }

  async inscripcion(res: any) {
    const id = res['id'];
    console.log(res);

    const insc = await this.API.getEntryId("stic_Registrations", id);
    console.log("LA INSCRIPCIÓN:", insc);
    
    
  }

}
