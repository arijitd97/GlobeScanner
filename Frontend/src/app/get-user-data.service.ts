import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private http : HttpClient) { }
  getUserInfo(): Observable<any>{
    // return this.http.get<any>("http://10.20.106.113:8080/userprofile/");
    return this.http.get<any>("http://10.20.106.113:8080/userprofile/",httpOptions);
  }
}
