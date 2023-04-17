import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";
  postId: any;
  application_name = null;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private menuCtrl: MenuController
    ) { }

  async logOut() {

    const args = JSON.stringify({ "session": localStorage.getItem("session_id") });

    await this.http.get(this.url, {
      params: {
        method: 'logout',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }}).toPromise();

      localStorage.clear();
  }
    
  async loginAPI(args: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }

    await this.http.get(this.url, {

      params: {
        method: 'login',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }}
      )
      .toPromise()
      .then(res => {
        console.log("RES: ", res);
        this.postId = res;

        localStorage.setItem('session_id', this.postId.id);
      });
  }

  async loginArea(username: any, password: any) {
    
    const query = "pa_username_c='" + username + "' and pa_password_c='" + password + "'";
    const res = await this.getEntryList("Contacts", query);

    if(res["total_count"] == 0) {
      console.log("Usuario no existe");
      
    }
    else {
      console.log("Usuario existe");
      localStorage.setItem("contact_id", res["entry_list"][0].id);
      localStorage.setItem("pa_username_c", username);
      
      this.router.navigate(["/sel-inicial"]);
    }
  }

  async login(userAuth: any) {

    //const ID = localStorage.getItem("user_id");

    const list = [
      {
        "name": "language",
        "value": "es_ES"
      }
    ]

    const args = JSON.stringify({ 'user_auth': userAuth, 'application_name': null, 'name_value_list': list });
    
    const response = await this.http.get(this.url, {
      params: {
        method: 'login',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }})
      .toPromise()
      .then(res => {
        console.log("RES: ", res);
        this.postId = res;
      });

    console.log(response);
    

    if(this.postId.id == undefined) {
      console.log("Login failed");
    }

    else {
      localStorage.setItem('user_id', this.postId.name_value_list.user_id.value);
      console.log("USER_ID IS: ", localStorage.getItem("user_id"));

      localStorage.setItem('session_id', this.postId.id);
      console.log("SESSION_ID IS: ", localStorage.getItem("session_id"));

      this.menuCtrl.enable(true);
      this.router.navigate(['/inicio']);
    }
  }

  async getModuleFields(module: any, fields: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "fields": fields
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_module_fields',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  
  async getEntryId(module: any, id: string) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "id": id,
      "select_fields": [],
      "link_name_to_fields_array": []
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  async getEntryFields(module: any, id: string, fields: Array<string>) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "id": id,
      "select_fields": fields,
      "link_name_to_fields_array": []
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  
  async getEntryList(module: any, query: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "query": query,   
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_entry_list',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  async getEntryListFields(module: any, query: any, fields: string []) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "query": query,   
      "order_by": null,
      "offset": null,
      "select_fields": fields
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_entry_list',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  async getRelationships(moduleName: string, id: string, link: string, query: string, fields: Array<string>) {

    
    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": moduleName,
      "module_id": id,
      "link_field_name": link,
      "related_module_query": query,
      "related_fields": fields,
      "related_module_link_name_to_fields_array": [],
      "deleted": 0
    });

    return this.http.get(this.url, {
      params:
      {
        method: "get_relationships",
        input_type: "JSON",
        response_type: "JSON",
        rest_data: args
      }
    }).toPromise();
  }

  async getHijos(module_id: any) {

    const fields = [

    ];

    const links = [];

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "Contacts",
      "module_id": module_id,
      "link_field_name": "stic_personal_environment_contacts",
      "related_module_query": "relationship_type = 'father'",
      "related_fields": ['id', 'name'],
      "related_module_link_name_to_fields_array": [],
      "deleted": 0
    });

    return this.http.get(this.url, {
      params: 
      {
        method: 'get_relationships',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise();
  }
  
  async getDocRevision(id: string) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "id": id
    });

    return this.http.get(this.url, {
      params: 
      {
        method: 'get_document_revision',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise();
  }

  async getActividad( fields) {

    const aui_api = await this.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["assigned_user_id"]);
    const aui = this.singleTransform(aui_api)[0].value;
    const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const query = "stic_events.assigned_user_id='" + aui + "' and stic_events.status='registration' and stic_events.end_date>='" + date + "'";
    
    return await this.getEntryListFields("stic_Events", query, fields);
  }

  async setEntry(moduleName: string, list: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": moduleName,
      "name_value_list": list,
      "track_view": false
    });

    return this.http.get(this.url, {
      params:
      {
        method: 'set_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise()
  }

  async setRelationship(moduleName: string, id: string, field: string, related_ids: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": moduleName,
      "module_id": id,
      "link_field_name": field,
      "related_ids": related_ids
    });


    return this.http.get(this.url, {
      params:
      {
        method: 'set_relationship',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise()

  }

  async setInscripcion(list: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "stic_Registrations",
      "name_value_list": list
    });

    this.http.post(this.url, {
      params:
      {
        method: 'set_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .subscribe(res => {
      console.log(res);
    })
  }

  async setEntryPost(moduleName: string, list: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": moduleName,
      "name_value_list": list,
      "track_view": false
    });

    const headers = {
      'content-type': 'application/json'
    }

    this.http.post<any>(
      this.url, 
      {
        method: 'set_entry',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      },
      {
        responseType: "json"
      }
    )
    .subscribe(response => {
      console.log("RESPUESTA: ", response);
    })
  }


  singleTransform(object: Object) {

    return Object.keys(object['entry_list'][0]['name_value_list']).map(key => ({
      name: object['entry_list'][0]['name_value_list'][key]['name'],
      value: object['entry_list'][0]['name_value_list'][key]['value']
    }));
  }

  async getLanguageDefinition(modules: any) {
    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "modules": modules,
      "MD5": false
    });

    return this.http.get(this.url, {
      params:
      {
        method: 'get_language_definition',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise();
  }
}




