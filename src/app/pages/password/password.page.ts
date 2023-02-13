import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  

  constructor(private API: ApiService,
              private dataService: DataService) { }

  async ngOnInit() {
    const contact = localStorage.getItem("contact_id")
    console.log(contact);

    const np = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"])
    console.log(np);
  }

  async changePassword(p0: string, p1: any, p2: any) {

    const pa = this.dataService.singleTransform(await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"]))
    console.log(pa);

    //console.log(typeof(p1));
    
    if(p0 == String(pa[0].value)) {
      console.log("COntraseña antighua correcta");

      if(p1 == p2) {

        console.log("Las contraseñas coinciden: ", p1);

        const contact = localStorage.getItem("contact_id")
        
        const list = [
          { name: 'id', value: contact },
          { name: 'pa_password_c', value: p1 }
        ];

        console.log(list);
        

        const list2 = {

          "id": 
            {
              "name": "id",
              "value": localStorage.getItem("contact_id")
            },
          "name":
            {
              "name": "pa_password_c",
              "value": p1
            }
        }
        

        await this.API.setEntry("Contacts", list)
        //await this.API.setEntry2("Contacts", list)

        const np = await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"])
        console.log(np);
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
