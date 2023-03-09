import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { DataService } from '../../../services/data.service';
import { saveAs } from 'file-saver';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})


export class ShowPage {
  doc_id: string;
  document: any;
  filename: string;

  unsorted() {}

  constructor(
    private route: ActivatedRoute,
    private API: ApiService,
    private dataService: DataService,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  async ionViewWillEnter() {

    this.route.queryParams.subscribe(params => {
      this.doc_id = params["doc"];

      //console.log("param", params["doc"]);
    });
    
    this.document = await this.getDoc(this.doc_id);
    console.log(this.document);
    
    this.filename = this.document['Nombre de Archivo:']
    console.log(this.filename);
    
  }
  
  async getDoc(doc_id) {

    const fields = [
      "filename",
      "status_id",
      "category_id",
      "description"
    ];

    const doc = await this.API.getEntryFields("Documents", doc_id, fields);
    console.log("DOC: ", doc);

    const resp = await this.dataService.getLabels("Documents", fields, doc, "IDocumento");
    console.log(resp);

    return resp;

    //return this.dataService.singleTransform(doc);   
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

  async delete() {

    const alert = await this.alertController.create({
      header: '¿Estás seguro de querer borrar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          role: 'confirm'
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    const list = [
      {
        "name": "id",
        "value": this.doc_id
      },
      {
        "name": "deleted",
        "value": 1
      }
    ]

    if(role == "confirm") {
      const res = await this.API.setEntry("Documents", list);
    
      this.navCtrl.back();
    }
  }
}
