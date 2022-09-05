import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient) { }

  async ngOnInit() {

    const fields = [
      'phone_mobile'
    ];

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      'modules': 'Contacts',
      'md5': false
    });
  
    const response = await this.http.get(this.url, {
      params: {
        method: 'get_language_definition',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }})
      .toPromise()
      .then(res => {
        console.log(res);
      });

    console.log(response);
  }

}
