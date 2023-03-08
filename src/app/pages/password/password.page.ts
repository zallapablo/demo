import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from '../../services/data.service';
import { AppComponent } from '../../app.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage {

  

  constructor(private API: ApiService,
              private dataService: DataService,
              private http: HttpClient,
              private alertController: AlertController,
              private router: Router) { }

  async ionViewWillEnter() {
    const contact = localStorage.getItem("contact_id")
    console.log(contact);

    const np = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"])
    console.log(np['entry_list'][0]['name_value_list']['pa_password_c'].value);
  }
/*
  async cambia() {

    const nueva = "nueva"
    const sessionId = localStorage.getItem("session_id")
    const moduleName = "Contacts"
    const id = localStorage.getItem("contact_id")
    const url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php"

    const list0 = {
      "id": id,
      "pa_password_c": nueva
    }

    const list  = {
      "id": { name: "id", value: id },
      "pa_password_c": { name: "pa_password_c", value: nueva }
    }

    
    const list2 = [
      {
        "name": "id",
        "value": localStorage.getItem("contact_id")
      },
      {
        "name": "pa_password_c",
        "value": nueva
      }
    ]

    const list3  = {
      id: { name: "id", value: id },
      pa_password_c: { name: "pa_password_c", value: nueva }
    }
    
    //  SI SE CAMBIA GET POR POST FUNCIONA CON LAS 4 LISTAS

    const args = JSON.stringify({
      "session": sessionId,
      "module_name": moduleName,
      "name_value_list": list2,
      "track_view": false
    });

    console.log("ARGUMENTOS:", args);
    
    
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Accept' : 'application/json',
    }

    const res = this.http.get(
      url, {
        params:
        {
          method: "set_entry",
          input_type: "JSON",
          response_type: "JSON",
          rest_data: args
        },
        headers
      }
    ).subscribe((response => {
      console.log(response);
    }));

    console.log(res);
  }
*/
  async changePassword(p0: string, p1: any, p2: any) {

    const pa = this.dataService.singleTransform(await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"]))
    console.log(pa);

    console.log(typeof(p1));
    
    if(p0 == String(pa[0].value)) {
      console.log("COntraseña antighua correcta");

      if(p1 == p2) {

        console.log("Las contraseñas coinciden: ", p1);

        const list = [
          {
            "name": "id",
            "value": localStorage.getItem("contact_id")
          },
          {
            "name": "pa_password_c",
            "value": p1
          }
        ]
        

        const res = await this.API.setEntry("Contacts", list);
        //await this.API.setEntry2("Contacts", list)

        const alert = await this.alertController.create({
          //header: 'Alert',
          //subHeader: 'Important message',
          message: 'Se ha actualizado la contraseña',
          buttons: ['OK'],
        });

        await alert.present();

        window.location.reload();
      }
      else{
        console.log("Las contraseñas no coindicen");
      }
    }
    else {
      console.log("La contraseña actual es incorrecta");
      
    }
  }
}
