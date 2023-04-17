import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})


export class DatosPage {

  datos: any;
  direccion: any;

  //  PERFIL TUTOR
  nombre: string;
  apellidos: string;
  tipo_id: any;
  num_id: string;
  sexo: any;
  fecha_nac: any;
  email: string;

  //  DIRECCIÓN TUTOR
  tipo_via: any;
  nombre_via: string;
  poblacion: string;
  provincia: any;
  cod_postal: string;
  
  date: any;

  tipos_via = ["", "Calle", "Muelle", "Parque", "Pasaje", "Paseo", "Plaza", "Poligono", "Subida", "Rambla", "Ronda", "Travesía", "Avenida", "Urbanización", "Vía", "Apartado", "Bajada", "Camino", "Carretera", "Casa", "Edificio", "Gran Vía", "Otros"];
  provincias = ["","Albacete","Alicante/Alacant","Almería","Araba/Álava","Asturias","Ávila","Badajoz","Balears, Illes","Barcelona","Bizkaia","Burgos","Cáceres","Cádiz","Cantabria","Castellón/Castelló","Ceuta","Ciudad Real","Córdoba","Coruña, A","Cuenca","Gipuzkoa","Girona","Granada","Guadalajara","Huelva","Huesca","Jaén","León","Lleida","Lugo","Madrid","Málaga","Melilla","Murcia","Navarra","Ourense","Palencia","Palmas, Las","Pontevedra","Rioja, La","Salamanca","Santa Cruz de Tenerife","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia/València","Valladolid","Zamora","Zaragoza","No residentes"];


  unsorted() {}

  constructor(
    private API: ApiService,
    private dataService: DataService,
    private popoverController: PopoverController) { }

/*
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: 'select-popover',
      event: ev,
      translucent: true,
      componentProps: {
        provincias: this.provincias
      }
    });
    await popover.present();
  }
*/

  async ionViewWillEnter() {

    const fields = [
      "first_name",
      "last_name",
      "stic_identification_type_c",
      "stic_identification_number_c",
      "stic_gender_c",
      "birthdate",
      "email1",
    ];

    const direccion = [
      "bosco_tipovia_c",
      "primary_address_street",
      "primary_address_city",
      "primary_address_state",
      "primary_address_postalcode"
    ]

    
    

    const id = localStorage.getItem("contact_id");
    
    const res1 = await this.API.getEntryFields("Contacts", id, fields);
    const res2 = await this.API.getEntryFields("Contacts", id, direccion);
    
    
    console.log(fields);
    this.datos = await this.dataService.getLabels("Contacts", fields, res1, "IDato");
   
    console.log(this.datos);
    console.log(this.datos['Nombre:']);

    this.nombre = this.datos['Nombre:'];
    this.apellidos = this.datos['Apellidos:'];
    this.tipo_id = this.datos['Tipo de identificación'];
    this.num_id = this.datos['Número de identificación'];
    this.sexo = this.datos['Sexo'];
    this.fecha_nac = this.datos['Fecha de nacimiento:']
    
    this.email = this.datos['Correo electrónico:'];

    
    this.direccion = await this.dataService.getLabels("Contacts", direccion, res2, "IDato");
    console.log(this.direccion);

    this.tipo_via = this.direccion['Tipo de vía']
    this.nombre_via = this.direccion['Nombre de vía']
    this.poblacion = this.direccion['Población']
    this.provincia = this.direccion['Provincia']
    this.cod_postal = this.direccion['Código postal']
    

    console.log(this.datos['Fecha de nacimiento:']);
    
    //const fec = this.datePipe.transform(this.datos['Fecha de nacimiento:'], 'DD-mm-YYYY')
    //console.log("NOW: ", fec);
    
    const arr = this.datos['Fecha de nacimiento:'].split('/');
    console.log(arr);
    
    this.date = new Date(arr[2], arr[1]-1, arr[0])
    console.log("fecha: ", this.date);    
  }

  async save() {
    console.log(this.nombre);

    const list = [
      {
        "name": "id",
        "value": localStorage.getItem("contact_id")
      },
      {
        "name": "stic_identification_type_c",
        "value": this.tipo_id
      },
      {
        "name": "stic_identification_number_c",
        "value": this.num_id
      },
      {
        "name": "stic_gender_c",
        "value": this.sexo
      },
      {
        "name": "bosco_tipovia_c",
        "value": this.tipo_via
      },
      {
        "name": "primary_address_street",
        "value": this.nombre_via
      },
      {
        "name": "primary_address_city",
        "value": this.poblacion
      },
      {
        "name": "primary_address_state",
        "value": this.provincia
      },
      {
        "name": "primary_address_postalcode",
        "value": this.cod_postal
      },
    ];

    const res = await this.API.setEntry("Contacts", list);

    console.log(res);

    console.log();
    
    
  }
}
