import { Component, OnInit } from '@angular/core';
import { MusicEvent } from 'src/app/model/musicEvent';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-remove-event',
  templateUrl: './remove-event.component.html',
  styleUrls: ['./remove-event.component.css']
})
export class RemoveEventComponent implements OnInit {

  public events: MusicEvent[] = [];
  public chosenEvent: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent("").subscribe(resp => {
      this.events = resp;
    });
  }

  deleteEvent() {
    if (this.chosenEvent !== '') {
      this.eventService.deleteEvent(this.chosenEvent).subscribe(resp => {
        alert(resp.msg)
      });
    }
  }

}
