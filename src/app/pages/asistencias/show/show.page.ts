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

  asist_id: string;
  asistances: any;

  unsorted() {}

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService
  ) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.asist_id = params["id"];

      console.log("param", params["id"]);
    });

    this.asistances = await this.getAsist(this.asist_id);
    console.log("PRINT ", this.asistances);
  }

  async getAsist(id: string) {

    const fields = [
      "start_date",
      "duration",
      "status",
      "description",
      "stic_attendances_stic_registrations_name",
      "stic_attendances_stic_sessions_name"
    ];

    const asist = await this.API.getEntryFields("stic_Attendances", id, fields);
    console.log(asist);

    const resp = await this.dataService.getLabels("stic_Attendances", fields, asist, "IAsistencia");
    console.log(resp);

    return resp;

    //const ses = await this.API.getEntryId("stic_Sessions", id);
    //return this.dataService.singleTransform(asist);   
  }

}
