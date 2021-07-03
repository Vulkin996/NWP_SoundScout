import { Component, OnInit } from '@angular/core';
import { EventLocation } from 'src/app/model/EventLocation';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-remove-location',
  templateUrl: './remove-location.component.html',
  styleUrls: ['./remove-location.component.css']
})
export class RemoveLocationComponent implements OnInit {

  public locations: EventLocation[] = [];

  public chosenLocation: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getLocation("").subscribe(resp => {
      this.locations = resp;
    });
  }

  deleteLocation() {
    if (this.chosenLocation !== '') {
      this.eventService.deleteLocation(this.chosenLocation).subscribe(resp => {
        alert(resp.msg)
      });
    }
  }

}
