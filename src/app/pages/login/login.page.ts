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

    const url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";
    const appName = null;

    const userAuth = {  
      user_name: this.email,
      password: Md5.hashStr(this.password)
    }

    const args = JSON.stringify({ 'user_auth': userAuth, 'application_name': appName });

    await this.API.login(userAuth);
  }
}
