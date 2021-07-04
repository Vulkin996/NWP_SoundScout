import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BACKEND_BASE = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/login", {
      email: email,
      password: password
    }).pipe(map((resp: any) => {
      return resp;
    }))
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/register", {
      username:username,
      email:email,
      password:password
    })
  }

  getUsername(query: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BACKEND_BASE + "/api/user/getUsername", {
      params: {q: query}
    })
  }

  deleteUser(username: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/deleteUser", {
      username:username
    })
  }

  giveAdmin(username: string):Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/giveAdmin", {
      username:username
    })
  }

}
