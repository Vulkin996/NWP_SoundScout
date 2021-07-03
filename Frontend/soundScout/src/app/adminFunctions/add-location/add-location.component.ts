import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  public name: string = '';
  public country: string = '';
  public city: string = '';
  public address: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  addLocation() {
    this.eventService.addLocation(this.name, this.country, this.city, this.address).subscribe(resp => {
      alert(resp.msg);
    })
  }

}
