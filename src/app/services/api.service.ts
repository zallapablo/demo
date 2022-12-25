import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

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

    await this.http.get(this.url, {

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

    const args = JSON.stringify({ 'user_auth': userAuth, 'application_name': null });
    
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

  async get_User() {

    console.log("Sesión: ", localStorage.getItem("session_id"));
    

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id")
    });

    const response = await this.http.get(this.url, {
      params: {
        method: 'get_user_id',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
    .toPromise()
    .then(res => {
      console.log("User id is: ", res);
    });
  }

  async getModules() {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id")
    });

    return this.http.get(this.url, {
      params: {
        method: 'get_available_modules',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).toPromise();
  }

  async getEmail() {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "Users",
      "id": localStorage.getItem("user_id"),
      "select_fields": ["email1"],
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

  async getEntry(module: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "id": localStorage.getItem("user_id"),
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


  async getModuleId(query: string) {

    const fields = [
      
    ];

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": "Contacts",
      "query": query,
      "order_by": "",
      "offset": null,
      "select_fields": fields,
      "link_name_to_fields_array": null,
      "max_results": null,
      "deleted": false,
      "favorites": false      
    });

    this.http.get(this.url, {
      params: {
        method: 'get_entry_list',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    }).subscribe( res => {
      //console.log("Res ", res)
    });

    /*const response = await this.http.get(this.url, {
      params: {
        method: 'get_entry_list',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }
    })
      .toPromise()
      .then(res => {
        console.log("Get module id: \n", res);
      });

      return response;
      */

      
  }

  async getRelationships(module: string, id: string, link: string, query: string, fields: Array<string>) {

    
    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
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

  async setEntry(module: string, list: any) {

    const args = JSON.stringify({
      "session": localStorage.getItem("session_id"),
      "module_name": module,
      "name_value_list": list
    });

    return this.http.post(this.url, {
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
}




