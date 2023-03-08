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
  asist: any;

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

    this.asist = await this.getAsist(this.asist_id);
    console.log("PRINT ", this.asist);
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

    //const ses = await this.API.getEntryId("stic_Sessions", id);
    console.log(asist);

    return this.dataService.singleTransform(asist);   
  }

}
