import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente, IPago, IActividad, IInscripcion } from '../interfaces/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  interfaz = {};

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

  getId(obj: Object) {

    return (obj['entry_list'][0].id);
    
  }

  async getLabels(module_name:string, fields: string[], obj: object) {

    switch(module_name) {
      case "stic_Payments": this.interfaz = {} as IPago;
        break;
      case "stic_Events": this.interfaz = {} as IActividad;
        break;
      case "stic_Registrations": this.interfaz = {} as IInscripcion;
        break;
    }

    const mf = await this.API.getModuleFields(module_name, fields);
    console.log(mf['module_fields']);

    /*
    for(const [k, v] of Object.entries(mf['module_fields'])) {
      //console.log(v);
      
      this.campos[v['label']] = v['name']
      
    }

    console.log("CAMPOS: ", this.campos);

    */

    const transformado = this.singleTransform(obj);
    

    transformado.forEach(element => {
      console.log("Elemento: ", element.name);

      const o = mf['module_fields'][element.name];

      console.log(o);
      
      if(o.type == "enum") {
        //console.log(o.label, " ES ENUMERADO");

        const index = Object.keys(o.options).indexOf(element.value)
        //console.log(index);

        const val = Object.values(o.options)[index]['value'];
        //console.log("VALOR ENUMERADO: ", val);
        this.interfaz[o.label] = val;
        
        
      }
      else {
        this.interfaz[o.label] = element.value;
      }
      //console.log(o);
    });

    console.log("CAMPOS FINAL: ", this.interfaz);
    console.log("TRANSFORMADO: ", transformado);

    return this.interfaz;
  }

}
