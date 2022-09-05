import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import {Md5} from 'ts-md5/dist/md5';
import { MenuController } from '@ionic/angular';

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
              private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async login() {

    try {

      const userAuth = {  
        user_name: this.email,
        password: Md5.hashStr(this.password)
      }
      
      const appName = null;
      const url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";
      const args = JSON.stringify({ 'user_auth': userAuth, 'application_name': appName });
      

      const response = await this.http.get(url, {
        params: {
          method: 'login',
          input_type: 'JSON',
          response_type: 'JSON',
          rest_data: args
        }})
        .toPromise()
        .then(res => {
          console.log(res);
          this.postId = res;
        });

      console.log(response);


      /*
      const response = await this.http.get(url, {
        params: {
          method: 'login',
          input_type: 'JSON',
          response_type: 'JSON',
          rest_data: args
        }}).subscribe(data => {
          console.log(data);
          this.postId = data;
        }
      );
      */


    } catch (error) {
      //console.error(error.status);
      //console.error(error.error); // Error message as string
      //console.error(error.headers);
    }

    if(this.postId.id == undefined) {
      console.log("Login failed");
    }
    else {
      this.user_id = this.postId.name_value_list.user_id.value;
      this.session_id = this.postId.id;
      console.log("USER_ID IS: ", this.user_id);

      const user_name = this.postId.name_value_list.user_name;
      console.log("USER_NAME IS: ", user_name.value);
      
      localStorage.setItem('user_id', this.user_id);
      localStorage.setItem('session_id', this.session_id);

      this.menuCtrl.enable(true);

      this.router.navigate(['/inicio']);
    }
  }
}
