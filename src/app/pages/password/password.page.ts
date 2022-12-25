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
    
  }

  async changePassword(p0, p1, p2) {

    const pa = this.dataService.singleTransform(await this.API.getEntryFields("Contacts", localStorage.getItem("contact_id"), ["pa_password_c"]))
    console.log(pa);
    
    if(p0 == String(pa[0].value)) {
      console.log("COntraseña antighua correcta");

      if(p1 == p2) {

        const list = {
          pa_username_c: localStorage.getItem("pa_username_c"),
          pa_password_c: p1
        }

        const ch = await this.API.setEntry("Contacts", list);
        console.log(ch);

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
