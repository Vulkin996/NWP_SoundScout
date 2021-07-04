import { Component, OnInit } from '@angular/core';
import { MusicEvent } from '../model/musicEvent';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public events: MusicEvent[] = [];
  public genres: any[] = [];

  constructor(private eventService: EventService) { }

  public nameSearch: string = '';
  public typeSearch: string = '';
  public genreSearch: string = '';
  public citySearch: string = '';
  public countrySearch: string = '';
  public dateSearch: any = null;
  public maxPrice: number = -1;

  private oldEvents: MusicEvent[] = [];

  ngOnInit(): void {
    this.eventService.getEvent("").subscribe(resp => {
      this.events = resp;
    });

    this.eventService.getGenres().subscribe(resp => {
      this.genres = resp;
    });
  }

  search() {
    if (this.oldEvents.length > 0) {
      this.events = this.oldEvents;
    }
    this.oldEvents = this.events;
    var filteredEvents: MusicEvent[] = this.events;

    if (this.nameSearch != '') {
      filteredEvents = filteredEvents.filter(ev => ev.Artist.Name === this.nameSearch);
    }
    if (this.typeSearch != '') {
      filteredEvents = filteredEvents.filter(ev => ev.Type === this.typeSearch);
    }
    if (this.genreSearch != '') {
      filteredEvents = filteredEvents.filter(ev => ev.Artist.Genre === this.genreSearch);
    }
    if (this.citySearch != '') {
      filteredEvents = filteredEvents.filter(ev => ev.Location.City === this.citySearch);
    }
    if (this.countrySearch != '') {
      filteredEvents = filteredEvents.filter(ev => ev.Location.Country === this.countrySearch);
    }
    if (this.dateSearch != null) {
      filteredEvents = filteredEvents.filter(ev => ev.Date >= this.dateSearch);
    }
    if (this.maxPrice != -1) {
      filteredEvents = filteredEvents.filter(ev => ev.Price <= this.maxPrice);
    }

    this.events = filteredEvents;
  }

  updateTextInput(val: number) {
    console.log("I work")
  }

}
