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

  id_actividad: string;
  actividad: any;

  unsorted() {}

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService
  ) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.id_actividad = params["id"];

      console.log("param", params["id"]);
    });

    this.actividad = await this.getActividad(this.id_actividad);
    console.log("PRINT ", this.actividad);
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

    const resp = await this.dataService.getLabels("stic_Events", fields, act);
    console.log(resp);

    return resp;

    //return this.dataService.singleTransform(act);   
  }

  inscribir() {
    console.log("Inscribir en la actividad: ", this.actividad);
  }

}
