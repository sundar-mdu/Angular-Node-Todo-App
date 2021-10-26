import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  serverUrl = environment.serverUrl

  constructor(
    private http: HttpClient
  ) { }

  createPay(url){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.get(`${this.serverUrl}${url}`, options)
  }

  executePay(url, newPay){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.post(`${this.serverUrl}${url}`, newPay, options)
  }
}
