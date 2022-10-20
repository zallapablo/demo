import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from '../interfaces/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  constructor(private http: HttpClient,
              private API: ApiService) { }


  transform(object: Object) {

    let i = 0;
    let response: Object[] = [];

    while(i < object['entry_list'].length) {
      
      response.push(Object.keys(object['entry_list'][i]['name_value_list'])
        .map(key => ({
            name: object['entry_list'][i]['name_value_list'][key]['name'],
            value: object['entry_list'][i]['name_value_list'][key]['value']
        })));

        i++;
    }
    return response;
  }

  singleTransform(object: Object) {

    return Object.keys(object['entry_list'][0]['name_value_list']).map(key => ({
      name: object['entry_list'][0]['name_value_list'][key]['name'],
      value: object['entry_list'][0]['name_value_list'][key]['value']
    }));
  }

  async getAllFields(module: string) {

    let res = [];

    const fields = await this.API.getModuleFields(module, "");

    for(const field of Object.keys(fields["module_fields"])) {
      res.push(field);
    }

    return res;
  }

  getMenuOpts() {
    return this.http.get<Componente[]>("/assets/data/menu-options.json");
  }

}
