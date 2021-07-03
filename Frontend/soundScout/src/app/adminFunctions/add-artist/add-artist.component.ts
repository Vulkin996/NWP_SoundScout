import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  public name: string = '';
  public genre: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  addArtist() {
    this.eventService.addArtist(this.name, this.genre).subscribe(resp => {
      alert(resp.msg);
    })
   }

}
