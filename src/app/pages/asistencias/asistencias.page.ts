import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  response: Array<Object>;

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
      "deleted": 1
    });
  
    
    await this.http.get(this.url, {
      params: {
        method: 'get_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }})
      .toPromise()
      .then(res => {
        
        //this.response = res['entry_list'][0]['name_value_list'];

        console.log(res);
        
        
        this.response = Object.keys(res['entry_list'][0]['name_value_list'])
        .map(key => ({
          name: res['entry_list'][0]['name_value_list'][key]['name'],
          value: res['entry_list'][0]['name_value_list'][key]['value']
        }));

        console.log(this.response);

      });
  }

}
