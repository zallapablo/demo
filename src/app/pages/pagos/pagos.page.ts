import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})

export class PagosPage implements OnInit {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient) { }

  async ngOnInit() {

    const fields = [
      
    ];

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "stic_Payments",
      "fields": fields
    });
  
    const response = await this.http.get(this.url, {
      params: {
        method: 'get_module_fields',
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
