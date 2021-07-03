import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/model/Artist';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-remove-artist',
  templateUrl: './remove-artist.component.html',
  styleUrls: ['./remove-artist.component.css']
})
export class RemoveArtistComponent implements OnInit {

  public artists: Artist[] = [];
  public chosenArtist: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getArtist("").subscribe(resp => {
      this.artists = resp;
    });
  }

  deleteArtist() {
    if (this.chosenArtist !== '') {
      this.eventService.deleteArtist(this.chosenArtist).subscribe(resp => {
        alert(resp.msg)
      });
    }
  }

}
