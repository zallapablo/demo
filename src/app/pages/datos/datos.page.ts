import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})


export class DatosPage implements OnInit {

  response: Array<Object>;

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  constructor(private http: HttpClient,
              private API: ApiService,
              private dataService: DataService) { }

  async ngOnInit() {

    const res = await this.API.getEntry("Users");
    console.log(res);
    
    this.response = this.dataService.singleTransform(res);
    console.log(this.response);


    console.log(await this.API.getModuleFields("Users", ""));
    console.log(await this.API.getModuleFields("Contacts", ""));

    //  HABRÁ QUE USAR ESTE MÉTODO PARA LOS USUARIOS, EL MÍO NO TIENE UN EMAIL ASOCIADO DE MOMENTO PERO LA IDEA ES QUE AL REGISTRARSE EL NOMBRE DE user_name = email1
    //const email = await this.getUserEmail();


    const c_id = "5dd72408-f638-cd29-56c1-63208a8c40ad";
    console.log(await this.API.getEntry("Users"));
    console.log(await this.API.getEntryId("Contacts", c_id));


    const email = "zallapablo@gmail.com";
    this.getContactId(email);

    const acc = await this.API.getEntryList("Accounts", "");
    console.log("Accoutns", acc);
    
  }

  async getUserEmail() {

    const email = await this.API.getEmail();
    console.log("Email: ", email);
    

    //return email;
  }

  async getContactId(email: string) {

    const query = "pa_username_c='" + email + "'";

    const contact = await this.API.getEntryList("Contacts", query);
    console.log("DALE", contact);

    
  }
}
