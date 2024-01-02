import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitysService {

  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) { }

  sendLogin(studentForm: any){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': String(localStorage.getItem('session')) });
    return this.http.post<any>(`${this.apiUrl}/login`, studentForm, {headers: headers});
  }

  sendResults(questionsForms: any){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': String(localStorage.getItem('session')) });
    return this.http.post<any>(`${this.apiUrl}/resultados`, questionsForms, {headers: headers});
  }

  getQuestions(page: number){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': String(localStorage.getItem('session')) });
    return this.http.get<any>(`${this.apiUrl}/preguntas/${page}`, {headers: headers});
  }

}
