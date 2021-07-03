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

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent("").subscribe(resp => {
      this.events = resp;
    });
  }

}
