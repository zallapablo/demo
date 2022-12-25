import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})


export class ShowPage {
  doc_id: string;
  document: any;
  filename: string;

  constructor(private route: ActivatedRoute,
              private API: ApiService,
              private dataService: DataService) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.doc_id = params["doc"];

      //console.log("param", params["doc"]);
    });
    
    this.document = await this.getDoc(this.doc_id);
    this.filename = this.document[0].value;
  }
  
  async getDoc(doc_id) {

    const fields = [
      "filename",
      "status_id",
      "category_id",
      "description"
    ];

    const doc = await this.API.getEntryFields("Documents", doc_id, fields);
    console.log(doc);

    const docs = await this.API.getEntryId("Documents", doc_id);
    console.log(docs);

    return this.dataService.singleTransform(doc);   
  }

  async download() {

    const rev = await this.API.getEntryFields("Documents", this.doc_id, ["document_revision_id"]);
    const st = this.dataService.singleTransform(rev);
    const rev_id = st[0].value;
    
    console.log("REv id", rev_id);
    
    const dl = await this.API.getDocRevision(rev_id);
    console.log(dl);

    const base64 = dl["document_revision"].file;
    console.log(base64);

    const blob = new Blob([atob(base64)], { type: 'application/pdf' });

    saveAs(blob, this.filename);
  }

  delete() {
    console.log("Eliminar doc: ", this.doc_id);
  }
}
