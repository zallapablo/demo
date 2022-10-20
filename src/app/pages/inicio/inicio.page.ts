import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private API: ApiService) { }

  async ngOnInit() {

    console.log("Fields ", await this.API.getModuleFields("Contacts", ""));
    console.log("Fields ", await this.API.getModuleFields("Users", ""));
    

    const user = await this.API.getEntryId("Users", localStorage.getItem("user_id"));
    console.log("User ", user);
    
    const contact_id = await this.API.getRelationships("Users", localStorage.getItem("user_id"), "contacts_sync", "", ["id"]);
    console.log("Contact id", contact_id);
    
    this.getContactId();
  }

  async getContactId() {


    const fields = [
      "id",
      "full_name"
    ];

    const query = "contacts.assigned_user_id='" + localStorage.getItem("user_id") + "'";
    const query2 = "contacts.id='5dd72408-f638-cd29-56c1-63208a8c40ad'";


    const contact = await this.API.getEntryList("Contacts", query);
    console.log("Contacto", contact);
    
    const info = await this.API.getEntryList("Contacts", query2);
    console.log(info);
    
    const ui = await this.API.getEntryId("Users", "2fe60801-c8f7-1b9a-eb71-614047a8c9e0");
    console.log(ui);

    const ui2 = await this.API.getEntry("Users");
    console.log(ui2);
  }

}
