import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  session_id = localStorage.getItem("session_id");
  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  componentes: Observable<Componente[]>;


  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  async logOut() {

    const args = JSON.stringify({ "session": this.session_id });

    const response = await this.http.get(this.url, {
      params: {
        method: 'logout',
        input_type: 'JSON',
        response_type: 'JSON',
        rest_data: args
      }})
      .toPromise()
      .then(res => {
        console.log(res);
      });

      console.log(this.session_id);

      localStorage.clear();
      
      this.router.navigate(['/login']);

  }
}
