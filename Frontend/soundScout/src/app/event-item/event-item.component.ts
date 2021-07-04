import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicEvent } from '../model/musicEvent';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input()
  eventData!: MusicEvent;

  public pictureLink: string = "assets/image/default-thumbnail.png";

  constructor(private router: Router, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    if (this.eventData.Picture != "")
      this.pictureLink = this.eventData.Picture
  }

  purchase() {
    localStorage.setItem("eventToPurchase", this.eventData.eventName)
    localStorage.setItem("eventPrice", this.eventData.Price.toString())
    this.router.navigate(['purchase'])
  }

}
