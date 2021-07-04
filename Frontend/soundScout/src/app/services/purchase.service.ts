import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = "http://localhost:3000"

  purchase(username: string, eventName: string, email: string, firstName: string, lastName: string, country: string, city: string, zip: string, address: string, address2: string, payment: string,)
    : Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/purchase/makePurchase", {
      username:username,
      eventName:eventName,
      email:email,
      firstName:firstName,
      lastName:lastName,
      country:country,
      city:city,
      zip:zip,
      address:address,
      address2:address2,
      payment:payment
    })
  }

  getTickets(username: string): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.BACKEND_BASE + "/api/purchase/getTickets", {
      params: {u: username}
    })
  }
}
