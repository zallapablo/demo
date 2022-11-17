import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import {Md5} from 'ts-md5/dist/md5';
import { MenuController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;
  postId: any;

  user_id: string;
  session_id: string;

  constructor(private http: HttpClient,
              private router: Router,
              private menuCtrl: MenuController,
              private API: ApiService) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {

    await this.loginAPI();
    //console.log("SESSION_ID: ", localStorage.getItem("session_id"));
    
    await this.loginArea(); 
  }

  //  INICIAR SESIÓN EN EL API CON LOS DATOS DE USERS (ADMINISTRADOR)
  async loginAPI() {

    const appName = null;

    const userAuth = {  
      user_name: "pablozalla",
      password: Md5.hashStr("pablozalla")
    }

    const args = JSON.stringify({ 'user_auth': userAuth, 'application_name': appName });
    
    await this.API.loginAPI(args);
  }


  async loginArea() {

    const res = await this.API.loginArea(this.email, this.password);
    //console.log("RES", res);

  }
}
