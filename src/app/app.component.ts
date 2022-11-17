import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  url = "https://confedonbosco.sinergiacrm.org/TEST/service/v4_1/rest.php";

  componentes: Observable<Componente[]>;


  constructor(
    private dataService: DataService,
    private API: ApiService,
    private router: Router,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  async logOut() {

    await this.API.logOut();
    this.router.navigate(['/login']);
  }
}
