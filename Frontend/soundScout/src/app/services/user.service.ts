import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BACKEND_BASE = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/register", {
      username:username,
      email:email,
      password:password
    })
  }

}
