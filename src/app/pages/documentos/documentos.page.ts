import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  response: string | Array<Object>;
  no_registers: string = "";

  constructor(private API: ApiService,
              private dataService: DataService) { }

  async ionViewWillEnter() {

    const fields = [
      "id",
      "document_name",
      "filename",
      "active_date",
      "category_id",
    ];
    
    const c_id = localStorage.getItem("hijo_contact_id");
    
    const docs = await this.API.getRelationships("Contacts", c_id, "documents", "", fields);
    console.log("DOCS", docs);

    

    if(docs["entry_list"].length == 0) {
      this.no_registers = "No hay ningún registro.";
    }
    else {
      
      console.log(docs);

      this.response = this.dataService.transform(docs);
      console.log("Transformado", this.response);

      console.log(this.response[0][0].name);
      
      

      const res = docs["entry_list"][0];
      console.log(res);
      
    }
  }



}
