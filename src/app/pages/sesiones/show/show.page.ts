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

  sesion_id: string;
  sesion: any;

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService
  ) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.sesion_id = params["id"];

      console.log("param", params["id"]);
    });

    this.sesion = await this.getSesion(this.sesion_id);
    console.log("PRINT ", this.sesion);
  }

  async getSesion(id: string) {

    const fields = [
      "start_date",
      "end_date",
      "name",
      "description"
    ];

    const ses = await this.API.getEntryFields("stic_Sessions", id, fields);
    console.log(ses);

    //const ses = await this.API.getEntryId("stic_Sessions", id);
    console.log(ses);

    return this.dataService.singleTransform(ses);   
  }

}
