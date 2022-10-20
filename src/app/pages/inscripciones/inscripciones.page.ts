import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient) { }

  async ngOnInit() {

    const fields = [
      
    ];

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "Contacts",
      "id": localStorage.getItem("user_id"),
      "select_fields": fields,
      "deleted": 0
    });
  
    const response = await this.http.get(this.url, {
      params: {
        method: 'get_entry',
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
