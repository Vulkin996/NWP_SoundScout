import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../model/Artist';
import { EventLocation } from '../model/EventLocation';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  BACKEND_BASE = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  addLocation(name: string, country: string, city: string, address: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/event/addLocation", {
      name:name,
      country:country,
      city:city,
      address:address
    })
  }

  addArtist(name: string, genre: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/event/addArtist", {
      name:name,
      genre:genre
    })
  }

  getArtist(query: string): Observable<Artist[]> {
    return this.httpClient.get<Artist[]>(this.BACKEND_BASE + "/api/event/getArtist", {
      params: {q: query}
    })
  }

  deleteArtist(artistName: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/event/deleteArtist", {
      artistName:artistName
    })
  }

  deleteLocation(locationName: string): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/event/deleteLocation", {
      locationName:locationName
    })
  }

  getLocation(query: string): Observable<EventLocation[]> {
    return this.httpClient.get<EventLocation[]>(this.BACKEND_BASE + "/api/event/getLocation", {
      params: {q: query}
    })
  }

  addEvent(name: string, locationName: string, artistName: string, date: Date, price: number, type: string, maxTickets: number): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/event/addEvent", {
      name:name,
      locationName:locationName,
      artistName:artistName,
      date: date,
      price: price,
      type: type,
      maxTickets: maxTickets,
      picture: ""
    })
  }
}
