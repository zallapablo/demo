import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = "https://confedonbosco.sinergiacrm.org/service/v4_1/rest.php";
  apiKey = "410a054b-a1e1-c20c-fd0b-623af0b5a90e" 

  constructor(private http: HttpClient) { }


  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ this.apiUrl }${ endpoint }`, {
      params: { 
        apiKey: this.apiKey,
      }
    })
  }
}
