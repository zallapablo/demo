import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage {

  inscripcion_id: string;
  inscripcion: any;

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.inscripcion_id = params["id"];

      console.log("param", params["id"]);
    });

    this.inscripcion = await this.getInscripcion(this.inscripcion_id);
    console.log("PRINT ", this.inscripcion);
  }

  async getInscripcion(id) {

    const fields = [
      "stic_registrations_stic_events_name",
      "stic_registrations_contacts_name",
      "registration_date"
    ];
/*
    const doc = await this.API.getEntryFields("Documents", id, fields);
    console.log(doc);
*/
    const insc = await this.API.getEntryId("stic_Registrations", id);
    //console.log(insc);

    return this.dataService.singleTransform(insc);   
  }

}
