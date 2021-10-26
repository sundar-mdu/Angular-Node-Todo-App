import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  serverUrl = environment.serverUrl

  constructor(
    private http: HttpClient
  ) { }

  getTodo(url){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.get(`${this.serverUrl}${url}`, options)
  }

  createTodo(url, newTodo){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.post(`${this.serverUrl}${url}`, newTodo, options)
  }

  updateTodo(url, completedStatus){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.patch(`${this.serverUrl}${url}`, completedStatus, options)
  }

  deleteTodo(url){
    let httpHeaders = new HttpHeaders()
    .set('Content-Type','application/json')

    let options = {
      headers: httpHeaders
    }
    return this.http.delete(`${this.serverUrl}${url}`, options)
  }
}
