import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/model/Artist';
import { EventLocation } from 'src/app/model/EventLocation';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  public name: string = '';
  public type: string = '';
  public price: number = 0;
  public artist: string = '';
  public location: string = '';
  public maxTickets: number = 0;
  public date: Date = new Date();

  public artists: Artist[] = [];
  public locations: EventLocation[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getArtist("").subscribe(resp => {
      this.artists = resp;
    });

    this.eventService.getLocation("").subscribe(resp => {
      this.locations = resp;
    });
  }

  addEvent() {
    console.log(this.name +" "+ this.location+" "+ this.artist+" "+ this.date+" "+ this.price+" "+ this.type+" "+ this.maxTickets)
    this.eventService.addEvent(this.name, this.location, this.artist, this.date, this.price, this.type, this.maxTickets).subscribe(resp => {
      alert(resp.msg);
    })
  }

}
